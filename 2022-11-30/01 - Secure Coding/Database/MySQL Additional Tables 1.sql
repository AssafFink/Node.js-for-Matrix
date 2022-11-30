USE Northwind;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(128) NOT NULL
) DEFAULT CHARSET = utf8;

INSERT INTO users VALUES(DEFAULT, 'Bart', 'Simpson', 'Bart', '1234');
INSERT INTO users VALUES(DEFAULT, 'Lisa', 'Simpson', 'Lisa', 'abcd');
INSERT INTO users VALUES(DEFAULT, 'Marge', 'Simpson', 'Marge', 'Cool');
INSERT INTO users VALUES(DEFAULT, 'Homer', 'Simpson', 'Homer', '1234');

DROP TABLE IF EXISTS forum;
CREATE TABLE forum (
	id INT AUTO_INCREMENT PRIMARY KEY,
	sender VARCHAR(100) NOT NULL,
	text VARCHAR(1000) NOT NULL
) DEFAULT CHARSET = utf8;

INSERT INTO forum VALUES(DEFAULT, 'Bart Simpson', 'Northwind sells some interesting products.');
INSERT INTO forum VALUES(DEFAULT, 'Lisa Simpson', 'Where are Northwind employees today?');
INSERT INTO forum VALUES(DEFAULT, 'Marge Simpson', 'Is it a real company?');
INSERT INTO forum VALUES(DEFAULT, 'Homer Simpson', 'Where am I?');
