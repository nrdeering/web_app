# CREATE TABLE users (
#     email VARCHAR(255) PRIMARY KEY,
#     created_at TIMESTAMP DEFAULT NOW()
# );

#select the earliest user
SELECT CONCAT(MONTHNAME(MIN(created_at)),' ',DAY(MIN(created_at)),' ',YEAR(MIN(created_at))) AS earliest_date FROM users;

#find the email of the earliest users
SELECT email, MIN(created_at) AS created_at FROM users;

#count of users per month
SELECT MONTHNAME(created_at) AS month, COUNT(email) AS count 
FROM users
GROUP BY month
ORDER BY count DESC;

#find users with Yahoo email
SELECT COUNT(email) AS yahoo_users FROM users 
WHERE email LIKE '%yahoo.com';

#total # of users for each host
SELECT CASE 
        WHEN email LIKE '%@yahoo.com' THEN 'Yahoo'
        WHEN email LIKE '%@gmail.com' THEN 'Gmail'
        WHEN email LIKE '%@hotmail.com' THEN 'Hotmail'
        ELSE 'Other'
    END AS provider,
    COUNT(*) AS total_users
FROM users
GROUP BY provider
ORDER BY total_users DESC;