create database nodeUsers
CREATE TABLE userTable
(
    userId BINARY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
)
SELECT *
FROM userTable

