-- =============================================================================
-- SQL Mastery: Day 08 — Relational Joins (INNER, LEFT, RIGHT, ON vs WHERE)
-- Dialect: MySQL 8.0+ / ANSI SQL
-- HackerRank Track: Basic Join
-- =============================================================================

-- -----------------------------------------------------------------------------
-- SCHEMA SETUP: HackerRank World Database (CITY & COUNTRY)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS CITY;
DROP TABLE IF EXISTS COUNTRY;

CREATE TABLE COUNTRY (
    Code VARCHAR(3) PRIMARY KEY,
    Name VARCHAR(44) NOT NULL,
    Continent VARCHAR(13) NOT NULL,
    Region VARCHAR(25) NOT NULL,
    SurfaceArea DECIMAL(10,2) DEFAULT 0.00,
    IndepYear INT DEFAULT NULL,
    Population INT NOT NULL,
    LifeExpectancy DECIMAL(3,1) DEFAULT NULL,
    GNP DECIMAL(10,2) DEFAULT NULL,
    GNPOLD DECIMAL(10,2) DEFAULT NULL,
    LocalName VARCHAR(44) DEFAULT NULL,
    GovernmentForm VARCHAR(45) DEFAULT NULL,
    HeadOfState VARCHAR(32) DEFAULT NULL,
    Capital INT DEFAULT NULL,
    Code2 VARCHAR(2) DEFAULT NULL
);

CREATE TABLE CITY (
    ID INT PRIMARY KEY,
    Name VARCHAR(17) NOT NULL,
    CountryCode VARCHAR(3) NOT NULL,
    District VARCHAR(20) NOT NULL,
    Population INT NOT NULL,
    CONSTRAINT fk_city_country FOREIGN KEY (CountryCode) REFERENCES COUNTRY(Code)
);

-- Seed Sample Countries across multiple Continents
INSERT INTO COUNTRY (Code, Name, Continent, Region, Population) VALUES
('AFG', 'Afghanistan', 'Asia', 'Southern and Central Asia', 22720000),
('NLD', 'Netherlands', 'Europe', 'Western Europe', 15864000),
('JPN', 'Japan', 'Asia', 'Eastern Asia', 126714000),
('NGA', 'Nigeria', 'Africa', 'Western Africa', 111506000),
('EGY', 'Egypt', 'Africa', 'Northern Africa', 68470000),
('USA', 'United States', 'North America', 'North America', 278357000),
('BRA', 'Brazil', 'South America', 'South America', 170115000),
('IND', 'India', 'Asia', 'Southern and Central Asia', 1013662000),
('KEN', 'Kenya', 'Africa', 'Eastern Africa', 30080000);

-- Seed Sample Cities
INSERT INTO CITY (ID, Name, CountryCode, District, Population) VALUES
(1, 'Kabul', 'AFG', 'Kabol', 1780000),
(2, 'Amsterdam', 'NLD', 'Noord-Holland', 731200),
(3, 'Tokyo', 'JPN', 'Tokyo-to', 7980230),
(4, 'Lagos', 'NGA', 'Lagos', 1518000),
(5, 'Cairo', 'EGY', 'Kairo', 6789479),
(6, 'New York', 'USA', 'New York', 8008278),
(7, 'Mumbai', 'IND', 'Maharashtra', 10500000),
(8, 'Delhi', 'IND', 'Delhi', 7206704),
(9, 'Nairobi', 'KEN', 'Nairobi', 2143254),
(10, 'Rotterdam', 'NLD', 'Zuid-Holland', 593321);

-- =============================================================================
-- CHALLENGE 1: Asian Population (HackerRank)
-- Objective: Given the CITY and COUNTRY tables, query the sum of the populations
--            of all cities where the CONTINENT is 'Asia'.
-- Note: CITY.CountryCode and COUNTRY.Code are matching key columns.
-- =============================================================================
SELECT SUM(ci.Population) AS TotalAsianCityPopulation
FROM CITY ci
INNER JOIN COUNTRY co
  ON ci.CountryCode = co.Code
WHERE co.Continent = 'Asia';

-- =============================================================================
-- CHALLENGE 2: African Cities (HackerRank)
-- Objective: Given the CITY and COUNTRY tables, query the names of all cities
--            where the CONTINENT is 'Africa'.
-- =============================================================================
SELECT ci.Name
FROM CITY ci
INNER JOIN COUNTRY co
  ON ci.CountryCode = co.Code
WHERE co.Continent = 'Africa';

-- =============================================================================
-- CHALLENGE 3: Average Population of Each Continent (HackerRank)
-- Objective: Given the CITY and COUNTRY tables, query the names of all the 
--            continents (COUNTRY.Continent) and their respective average city 
--            populations (CITY.Population) rounded down to the nearest integer.
-- Note: FLOOR() is required to round down to nearest whole integer.
-- =============================================================================
SELECT 
    co.Continent,
    FLOOR(AVG(ci.Population)) AS AvgCityPopulation
FROM CITY ci
INNER JOIN COUNTRY co
  ON ci.CountryCode = co.Code
GROUP BY co.Continent;

-- =============================================================================
-- ENTERPRISE SCENARIO 1: Amazon Customers Without Orders (Left Anti-Join)
-- Schema: Customers (customer_id, name, email) & Orders (order_id, customer_id, total_amount)
-- Objective: Identify all churned or inactive customers who have NEVER placed an order.
-- =============================================================================
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

INSERT INTO Customers (customer_id, name, email) VALUES
(101, 'Alice Vance', 'alice@amazon.com'),
(102, 'Bob Stone', 'bob@amazon.com'),
(103, 'Charlie Day', 'charlie@amazon.com'),
(104, 'Diana Prince', 'diana@amazon.com');

INSERT INTO Orders (order_id, customer_id, total_amount, status) VALUES
(5001, 101, 149.99, 'DELIVERED'),
(5002, 101, 89.50, 'SHIPPED'),
(5003, 103, 499.00, 'DELIVERED');

-- Solution: Left Anti-Join using WHERE IS NULL
SELECT 
    c.customer_id,
    c.name,
    c.email
FROM Customers c
LEFT JOIN Orders o
  ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- =============================================================================
-- ENTERPRISE SCENARIO 2: The ON vs WHERE Predicate Trap Audit
-- Objective: List ALL customers with their total amount of 'DELIVERED' orders,
--            preserving customers who have 0 delivered orders.
-- =============================================================================

-- CORRECT IMPLEMENTATION: Filter in ON clause preserves Bob & Diana (with 0 / NULL)
SELECT 
    c.customer_id,
    c.name,
    COALESCE(SUM(o.total_amount), 0.00) AS total_delivered_spend
FROM Customers c
LEFT JOIN Orders o
  ON c.customer_id = o.customer_id
 AND o.status = 'DELIVERED'
GROUP BY c.customer_id, c.name;

-- WRONG IMPLEMENTATION (Anti-Pattern): Filtering in WHERE clause drops customers with 0 orders!
-- SELECT c.customer_id, c.name, SUM(o.total_amount)
-- FROM Customers c
-- LEFT JOIN Orders o ON c.customer_id = o.customer_id
-- WHERE o.status = 'DELIVERED' -- Discards NULL status rows, turning LEFT JOIN into INNER JOIN!
-- GROUP BY c.customer_id, c.name;
