# Kumpulan Submission Dicoding

Repositori ini berisi kumpulan proyek submission dari berbagai kelas Dicoding yang pernah diikuti, mencakup kelas dasar JavaScript, front-end web, dan back-end pemula. Setiap folder adalah proyek yang berdiri sendiri.

## Daftar Proyek

| Folder | Keterangan |
| ------ | ---------- |
| `submission-dasar-js-fizz` | Submission kelas Belajar Dasar Pemrograman JavaScript: latihan komentar, gaya kode, penulisan tes (Jest), serta tugas opsional OOP, rekursi, full coverage testing, dan skenario dunia nyata |
| `submission-website-pemula` | Submission kelas Belajar Dasar Pemrograman Web: website statis dengan HTML, CSS, dan aset gambar |
| `submission-bookshelf-apps-new` | Aplikasi Bookshelf: kelola daftar buku (tambah, cari, pindah rak baca) dengan penyimpanan localStorage |
| `submission-notes-app-mid` | Aplikasi Notes App versi menengah: catatan ditampilkan dengan HTML, CSS, dan JavaScript vanilla |
| `submission-restful-api` | Aplikasi catatan yang mengonsumsi RESTful API (Notes API): tambah, hapus, arsip, dan batal arsip catatan, dibangun dengan Webpack 5 dan SweetAlert2 |
| `submission-belajar-be-pemula-dg-js` | Submission kelas Belajar Membuat Aplikasi Back-End untuk Pemula: Bookshelf API dengan Hapi dan penyimpanan data di memori |

## Teknologi per Proyek

- JavaScript (vanilla) untuk proyek front-end dasar
- HTML dan CSS untuk website statis
- Webpack 5, webpack-dev-server, Prettier, dan SweetAlert2 untuk `submission-restful-api`
- Node.js, framework Hapi (`@hapi/hapi`), nanoid, Nodemon, dan ESLint untuk Bookshelf API

## Struktur Repositori

```
submission/
├── submission-belajar-be-pemula-dg-js/   # Bookshelf API (Hapi)
│   └── src/                              # server.js, routes.js, handler.js, books.js
├── submission-bookshelf-apps-new/        # index.html, main.js, styles.css
├── submission-dasar-js-fizz/             # 01-writing-comments s.d. optional-07-real-world-scenario
├── submission-notes-app-mid/             # index.html, script.js, styles.css
├── submission-restful-api/               # src/, webpack.config.js, package.json
└── submission-website-pemula/            # index.html, css/, assets/, images/
```

## Cara Menjalankan

### Proyek statis (website-pemula, bookshelf-apps-new, notes-app-mid, dasar-js-fizz)

Buka berkas `index.html` pada folder proyek masing-masing di browser, atau jalankan server statis dari folder tersebut.

### submission-restful-api

```bash
cd submission-restful-api
npm install
npm run start-dev   # mode pengembangan (webpack serve)
npm run build       # build produksi ke folder dist
```

### submission-belajar-be-pemula-dg-js (Bookshelf API)

```bash
cd submission-belajar-be-pemula-dg-js
npm install
npm start           # atau npm run dev untuk mode nodemon
```

Server berjalan pada port yang dikonfigurasi di `src/server.js` (bawaan Hapi pada proyek ini).
