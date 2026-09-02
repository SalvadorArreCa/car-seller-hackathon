CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE vehicle (
    id TEXT PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INT NOT NULL,
    price NUMERIC NOT NULL,
    body_type TEXT,
    fuel_type TEXT,
    seats INT,
    description TEXT NOT NULL,
    details JSONB NOT NULL,
    embedding vector(768)
);
