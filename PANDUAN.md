# Panduan Memasang Aplikasi Kunjungan Lapangan

Aplikasi ini memakai **project Firebase sendiri** (`field-app`), terpisah dari aplikasi Kebersihan. Konfigurasinya sudah terisi di `config.js`.

## Langkah 1: Rules Firestore

Buka project **field-app**, lalu Firestore, tab **Rules**. Tempel isi file `firestore.rules` di folder ini, lalu klik **Publish**. Rules terbaru mencakup koleksi `fv_photos` (tempat foto, selfie, dan tanda tangan disimpan terpisah agar laporan periode ringan dimuat).

## Langkah 2: Unggah ke GitHub (repository baru)

1. Login ke GitHub (heinsyen-git), klik **+**, lalu **New repository**.
2. Isi nama `field-app`, pilih **Public**, lalu klik **Create repository**.
3. Klik **uploading an existing file**. Seret **semua isi** folder `kunjungan-lapangan` (index.html, config.js, manifest.json, sw.js, firestore.rules, PANDUAN.md, dan folder icons), lalu klik **Commit changes**.
4. Buka **Settings**, lalu **Pages**. Pada Source pilih **Deploy from a branch**, Branch **main** dan **/ (root)**, lalu klik **Save**.
5. Tunggu 1–3 menit. Link aplikasi: **https://heinsyen-git.github.io/field-app/**

## Langkah 3: Penggunaan pertama (manager)

1. Buka link di komputer. Muncul halaman **Siapkan aplikasi**. Buat akun manager.
2. Menu **Customer**: tambahkan customer beserta **titik lokasi** dan **radius absen**. Titik bisa diisi dengan cara:
   - klik langsung di peta,
   - tempel koordinat dari Google Maps (klik kanan titik di Google Maps, lalu klik angka koordinat untuk menyalinnya), atau
   - tekan **Pakai lokasi saya** saat Anda sedang berada di lokasi customer.
   Customer tanpa titik tetap bisa dikunjungi. Setelah petugas check-in di sana, manager bisa menekan **Jadikan titik lokasi customer** pada kartu kunjungannya.
3. Menu **Pengguna**: buat akun untuk setiap petugas lapangan.

## Langkah 4: Pasang di HP petugas

1. Buka link di **Chrome** HP Android, lalu login.
2. Tekan **Pasang aplikasi di HP** (atau menu ⋮, lalu **Instal aplikasi**).
3. Saat check-in pertama kali, pilih **Izinkan** untuk akses **Lokasi** dan **Kamera**.
4. Pastikan **GPS/Lokasi** HP aktif, dengan mode akurasi tinggi.

## Cara kerja untuk petugas

1. Sampai di lokasi, tekan **Check-in di lokasi customer**.
2. Pilih customer. GPS terbaca otomatis dan menampilkan jarak ke titik customer, serta status **Di lokasi** atau **Di luar radius**.
3. Ambil foto bukti di lokasi. Foto otomatis diberi cap waktu, koordinat, dan nama petugas.
4. Pilih keperluan, lalu tekan **Check-in sekarang**.
5. Setelah selesai, tekan **Check-out dari lokasi**, isi hasil kunjungan, lalu kirim. Durasi kunjungan dihitung otomatis.

## Yang dicatat sistem

- **Waktu server** (bukan jam HP) saat check-in dan check-out. Jika jam HP berbeda lebih dari 5 menit, kunjungan diberi tanda.
- **Koordinat GPS, akurasi, dan jarak** ke titik customer saat check-in dan check-out.
- **Foto bukti** dengan cap waktu dan koordinat.
- Tanda peringatan jika check-in di luar radius, akurasi GPS rendah (lebih dari 100 m), atau waktu tidak sesuai.

## Batasan yang perlu diketahui

- Posisi dicatat **saat check-in dan check-out**, bukan dilacak terus-menerus sepanjang hari. Aplikasi web tidak bisa membaca lokasi di latar belakang ketika aplikasi ditutup.
- Aplikasi web tidak dapat mendeteksi aplikasi **fake GPS**. Foto bukti bercap koordinat dan tanda "di luar radius" membantu manager memeriksa kejanggalan.
- Jika tidak ada sinyal saat check-in, data tersimpan di HP dan terkirim otomatis saat sinyal kembali. Waktu server lalu mengikuti saat data terkirim, sehingga kunjungan itu diberi tanda selisih waktu.

## Laporan periode untuk atasan

Menu **Laporan periode** (khusus manager):
1. Pilih rentang tanggal (atau tombol cepat: Bulan ini, Bulan lalu, 7 hari, 30 hari) dan petugas.
2. Isi nama atasan yang dituju dan catatan manager.
3. Tekan **Susun laporan**. Sistem menghitung ringkasan, tren kunjungan, kinerja per petugas, rekap customer, keperluan, dan temuan kepatuhan.
4. Tekan **Cetak / Simpan PDF**, pilih printer **Simpan sebagai PDF**, lalu kirim PDF ke atasan untuk ditandatangani. Bisa juga **Unduh (HTML)**.

---

# Pembaruan Keamanan (Firebase Authentication + Rules berbasis peran)

Setelah pembaruan ini:
- Login memakai **Firebase Authentication** (Google). Password tidak lagi tersimpan di database aplikasi.
- Database hanya bisa diakses oleh pengguna yang login dan akunnya aktif.
- **Petugas** hanya bisa membuat kunjungan atas namanya sendiri, menambah check-out satu kali, dan hanya melihat kunjungannya sendiri. Petugas tidak bisa mengedit atau menghapus data.
- **Manager** mengelola customer dan pengguna, serta menghapus data.
- Waktu check-in dan check-out **dipaksa memakai waktu server** oleh aturan database.

## URUTAN PEMASANGAN (ikuti persis)

### 1. Aktifkan login Email/Password di Firebase
1. Buka https://console.firebase.google.com, lalu pilih project **field-app**.
2. Di menu kiri, buka **Security**, lalu **Authentication** (atau cari "Authentication"), lalu klik **Get started**.
3. Buka tab **Sign-in method**, pilih **Email/Password**, aktifkan sakelar pertama (**Email/Password**), lalu klik **Save**.
   Sakelar kedua ("Email link") biarkan mati.

### 2. Unggah aplikasi baru
Unggah `index.html` dan `config.js` ke repository GitHub **field-app** (Add file, lalu Upload files, lalu Commit changes). Tunggu 1–3 menit.

### 3. Aktivasi keamanan (segera setelah langkah 2)
1. Buka aplikasi di komputer. Muncul halaman **Aktivasi keamanan**.
2. Isi nama manager, **username** (boleh sama dengan yang lama), dan **password baru minimal 8 karakter**.
3. Klik **Aktifkan dan masuk**.

> Lakukan langkah 3 secepatnya. Sebelum aktivasi, siapa pun yang membuka aplikasi lebih dulu bisa mengaktifkannya.

### 4. Pasang Rules keamanan yang baru
1. Buka Firebase project **field-app**, lalu **Firestore**, tab **Rules**.
2. Hapus semua isinya, tempel isi file `firestore.rules` dari folder ini, lalu klik **Publish**.
3. Jika Firebase menampilkan pesan kesalahan saat Publish, jangan dipaksa. Kirim tangkapan layarnya ke pembuat aplikasi.

### 5. Aktifkan akun petugas
1. Di aplikasi, buka menu **Pengguna**. Akun lama berstatus **Perlu aktivasi**.
2. Tekan **Aktifkan**, tentukan password baru (minimal 8 karakter), lalu beri tahu petugas secara langsung.
3. Petugas membuka aplikasi di HP, lalu login dengan username yang sama dan password baru.

### 6. Uji coba
- [ ] Manager bisa melihat Pemantauan, Customer, dan Laporan.
- [ ] Petugas bisa check-in dan check-out.
- [ ] Di menu Riwayat, petugas hanya melihat kunjungannya sendiri.
- [ ] Login dengan password salah ditolak.
- [ ] Akun yang dinonaktifkan tidak bisa masuk.

Jika muncul pesan "Akses ditolak oleh aturan keamanan", kirim tangkapan layarnya.

## Mengelola password
- **Ganti password sendiri:** menu **Akun** (petugas) atau tombol **Password** (manager).
- **Lupa password:** manager membuka **Pengguna**, lalu **Atur ulang password**. Password lama langsung tidak berlaku.
- **Hapus akun:** akun langsung tidak bisa dipakai lagi.

---

# App Check (lapisan tambahan, disarankan)

App Check memastikan hanya aplikasi Anda yang bisa mengakses database, bukan skrip atau alat lain.

1. Buat kunci reCAPTCHA v3 di https://www.google.com/recaptcha/admin/create
   - Jenis: **Score based (v3)**
   - Domain: `heinsyen-git.github.io` (tambahkan juga `field-app-27a44.web.app` dan `field-app-27a44.firebaseapp.com` jika pindah ke Firebase Hosting)
   - Simpan **Site key** dan **Secret key**.
   (Tampilan halaman ini bisa berbeda karena Google sedang memindahkan reCAPTCHA ke Google Cloud.)
2. Di Firebase project **field-app**, buka **App Check**, lalu **Apps**. Pilih aplikasi web **Lapangan**, pilih **reCAPTCHA v3**, tempel **Secret key**, lalu **Save**.
3. Buka `config.js`, hapus tanda `//` di depan baris `appCheckKey`, lalu ganti `ISI_SITE_KEY_RECAPTCHA_V3` dengan **Site key**. Unggah ulang `config.js`.
4. Tunggu 1–2 hari, lalu buka **App Check** di Firebase. Jika hampir semua permintaan berstatus "Verified", klik **Enforce** untuk **Cloud Firestore** dan **Authentication**.
   Jangan klik Enforce sebelum langkah 3 berjalan, karena aplikasi akan ditolak.

---

# Pindah ke Firebase Hosting dan repository privat (opsional)

Agar kode aplikasi tidak bisa dilihat publik:

1. Pasang **Node.js LTS** dari https://nodejs.org
2. Buka Command Prompt, lalu jalankan:
   ```
   npm install -g firebase-tools
   firebase login
   cd C:\lokasi\folder\kunjungan-lapangan
   firebase deploy --only hosting
   ```
   File `firebase.json` dan `.firebaserc` di folder ini sudah disiapkan, jadi tidak perlu `firebase init`.
3. Aplikasi tersedia di **https://field-app-27a44.web.app**
4. Di setiap HP petugas: hapus ikon aplikasi lama, buka link baru di Chrome, lalu **Pasang aplikasi di HP**.
5. Setelah semua HP pindah, ubah repository GitHub **field-app** menjadi **Private** (Settings, lalu General, lalu Danger Zone, lalu Change visibility). GitHub Pages lama otomatis berhenti.
6. Untuk pembaruan berikutnya, jalankan lagi `firebase deploy --only hosting` dari folder yang sama.

---

# Arsip & backup bulanan

Menu **Pengaturan** (manager), bagian **Arsip & backup bulanan**:
1. Pilih **Bulan**, lalu tekan **Unduh backup**. Anda akan mendapat file `backup-kunjungan-lapangan-YYYY-MM.zip` berisi:
   - `laporan.html`: dibuka dengan klik dua kali setelah ZIP diekstrak, menampilkan semua kunjungan beserta foto.
   - `data.json` dan folder `foto/`: untuk dipulihkan ke aplikasi.
2. Simpan file ZIP di **NAS kantor** dan/atau **Google Drive**.
3. Tekan **Hapus data bulan ini…**, ketik **HAPUS**, lalu konfirmasi. Bulan yang sedang berjalan tidak bisa dihapus.
4. Untuk mengembalikan data: tekan **Pilih file backup (.zip)**, lalu **Pulihkan**. Data yang dipulihkan diberi label "Dipulihkan dari arsip".

Lakukan backup dan hapus dari **komputer** (bukan HP), karena file satu bulan bisa berukuran ratusan MB.
