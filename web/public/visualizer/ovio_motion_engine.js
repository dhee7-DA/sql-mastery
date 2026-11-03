// =============================================================================
// OVIO UI FLUID MOTION ENGINE
// "The motion layer for developer websites" (Inspired by ovioui.vercel.app)
// Carbon High-Contrast Monochrome Implementation
// Zero external dependencies; 60fps GPU-accelerated spring animations
// =============================================================================

(function() {
  'use strict';

  const OvioMotion = {
    version: '1.0.0',
    magnifierActive: false,
    magnifierScale: 2.0,
    dialOpen: false,

    // Initialize all motion modules
    init() {
      console.log('✨ [OvioMotion] Initializing fluid motion engine...');
      this.initLiquidTabs();
      this.initDialMenu();
      this.initScratchToReveal();
      this.initLiquidMagnifier();
      this.initCardTilt();
      this.initContributionGraph();

      // Re-run bindings whenever views change
      window.addEventListener('hashchange', () => {
        setTimeout(() => this.refresh(), 120);
      });
      document.addEventListener('viewSwitched', () => {
        setTimeout(() => this.refresh(), 120);
      });
    },

    refresh() {
      this.initLiquidTabs();
      this.initScratchToReveal();
      this.initCardTilt();
    },

    // -------------------------------------------------------------------------
    // 1. LIQUID TABS
    // Fluid sliding indicator that stretches like liquid during transitions
    // -------------------------------------------------------------------------
    initLiquidTabs() {
      // Find all tab containers
      const tabContainers = document.querySelectorAll(
        '.nav-groups-container, .amazon-tabs-bar, .amazon-phase-filter-tabs, .industry-track-pills-row, .company-track-pills, .phase-execution-rail, .step-order-tabs, .visual-mode-toggle-group'
      );

      tabContainers.forEach(container => {
        // Avoid duplicate initialization
        let indicator = container.querySelector(':scope > .ovio-liquid-indicator');
        if (!indicator) {
          indicator = document.createElement('div');
          indicator.className = 'ovio-liquid-indicator dark-pill';
          container.style.position = 'relative';
          container.insertBefore(indicator, container.firstChild);
        }

        const tabs = container.querySelectorAll(
          '.nav-group-trigger, .amazon-tab-btn, .phase-pill-btn, .track-pill-btn, .phase-node-btn, .step-tab-btn, .visual-toggle-btn, button[class*="tab"]'
        );

        let lastActiveIndex = 0;

        const updateIndicator = (activeTab, animate = true) => {
          if (!activeTab || !container) return;
          const cRect = container.getBoundingClientRect();
          const tRect = activeTab.getBoundingClientRect();

          const left = tRect.left - cRect.left;
          const top = tRect.top - cRect.top;
          const width = tRect.width;
          const height = tRect.height;

          // Find index
          const activeIndex = Array.from(tabs).indexOf(activeTab);
          const movingRight = activeIndex > lastActiveIndex;
          lastActiveIndex = activeIndex;

          if (animate) {
            indicator.classList.remove('stretching-right', 'stretching-left');
            indicator.classList.add(movingRight ? 'stretching-right' : 'stretching-left');
            setTimeout(() => {
              indicator.classList.remove('stretching-right', 'stretching-left');
            }, 180);
          }

          indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
          indicator.style.width = `${width}px`;
          indicator.style.height = `${height}px`;
          indicator.style.opacity = '1';

          // Update active text classes
          tabs.forEach(t => {
            if (t === activeTab) {
              t.classList.add('ovio-tab-active');
            } else {
              t.classList.remove('ovio-tab-active');
            }
          });
        };

        // Bind click events
        tabs.forEach((tab, idx) => {
          tab.classList.add('ovio-tab-item');
          if (tab.classList.contains('active')) {
            lastActiveIndex = idx;
            setTimeout(() => updateIndicator(tab, false), 50);
          }

          tab.addEventListener('click', () => {
            setTimeout(() => updateIndicator(tab, true), 10);
          });
        });

        // Set initial state
        const initialActive = container.querySelector('.active') || tabs[0];
        if (initialActive) {
          setTimeout(() => updateIndicator(initialActive, false), 60);
        }

        // ResizeObserver to handle window re-layouts
        if (window.ResizeObserver && !container.__ovioObserver) {
          const ro = new ResizeObserver(() => {
            const current = container.querySelector('.active') || tabs[0];
            if (current) updateIndicator(current, false);
          });
          ro.observe(container);
          container.__ovioObserver = ro;
        }
      });
    },

    // -------------------------------------------------------------------------
    // 2. DIAL MENU
    // Radial circular pointer-anchored menu with spring elasticity
    // -------------------------------------------------------------------------
    initDialMenu() {
      let overlay = document.getElementById('ovioDialOverlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'ovioDialOverlay';
        overlay.className = 'ovio-dial-overlay';
        overlay.innerHTML = `
          <div class="ovio-dial-menu" id="ovioDialMenu">
            <div class="ovio-dial-compass"></div>
            <div class="ovio-dial-crosshair"></div>
            <div class="ovio-dial-center-hub" id="ovioDialCenterHub" title="Click to close or aim by direction">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </div>
            <!-- Radial Items will be placed by JS -->
          </div>
        `;
        document.body.appendChild(overlay);

        // Also add floating trigger button in bottom right
        const trigger = document.createElement('button');
        trigger.className = 'ovio-dial-floating-trigger';
        trigger.id = 'ovioDialTrigger';
        trigger.title = 'Open Dial Menu (Right-Click anywhere)';
        trigger.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
        `;
        document.body.appendChild(trigger);

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const r = trigger.getBoundingClientRect();
          this.openDialMenu(r.left - 40, r.top - 40);
        });

        // Close when clicking overlay or center hub
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay || e.target.closest('#ovioDialCenterHub')) {
            this.closeDialMenu();
          }
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.dialOpen) {
            this.closeDialMenu();
          }
        });
      }

      // Configure Dial Items
      const dialItems = [
        {
          id: 'run-sql',
          label: 'Run Query (Ctrl+↵)',
          icon: '⚡',
          action: () => {
            const runBtn = document.getElementById('btnRun') || document.querySelector('.btn-run-query') || document.querySelector('.btn-launch-challenge');
            if (runBtn) runBtn.click();
          }
        },
        {
          id: 'magnifier',
          label: 'Toggle Magnifier',
          icon: '🔍',
          action: () => {
            this.toggleMagnifier();
          }
        },
        {
          id: 'scratch',
          label: 'Scratch Solution',
          icon: '🧩',
          action: () => {
            const cards = document.querySelectorAll('.ovio-scratch-card');
            cards.forEach(c => {
              if (c.__reveal) c.__reveal();
            });
          }
        },
        {
          id: 'explain-ast',
          label: 'Explain AST Plan',
          icon: '🌳',
          action: () => {
            if (typeof window.switchMainView === 'function') {
              window.switchMainView('viewRelationalMachines');
            } else if (typeof window.selectNavView === 'function') {
              window.selectNavView('viewRelationalMachines', 'Relational Machines', null);
            }
          }
        },
        {
          id: 'copy-schema',
          label: 'Copy Table Schema',
          icon: '📋',
          action: () => {
            const schemaPre = document.querySelector('.schema-code-block');
            if (schemaPre) {
              navigator.clipboard.writeText(schemaPre.innerText).then(() => {
                if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
              });
            }
          }
        },
        {
          id: 'next-day',
          label: 'Next Day Ticket',
          icon: '🚀',
          action: () => {
            const nextBtn = document.querySelector('.btn-next-day');
            if (nextBtn) nextBtn.click();
            else if (window.AMAZON_STORY && window.AMAZON_STORY.selectDay) {
              const cur = (window.AMAZON_ANALYST_STORY_DATA || [])[0];
              if (cur) window.AMAZON_STORY.selectDay(Math.min(30, cur.day + 1));
            }
          }
        }
      ];

      const menu = document.getElementById('ovioDialMenu');
      // Clear previous items except compass and hub
      menu.querySelectorAll('.ovio-dial-item').forEach(el => el.remove());

      const radius = 86; // px distance from center
      const total = dialItems.length;

      dialItems.forEach((item, index) => {
        // Equal radial spacing
        const angle = (index * (360 / total) - 90) * (Math.PI / 180);
        const x = Math.round(130 + Math.cos(angle) * radius);
        const y = Math.round(130 + Math.sin(angle) * radius);

        const btn = document.createElement('button');
        btn.className = 'ovio-dial-item';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
        btn.style.transitionDelay = `${index * 25}ms`;
        btn.innerHTML = `
          <span>${item.icon}</span>
          <div class="ovio-dial-tooltip">${item.label}</div>
        `;

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          item.action();
          this.closeDialMenu();
          if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
        });

        menu.appendChild(btn);
      });

      // Global Right-Click trigger
      document.addEventListener('contextmenu', (e) => {
        // Don't intercept right click inside input or textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
          return;
        }
        e.preventDefault();
        this.openDialMenu(e.clientX, e.clientY);
      });
    },

    openDialMenu(x, y) {
      const overlay = document.getElementById('ovioDialOverlay');
      const menu = document.getElementById('ovioDialMenu');
      if (!overlay || !menu) return;

      // Bound coordinates so it doesn't clip screen edges
      const padding = 140;
      const boundedX = Math.max(padding, Math.min(window.innerWidth - padding, x));
      const boundedY = Math.max(padding, Math.min(window.innerHeight - padding, y));

      menu.style.left = `${boundedX}px`;
      menu.style.top = `${boundedY}px`;

      overlay.classList.add('open');
      this.dialOpen = true;
      if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
    },

    closeDialMenu() {
      const overlay = document.getElementById('ovioDialOverlay');
      if (!overlay) return;
      overlay.classList.remove('open');
      this.dialOpen = false;
    },

    // -------------------------------------------------------------------------
    // 3. SCRATCH TO REVEAL
    // Canvas coating you scratch away to uncover secret hints & interview traps
    // -------------------------------------------------------------------------
    initScratchToReveal() {
      // Find secret interview note elements to wrap
      const noteBoxes = document.querySelectorAll('.interview-note:not([data-scratch-init])');

      noteBoxes.forEach(box => {
        box.setAttribute('data-scratch-init', 'true');

        // Create wrapper card
        const card = document.createElement('div');
        card.className = 'ovio-scratch-card';

        // Save inner HTML
        const originalContent = box.innerHTML;
        box.innerHTML = '';
        box.appendChild(card);

        const content = document.createElement('div');
        content.className = 'ovio-scratch-content';
        content.innerHTML = originalContent;
        card.appendChild(content);

        // Banner
        const banner = document.createElement('div');
        banner.className = 'ovio-scratch-banner';
        banner.innerHTML = `🔒 <span>Scratch or Press Space to Reveal</span>`;
        card.appendChild(banner);

        // Canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'ovio-scratch-canvas';
        card.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let isRevealed = false;
        let scratchedPixels = 0;

        const resizeCanvas = () => {
          const rect = card.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          canvas.width = rect.width;
          canvas.height = rect.height;
          paintScratchCoating();
        };

        const paintScratchCoating = () => {
          if (isRevealed) return;
          ctx.fillStyle = '#141416';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Subtle carbon crosshatch texture
          ctx.strokeStyle = '#222225';
          ctx.lineWidth = 1;
          for (let x = 0; x < canvas.width; x += 12) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + canvas.height, canvas.height);
            ctx.stroke();
          }

          // Center watermark badge
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⚡ SECRET INTERVIEW TRAP & SOLUTION ⚡', canvas.width / 2, canvas.height / 2);
        };

        const checkRevealThreshold = () => {
          if (isRevealed) return;
          // Sample 80 random points
          let transparent = 0;
          const samples = 80;
          for (let i = 0; i < samples; i++) {
            const rx = Math.floor(Math.random() * canvas.width);
            const ry = Math.floor(Math.random() * canvas.height);
            const pixel = ctx.getImageData(rx, ry, 1, 1).data;
            if (pixel[3] < 50) transparent++;
          }
          if (transparent / samples > 0.35) {
            revealAll();
          }
        };

        const revealAll = () => {
          if (isRevealed) return;
          isRevealed = true;
          card.classList.add('revealed');
          if (window.soundFX && window.soundFX.playSuccess) {
            window.soundFX.playSuccess();
          }
        };

        card.__reveal = revealAll;

        const scratchAt = (clientX, clientY) => {
          if (isRevealed) return;
          const r = canvas.getBoundingClientRect();
          const x = clientX - r.left;
          const y = clientY - r.top;

          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(x, y, 26, 0, Math.PI * 2);
          ctx.fill();

          scratchedPixels++;
          if (scratchedPixels % 10 === 0) {
            checkRevealThreshold();
          }
        };

        // Pointer event bindings
        canvas.addEventListener('mousedown', (e) => {
          isDrawing = true;
          scratchAt(e.clientX, e.clientY);
        });

        window.addEventListener('mouseup', () => { isDrawing = false; });
        window.addEventListener('mousemove', (e) => {
          if (isDrawing) scratchAt(e.clientX, e.clientY);
        });

        canvas.addEventListener('touchstart', (e) => {
          isDrawing = true;
          const t = e.touches[0];
          scratchAt(t.clientX, t.clientY);
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
          if (isDrawing && e.touches[0]) {
            scratchAt(e.touches[0].clientX, e.touches[0].clientY);
          }
        }, { passive: true });

        // Keyboard reveal support
        card.tabIndex = 0;
        card.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            revealAll();
          }
        });

        setTimeout(resizeCanvas, 80);
      });
    },

    // -------------------------------------------------------------------------
    // 4. LIQUID MAGNIFIER
    // Optical zoom lens that smoothly trails the pointer over schemas & code
    // -------------------------------------------------------------------------
    initLiquidMagnifier() {
      let lens = document.getElementById('ovioMagnifierLens');
      if (!lens) {
        lens = document.createElement('div');
        lens.id = 'ovioMagnifierLens';
        lens.className = 'ovio-magnifier-lens';
        lens.innerHTML = `
          <div class="ovio-magnifier-content" id="ovioMagnifierContent"></div>
          <div class="ovio-magnifier-crosshair"></div>
          <div class="ovio-magnifier-zoom-badge" id="ovioZoomBadge">2.0x</div>
        `;
        document.body.appendChild(lens);
      }

      let curX = window.innerWidth / 2;
      let curY = window.innerHeight / 2;
      let targetX = curX;
      let targetY = curY;
      let lastMoveTime = Date.now();
      let isTracking = false;

      const content = document.getElementById('ovioMagnifierContent');
      const badge = document.getElementById('ovioZoomBadge');

      const renderLoop = () => {
        if (this.magnifierActive) {
          // Spring follow
          const dx = targetX - curX;
          const dy = targetY - curY;
          curX += dx * 0.22;
          curY += dy * 0.22;

          // Velocity squash deformation
          const speed = Math.sqrt(dx * dx + dy * dy);
          const squash = Math.min(1.12, 1 + speed * 0.003);
          const stretch = Math.max(0.88, 1 - speed * 0.003);

          lens.style.left = `${curX}px`;
          lens.style.top = `${curY}px`;
          lens.style.transform = `translate(-50%, -50%) scale(${squash}, ${stretch})`;

          requestAnimationFrame(renderLoop);
        }
      };

      document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        if (this.magnifierActive) {
          // Find hovered target code/schema
          const target = document.elementFromPoint(e.clientX, e.clientY);
          const codeContainer = target ? target.closest('.schema-code-block, .amazon-code-terminal, .report-box, .challenge-instruction-card') : null;

          if (codeContainer) {
            content.innerHTML = codeContainer.outerHTML;
            const r = codeContainer.getBoundingClientRect();
            const relX = (e.clientX - r.left) * this.magnifierScale - 70;
            const relY = (e.clientY - r.top) * this.magnifierScale - 70;
            content.style.transform = `translate(-${relX}px, -${relY}px) scale(${this.magnifierScale})`;
          }
        }
      });

      // Zoom via wheel
      window.addEventListener('wheel', (e) => {
        if (this.magnifierActive) {
          if (e.deltaY < 0) {
            this.magnifierScale = Math.min(4.0, this.magnifierScale + 0.25);
          } else {
            this.magnifierScale = Math.max(1.25, this.magnifierScale - 0.25);
          }
          if (badge) badge.innerText = `${this.magnifierScale.toFixed(1)}x`;
          e.preventDefault();
        }
      }, { passive: false });

      // Keyboard toggle ('M' key)
      document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          this.toggleMagnifier();
        }
      });
    },

    toggleMagnifier() {
      const lens = document.getElementById('ovioMagnifierLens');
      if (!lens) return;
      this.magnifierActive = !this.magnifierActive;
      if (this.magnifierActive) {
        lens.classList.add('active');
        if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
      } else {
        lens.classList.remove('active');
      }
    },

    // -------------------------------------------------------------------------
    // 5. 3D PERSPECTIVE TILT CARDS & SPOTLIGHT
    // Tactile tilt on mousemove with dynamic cursor reflection
    // -------------------------------------------------------------------------
    initCardTilt() {
      const cards = document.querySelectorAll(
        '.amazon-ticket-card, .report-box, .chime-memo-card, .evaluation-card, .track-card'
      );

      cards.forEach(card => {
        if (card.__tiltInit) return;
        card.__tiltInit = true;
        card.classList.add('ovio-tilt-card');

        // Add spotlight layer
        let spotlight = card.querySelector(':scope > .ovio-spotlight-overlay');
        if (!spotlight) {
          spotlight = document.createElement('div');
          spotlight.className = 'ovio-spotlight-overlay';
          card.style.position = 'relative';
          card.appendChild(spotlight);
        }

        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          const pctX = ((x / r.width) * 100).toFixed(1);
          const pctY = ((y / r.height) * 100).toFixed(1);

          card.style.setProperty('--mouse-x', `${pctX}%`);
          card.style.setProperty('--mouse-y', `${pctY}%`);

          const normX = (x / r.width) - 0.5;
          const normY = (y / r.height) - 0.5;

          card.classList.add('in-tilt');
          card.style.transform = `perspective(800px) rotateX(${(-normY * 8).toFixed(2)}deg) rotateY(${(normX * 8).toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
        });

        card.addEventListener('mouseleave', () => {
          card.classList.remove('in-tilt');
          card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      });
    },

    // -------------------------------------------------------------------------
    // 6. CONTRIBUTION ACTIVITY GRAPH FLUID CELLS
    // Interactive heatmap cells with spring scale and floating tooltip
    // -------------------------------------------------------------------------
    initContributionGraph() {
      const cells = document.querySelectorAll('.heatmap-cell, .streak-day-cell, .activity-box');
      cells.forEach(cell => {
        cell.classList.add('ovio-heat-cell');
      });
    }
  };

  window.OvioMotion = OvioMotion;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => OvioMotion.init());
  } else {
    OvioMotion.init();
  }
})();
