CREATE DATABASE memory_game;
USE memory_game;

CREATE TABLE Player (
  email varchar(50) PRIMARY KEY,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  password varchar(50) NOT NULL
);

CREATE TABLE Score (
  player_email varchar(50) PRIMARY KEY,
  score int DEFAULT 0,
  achievedOn DATETIME,
  CONSTRAINT fk_player_email
    FOREIGN KEY (player_email)
    REFERENCES Player(email),
  CONSTRAINT uq_score_player_email
    UNIQUE (player_email)
);


INSERT INTO Player (email, firstname, lastname, password)
VALUES
('john@example.com', 'John', 'Doe', 'mysecretpassword'),
('jane@example.com', 'Jane', 'Smith', 'anotherpassword'),
('bob@example.com', 'Bob', 'Johnson', 'password123'),
('alice@example.com', 'Alice', 'Lee', 'secretpass'),
('chris@example.com', 'Chris', 'Brown', 'brownie');


INSERT INTO Score (player_email, score)
VALUES
('john@example.com', 100),
('jane@example.com', 50),
('bob@example.com', 75),
('alice@example.com', 200),
('chris@example.com', 150);

