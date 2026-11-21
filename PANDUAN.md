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
