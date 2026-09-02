# 💼 Day 04 Real-World Company Interview Scenarios

---

## 🏢 Scenario 1: JPMorgan Chase (Credit Risk Classification)
**Problem**: Classify loan applicants into risk tiers based on debt-to-income ratio (`dti`) and credit score (`fico`).
```sql
SELECT applicant_id,
       CASE
           WHEN fico >= 750 AND dti < 0.30 THEN 'Prime Low Risk'
           WHEN fico >= 650 AND dti < 0.40 THEN 'Near Prime Moderate Risk'
           ELSE 'Subprime High Risk'
       END AS risk_classification
FROM LoanApplicants;
```

---

## 🏢 Scenario 2: Amazon (Fulfillment SLA Classification)
**Problem**: Tag customer orders based on delivery fulfillment speed.
```sql
SELECT order_id,
       CASE
           WHEN delivery_days <= 1 THEN 'Same Day / Next Day Priority'
           WHEN delivery_days <= 3 THEN 'Standard Express'
           ELSE 'Delayed / Escalation Required'
       END AS fulfillment_status
FROM Orders;
```
