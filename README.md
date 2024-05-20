# Final Project Pemrograman Framework

Repository ini dibuat untuk mengerjakan sebuah Final Project mata kuliah Pemrograman Framework dengan membuat sebuah Supplier Management App.

## Cara Menjalankan Aplikasi

1. Buat file `.env` di root direktori proyek dengan isi sebagai berikut:

    ```plaintext
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

2. Install dependencies dengan perintah berikut:
    ```sh
    npm install
    ```
    atau
    ```sh
    yarn install
    ```

3. Jalankan aplikasi dengan perintah:
    ```sh
    npm run server
    ```
    atau
    ```sh
    yarn run server
    ```

Aplikasi akan berjalan pada port yang telah ditentukan di file `.env`.

## Struktur Proyek

Berikut adalah struktur dasar dari proyek ini:

