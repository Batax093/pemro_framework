# Final Project Pemrograman Framework

Repository ini dibuat untuk mengerjakan sebuah Final Project mata kuliah Pemrograman Framework dengan membuat sebuah Supplier Management App.

## Cara Menjalankan Aplikasi

1. Buat file `.env` di root direktori proyek dengan isi sebagai berikut:

    ```plaintext
    PORT=5000

    // you can create your own mongodb url using mongodb atlas or mongodb compass
    MONGO_URI=your_mongodb_uri

    // you can generate random text using rand()
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development

    // this is your email for using apps password
    EMAIL_USER=your_email_apps

    // you can get the apps password by configure your account
    EMAIL_PASS=your_email_apps_pass
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
    Untuk backend
    npm run server
    
    Untuk frontend
    npm run dev
    ```
    atau
    ```sh
    yarn run server
    yarn run dev
    ```

Aplikasi akan berjalan pada port yang telah ditentukan di file `.env`.

## Fitur Aplikasi

- **Umum**: Home, Login, Daftar
- **Supplier**: Profil, Data Pendukung, Mengajukan menjadi Daftar Supplier Tetap (DST)
- **Manajer**: Melihat DST
- **Administrator**: Manajemen User, Manajemen DST, Manajemen Spesifikasi
- **Fitur Khusus**: 
  - Kirim email ke supplier
  - Membuat pengumuman untuk ditampilkan ke home

## Teknologi yang Digunakan

- **Frontend**: (React.js / Vue.js)
- **Backend**: Node.js dengan Express.js
- **Database**: MongoDB
