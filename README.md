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
PG_HOST=containers-us-west-78.railway.app
PG_PORT=6786
PG_USER=postgres
PG_PASSWORD=ckERvP9v6E7i6TVidDbw
PG_DB_NAME=railway
```

4. Jalankan migration

```bash
# Hanya push db
$ node ace migration:run

# Push db dan jalankan seeder
$ node ace migration:refresh --seed
```
