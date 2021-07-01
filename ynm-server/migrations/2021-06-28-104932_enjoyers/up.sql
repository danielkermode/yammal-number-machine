-- Your SQL goes here

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE enjoyers (
  id uuid DEFAULT uuid_generate_v4 () NOT NULL,
  enjoyername VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);
