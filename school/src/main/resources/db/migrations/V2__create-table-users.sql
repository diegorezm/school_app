CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role TEXT NOT NULL
);
