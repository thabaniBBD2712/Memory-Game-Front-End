CREATE DATABASE memory_game;
USE memory_game;


CREATE TABLE Users (
  email varchar(50) PRIMARY KEY,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  password varchar(50) NOT NULL
);

CREATE TABLE Score (
  user_email varchar(50) PRIMARY KEY,
  score int DEFAULT 0,
  achieved_on timestamp DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_user_email
    FOREIGN KEY (user_email)
    REFERENCES Users(email),

  CONSTRAINT uq_score_user_email
    UNIQUE (user_email)
);

