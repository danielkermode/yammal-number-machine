-- Your SQL goes here

CREATE TABLE tracks (
  id uuid DEFAULT uuid_generate_v4 () NOT NULL,
  uri VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  streams BIGINT,
	PRIMARY KEY (id)
);
