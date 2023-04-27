## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev
```

## Running Migration

1. Copy .env.example dan ubah namanya menjadi .env
2. Copy semua variable yang ada di .env.example ke .env
3. Ubah variabel db yang ada di .env sesuai dengan konfigurasi db yang ada

```bash
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=kepoloe123
PG_DB_NAME=adonis-app
```

4. Jalankan migration

```bash
# Hanya push db
$ node ace migration:run

# Push db dan jalankan seeder
$ node ace migration:refresh --seed
```
