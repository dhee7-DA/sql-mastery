# 💼 Day 03 Real-World Company Interview Scenarios

---

## 🏢 Scenario 1: Google (Search & Suffix Sorting)
**Problem**: Google's search autocomplete team needs to rank query suggestions that end in specific file formats (e.g. `.pdf`, `.csv`, `.py`) by suffix and then by search volume descending.
```sql
SELECT query_text, search_volume
FROM SearchQueries
WHERE search_volume > 1000
ORDER BY RIGHT(query_text, 4) ASC, search_volume DESC;
```

---

## 🏢 Scenario 2: Stripe (Recent High-Earner Onboarding Audit)
**Problem**: Stripe's risk and compliance team wants to audit newly onboarded merchant accounts created in the last 30 days that have processed more than $5,000 to verify KYC compliance.
```sql
SELECT merchant_id, merchant_name, volume_usd
FROM Merchants
WHERE volume_usd > 5000 
  AND days_active <= 30
ORDER BY merchant_id ASC;
```
