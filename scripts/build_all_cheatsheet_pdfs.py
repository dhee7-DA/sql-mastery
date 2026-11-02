import os, subprocess, json, urllib.request, time

def build_cheatsheet_pdfs():
    out_dir = os.path.abspath("sql-mastery/dist/pdf/cheatsheets")
    os.makedirs(out_dir, exist_ok=True)
    temp_dir = os.path.abspath("sql-mastery/scratch/pdf_html_temp")
    os.makedirs(temp_dir, exist_ok=True)

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(chrome_path):
        chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

    print(f"Using browser: {chrome_path}")
    print(f"Target PDF directory: {out_dir}")

    # Launch headless Chrome with remote debugging to extract the rendered HTML from window.CheatsheetPdfEngine
    proc = subprocess.Popen([
        chrome_path,
        "--headless",
        "--remote-debugging-port=9222",
        "--disable-gpu",
        "http://localhost:8000/visualizer/index.html#course"
    ])
    time.sleep(3)

    try:
        import asyncio, websockets
        async def run_extraction():
            tabs = json.loads(urllib.request.urlopen("http://localhost:9222/json").read().decode())
            ws_url = [t['webSocketDebuggerUrl'] for t in tabs if t.get('type') == 'page'][0]
            async with websockets.connect(ws_url, max_size=20_000_000) as ws:
                # 1. Get all keyword IDs
                expr_keys = "JSON.stringify(window.KeywordEncyclopedia.getKeywordIds())"
                await ws.send(json.dumps({'id': 1, 'method': 'Runtime.evaluate', 'params': {'expression': expr_keys, 'returnByValue': True}}))
                kw_ids = []
                while True:
                    msg = json.loads(await ws.recv())
                    if msg.get('id') == 1:
                        kw_ids = json.loads(msg['result']['result']['value'])
                        break
                print(f"Found {len(kw_ids)} keywords to compile: {kw_ids}")

                generated_files = []
                for kw_id in kw_ids:
                    for edition in ['dark', 'print']:
                        js_call = f"window.CheatsheetPdfEngine.generateCheatsheetHtml(window.KeywordEncyclopedia.getKeyword('{kw_id}'), '{edition}')"
                        req_id = hash(f"{kw_id}_{edition}") & 0x7fffffff
                        await ws.send(json.dumps({'id': req_id, 'method': 'Runtime.evaluate', 'params': {'expression': js_call, 'returnByValue': True}}))
                        while True:
                            msg = json.loads(await ws.recv())
                            if msg.get('id') == req_id:
                                html_content = msg['result']['result']['value']
                                html_filename = f"{kw_id}_{edition}.html"
                                html_path = os.path.join(temp_dir, html_filename)
                                with open(html_path, 'w', encoding='utf-8') as f:
                                    f.write(html_content)
                                
                                pdf_filename = f"SQL_Cheatsheet_{kw_id.upper()}_{edition.upper()}.pdf"
                                pdf_path = os.path.join(out_dir, pdf_filename)
                                generated_files.append((html_path, pdf_path, kw_id, edition))
                                break
                return generated_files

        file_pairs = asyncio.run(run_extraction())
    finally:
        proc.terminate()

    print(f"\n--- Compiling {len(file_pairs)} PDFs via Headless Chrome ---")
    results = []
    for html_path, pdf_path, kw_id, edition in file_pairs:
        cmd = [
            chrome_path,
            "--headless",
            "--disable-gpu",
            "--run-all-compositor-stages-before-draw",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            f"file:///{html_path.replace(os.sep, '/')}"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        size = os.path.getsize(pdf_path) if os.path.exists(pdf_path) else 0
        status = "SUCCESS" if os.path.exists(pdf_path) and size > 10000 else "FAILED"
        print(f"[{status}] {kw_id.upper()} ({edition}): {os.path.basename(pdf_path)} ({size:,} bytes)")
        results.append((kw_id, edition, pdf_path, size, status))

    print(f"\n[DONE] All {len(results)} cheatsheet PDFs compiled successfully in {out_dir}")

if __name__ == "__main__":
    build_cheatsheet_pdfs()
