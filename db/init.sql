CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE vehicle (
    id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    price NUMERIC,
    embedding vector(768)
);
