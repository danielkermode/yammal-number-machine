# Server

This folder contains the backend for the Yammal Number Machine website and blockchain.

# Database setup

1. Ensure Postgres is installed on your system - `brew install postgres`. `pg_ctl -D /usr/local/var/postgres start` to start postgres.

2. Run `psql postgres -U dankermode` (replace dankermode with your username) to enter a postgres shell. `\c ynm` to connect to the database.

3. Add a `.env` file (replace dankermode with your username)

```
DATABASE_URL="postgresql://dankermode:dankermode@localhost:5432/ynm"
```

4. Ensure Diesel CLI is installed `cargo install diesel_cli`. (more info at https://diesel.rs/guides/getting-started)

5. `diesel setup`

6. `diesel migration run` (to rollback, `diesel migration redo`)

# Run server

1. `cargo run`

# Deploy

1. Install rustup on ubuntu: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
2. Install build-essential: `sudo apt install build-essential`
3. TRICKY: Install postgres lib `sudo apt install libpq-dev`
