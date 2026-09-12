-- =============================================================================
-- DAY 11: WINDOW FUNCTIONS — RANKING & PARTITIONING
-- SQL Dialect: MySQL 8.0+ / PostgreSQL / ANSI SQL:2016 Compliant
-- Focus: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), PARTITION BY, ORDER BY
-- =============================================================================

-- =============================================================================
-- SCHEMA SETUP & SEED DATA
-- =============================================================================

DROP TABLE IF EXISTS EmployeeSalaries;
DROP TABLE IF EXISTS Departments;
DROP TABLE IF EXISTS DeviceTelemetryEvents;
DROP TABLE IF EXISTS CustomerAnnualSpend;
DROP TABLE IF EXISTS UserLoginActivity;

CREATE TABLE Departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE EmployeeSalaries (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE DeviceTelemetryEvents (
    event_id BIGINT PRIMARY KEY,
    device_uuid VARCHAR(64) NOT NULL,
    firmware_version VARCHAR(16) NOT NULL,
    battery_pct INT NOT NULL,
    ping_timestamp TIMESTAMP NOT NULL
);

CREATE TABLE CustomerAnnualSpend (
    customer_id INT PRIMARY KEY,
    company_name VARCHAR(64) NOT NULL,
    annual_spend_usd DECIMAL(12,2) NOT NULL
);

CREATE TABLE UserLoginActivity (
    activity_id BIGINT PRIMARY KEY,
    user_id INT NOT NULL,
    login_date DATE NOT NULL
);

-- Seed Data
INSERT INTO Departments (department_id, department_name) VALUES
(1, 'Engineering'),
(2, 'Sales'),
(3, 'Finance');

INSERT INTO EmployeeSalaries (employee_id, employee_name, salary, department_id) VALUES
(101, 'Alice Chen', 125000.00, 1),
(102, 'Bob Smith', 125000.00, 1),      -- Tied top earner in Eng
(103, 'Carol Danvers', 115000.00, 1),  -- 2nd highest distinct salary in Eng
(104, 'David Miller', 105000.00, 1),   -- 3rd highest distinct salary in Eng
(105, 'Eve Jackson', 95000.00, 1),     -- 4th salary in Eng (Should be excluded from Top 3)
(106, 'Frank Wright', 140000.00, 2),
(107, 'Grace Hopper', 135000.00, 2),
(108, 'Henry Ford', 120000.00, 2),
(109, 'Ivy Taylor', 120000.00, 2),     -- Tied 3rd in Sales
(110, 'Jack Ryan', 80000.00, 3),
(111, 'Karen Page', 80000.00, 3);

INSERT INTO DeviceTelemetryEvents (event_id, device_uuid, firmware_version, battery_pct, ping_timestamp) VALUES
(1, 'DEV-A1', 'v1.0.1', 88, '2026-03-01 10:00:00'),
(2, 'DEV-A1', 'v1.0.2', 85, '2026-03-01 10:15:00'),
(3, 'DEV-A1', 'v1.0.2', 82, '2026-03-01 10:30:00'), -- Latest for DEV-A1
(4, 'DEV-B2', 'v2.1.0', 95, '2026-03-01 09:00:00'),
(5, 'DEV-B2', 'v2.1.1', 91, '2026-03-01 11:45:00'), -- Latest for DEV-B2
(6, 'DEV-C3', 'v1.4.0', 40, '2026-03-01 08:00:00'); -- Only record for DEV-C3

INSERT INTO CustomerAnnualSpend (customer_id, company_name, annual_spend_usd) VALUES
(1, 'Alpha Corp', 240000.00),
(2, 'Beta LLC', 185000.00),
(3, 'Gamma Inc', 140000.00),
(4, 'Delta Tech', 98000.00),
(5, 'Epsilon Co', 76000.00),
(6, 'Zeta Systems', 54000.00),
(7, 'Eta Global', 32000.00),
(8, 'Theta Labs', 21000.00),
(9, 'Iota Digital', 15000.00),
(10, 'Kappa Cloud', 8500.00);

INSERT INTO UserLoginActivity (activity_id, user_id, login_date) VALUES
(1, 1001, '2026-03-01'),
(2, 1001, '2026-03-02'),
(3, 1001, '2026-03-03'),
(4, 1001, '2026-03-04'),
(5, 1001, '2026-03-05'), -- User 1001: 5 consecutive days!
(6, 1001, '2026-03-08'),
(7, 1002, '2026-03-01'),
(8, 1002, '2026-03-03'), -- User 1002: fragmented logins (no streak >= 3)
(9, 1002, '2026-03-05');


-- =============================================================================
-- CHALLENGE 1: DEPARTMENT TOP 3 SALARIES (DENSE_RANK & TIE PRESERVATION)
-- Problem: Find the employees who have the top 3 highest distinct salaries in each department.
-- Concepts: DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...), JOIN, CTE
-- =============================================================================

WITH RankedSalaries AS (
    SELECT 
        d.department_name,
        e.employee_name,
        e.salary,
        DENSE_RANK() OVER (
            PARTITION BY e.department_id 
            ORDER BY e.salary DESC
        ) AS salary_dense_rank
    FROM EmployeeSalaries e
    INNER JOIN Departments d 
        ON e.department_id = d.department_id
)
SELECT 
    department_name,
    employee_name,
    salary,
    salary_dense_rank
FROM RankedSalaries
WHERE salary_dense_rank <= 3
ORDER BY department_name ASC, salary_dense_rank ASC, employee_name ASC;


-- =============================================================================
-- CHALLENGE 2: LATEST STATE DEDUPLICATION (CANONICAL PIPELINE PATTERN)
-- Problem: Isolate the most recent telemetry status per device, breaking identical timestamp ties using event_id DESC.
-- Concepts: ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...), Deterministic Tie-Breaking
-- =============================================================================

WITH RankedTelemetry AS (
    SELECT 
        event_id,
        device_uuid,
        firmware_version,
        battery_pct,
        ping_timestamp,
        ROW_NUMBER() OVER (
            PARTITION BY device_uuid 
            ORDER BY ping_timestamp DESC, event_id DESC
        ) AS row_num
    FROM DeviceTelemetryEvents
)
SELECT 
    device_uuid,
    firmware_version,
    battery_pct,
    ping_timestamp AS latest_ping
FROM RankedTelemetry
WHERE row_num = 1
ORDER BY device_uuid ASC;


-- =============================================================================
-- CHALLENGE 3: CUSTOMER REVENUE DECILES & QUARTILES (NTILE BUCKETING)
-- Problem: Segment customer portfolio into 4 revenue tiers (Quartiles) and 10 deciles for VIP account treatment.
-- Concepts: NTILE(4), NTILE(10), CASE WHEN tier labeling
-- =============================================================================

WITH SegmentedAccounts AS (
    SELECT 
        customer_id,
        company_name,
        annual_spend_usd,
        NTILE(4) OVER (ORDER BY annual_spend_usd DESC) AS quartile_bucket,
        NTILE(10) OVER (ORDER BY annual_spend_usd DESC) AS decile_bucket
    FROM CustomerAnnualSpend
)
SELECT 
    customer_id,
    company_name,
    annual_spend_usd,
    decile_bucket,
    CASE quartile_bucket
        WHEN 1 THEN 'Tier 1: Enterprise VIP (>75th percentile)'
        WHEN 2 THEN 'Tier 2: Mid-Market (50th-75th percentile)'
        WHEN 3 THEN 'Tier 3: Growth (25th-50th percentile)'
        ELSE 'Tier 4: Self-Serve (<25th percentile)'
    END AS customer_tier
FROM SegmentedAccounts
ORDER BY annual_spend_usd DESC;


-- =============================================================================
-- CHALLENGE 4: CONSECUTIVE ACTIVE LOGIN STREAKS (GAPS-AND-ISLANDS)
-- Problem: Identify users who have maintained unbroken daily active login streaks of 3 or more consecutive calendar days.
-- Concepts: Date arithmetic, ROW_NUMBER() grouping difference, MIN/MAX dates
-- =============================================================================

WITH DistinctDailyLogins AS (
    SELECT DISTINCT 
        user_id, 
        login_date
    FROM UserLoginActivity
),
StreakIslands AS (
    SELECT 
        user_id,
        login_date,
        -- Subtract continuous sequence number from calendar date
        login_date - INTERVAL (ROW_NUMBER() OVER (
            PARTITION BY user_id 
            ORDER BY login_date ASC
        )) DAY AS streak_anchor_date
    FROM DistinctDailyLogins
)
SELECT 
    user_id,
    MIN(login_date) AS streak_start_date,
    MAX(login_date) AS streak_end_date,
    COUNT(*) AS consecutive_days_count
FROM StreakIslands
GROUP BY user_id, streak_anchor_date
HAVING COUNT(*) >= 3
ORDER BY user_id ASC, streak_start_date ASC;


-- =============================================================================
-- CHALLENGE 5: OLYMPIC MEDALS & COMPETITION TIES (RANK() VS DENSE_RANK())
-- Problem: Produce a multi-column side-by-side comparison illustrating rank skips.
-- =============================================================================

SELECT 
    employee_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
    RANK() OVER (ORDER BY salary DESC) AS competition_rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM EmployeeSalaries
WHERE department_id = 1
ORDER BY salary DESC, employee_name ASC;
