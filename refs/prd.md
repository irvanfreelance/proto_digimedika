# PRD — DigiKlinik

**Versi:** 1.0 · **Tanggal:** 21 Oktober 2026 · **Status:** Draft untuk persetujuan
**Dokumen pendamping:** `erd.md` (skema data teruji), `landingpage_brief.md` (brief halaman pemasaran)
**Lingkup dokumen:** kebutuhan produk (apa & mengapa). Tidak memuat TRD/arsitektur teknis.

---

## 1. Ringkasan

**DigiKlinik** adalah SaaS digitalisasi klinik *all-in-one* untuk **klinik non-BPJS**: klinik kecantikan & estetika, klinik mata, laboratorium khusus, klinik spesialis (anak, kandungan, gigi estetik, dll.) dan klinik spesifik lain yang **bukan klinik pratama**. Pasien mereka umumnya **umum/pembayar mandiri, kalangan menengah ke atas**, yang menghargai kenyamanan, kepastian jadwal, dan layanan prioritas.

Produk terdiri dari dua aplikasi pada satu platform:

| Aplikasi | Pengguna | Tujuan |
|---|---|---|
| **Public App** (web responsif + PWA; aplikasi native bisa menyusul) | Pasien & keluarganya | Booking semudah beli tiket pesawat, bayar, check-in, pantau antrian, cari arah, tebus/terima obat, lihat riwayat & hasil |
| **Internal Admin App** | Owner, admin, front desk (FDI), dokter/expert, kasir, apoteker, analis lab, marketing | Menjalankan operasional klinik harian dengan antrian rapi dan data terpadu |

Mode penggunaan: **single klinik** atau **multi klinik/cabang** dalam satu akun owner.

### 1.1 Pernyataan masalah

1. Pasien harus telepon/WhatsApp berulang untuk mencari jadwal dokter, dan tidak tahu slot mana yang masih ada.
2. Antrian **tidak jelas**: pasien booking dan pasien walk-in bercampur, yang sudah janji tetap menunggu lama, antrian menumpuk di jam tertentu.
3. Pembayaran terpecah (transfer manual, tunai, EDC), rekonsiliasi lambat, banyak slot hangus karena *no-show* tanpa deposit.
4. Pasien baru bingung mencari ruangan; front desk jadi pemandu.
5. Obat/skincare harus diambil sendiri, padahal pasien ingin dikirim.
6. Data pasien tersebar (kertas, Excel, chat), riwayat keluarga tidak terkait, hasil lab/skrining dikirim manual.
7. Software klinik yang ada cenderung dibangun untuk kebutuhan **BPJS/klinik pratama** (administratif, bukan pengalaman pasien) dan harganya per bulan terasa berat untuk klinik kecil-menengah.

### 1.2 Proposisi nilai

> **"Booking jadwal klinik semudah beli tiket pesawat. Antrian rapi, bayar sekali scan, obat sampai rumah."**

Diferensiator inti (tidak ada di sebagian besar software klinik pratama):

1. **Booking ala tiket pesawat**: cari berdasarkan **dokter/expert** *atau* berdasarkan **tanggal**, strip tanggal dengan label ketersediaan.
2. **Dua jalur antrian yang dibedakan**: *booking* vs *walk-in* (+ jalur **eksekutif**), sehingga yang sudah janji tidak ikut menumpuk dengan yang datang mendadak.
3. **Pasien eksekutif**: slot khusus, lebih cepat, lebih fleksibel, harga tersendiri.
4. **Pembayaran multi-channel termasuk QRIS**, deposit untuk mengurangi no-show.
5. **Check-in digital + wayfinder** menuju ruangan.
6. **Obat/treatment: ambil di klinik atau dikirim GoSend.**
7. **Satu akun keluarga**: daftarkan anak/orang tua, riwayat, daftar obat/treatment, hasil lab & skrining.
8. **Harga langganan lebih terjangkau** dari pemain yang ada (lihat §11).

---

## 2. Riset Kompetitor (hasil pencarian web, 21 Okt 2026)

> Data berasal dari halaman publik vendor & artikel pihak ketiga; belum diverifikasi independen. Harga bisa berubah — **tinjau ulang sebelum dipakai di materi pemasaran**.

| Kompetitor | Positioning | Fitur menonjol | Harga publik | Catatan untuk DigiKlinik |
|---|---|---|---|---|
| **Klinik Pintar** | Aplikasi klinik berbasis web, paling luas jangkauannya (klaim 3.000+ klinik, 350+ kota) | RME ICD-10, antrian & reservasi online, inventori, pembayaran, laporan, **integrasi SATUSEHAT, PCare BPJS, Mobile JKN**; halaman khusus klinik kecantikan (RME estetik, foto before-after, paket & deposit, komisi terapis) | Mandiri **Rp0** (1 poli, 2 nakes, RME s.d. 1.000) · Siap **Rp300 rb/bln** · Tumbuh Jaringan **Rp600 rb/bln** (antarcabang, telekonsultasi, komisi) | Pesaing utama. Kuat di administrasi & BPJS; pengalaman pasien (booking visual, wayfinder, GoSend, antrian berbeda) bukan titik fokus |
| **AIDO Klinika** | Cloud clinic system terjangkau | Antrian & reservasi, RME (ICD-10/ICD-9/SNOMED), BPJS & SATUSEHAT, billing, farmasi | Mulai **Rp75 rb/bln** | Menetapkan "lantai harga" paket dasar |
| **Assist.id** | Sistem klinik cloud | RME SOAP/ICD-10, penjadwalan, PCare & SATUSEHAT, laporan keuangan real-time | Tidak dipublikasikan | — |
| **MyKlinik** | Berbasis web | RME, booking online, modul lab & radiologi, inventori, keuangan, PCare & SATUSEHAT | Tidak dipublikasikan | — |
| **EziClinic** | Berbasis web | Penjadwalan terstruktur, EMR + billing, laporan otomatis, PCare | Tidak dipublikasikan | — |
| **Omnicare** | Reservasi + EMR | Reservasi online dengan pengingat SMS/WhatsApp, farmasi & lab | Tidak dipublikasikan | — |
| **Mekari (suite)** | Suite bisnis | CRM pasien, stok obat, laporan keuangan; RME/portal pasien sebagai custom | Tidak dipublikasikan | — |
| **Good Doctor** | Platform kesehatan digital (telemedis, korporasi) | Bukan sistem operasional klinik | — | Bukan pesaing langsung operasional; relevan sebagai referensi pengalaman konsumen |

**Pola layar kompetitor yang diadaptasi (dari screenshot):** header `Kota → Kategori` + tanggal; **strip tanggal** (Min 18, Sen 19, …) dengan label **"Ada Slot" / "Terbatas"**; tombol **Filter Lengkap**; kartu dokter (foto, nama, spesialisasi, klinik/RS, rating, tahun pengalaman, ikon terverifikasi); blok **"Pilih Jadwal Praktek"** berisi chip jam dengan status warna **Tersedia (hijau) / Hampir Penuh (kuning) / Waiting List (merah)**.

**Celah pasar yang dituju:**
1. Pengalaman pasien kelas konsumen (bukan hanya administrasi).
2. Pembeda antrian walk-in vs booking + jalur eksekutif.
3. Wayfinder, GoSend, QRIS & deposit terintegrasi sebagai fitur bawaan.
4. Fokus segmen estetika/mata/lab/spesialis dengan harga yang kompetitif.
5. Tidak terbebani alur BPJS → antarmuka lebih sederhana dan cepat.

---

## 3. Target Pengguna & Persona

### 3.1 Segmen klinik (ICP)
- **Utama:** klinik kecantikan/estetika, klinik mata, laboratorium klinik khusus, klinik anak/kandungan/gigi estetik, klinik tumbuh kembang, wellness. Omzet pasien umum/asuransi swasta/korporasi.
- **Ukuran:** 1–10 cabang, 2–60 dokter/expert.
- **Bukan target:** klinik pratama dan faskes yang kebutuhan utamanya klaim/kapitasi BPJS (PCare, Mobile JKN, INA-CBG). *Integrasi BPJS secara eksplisit di luar lingkup.*

### 3.2 Persona

| Persona | Kebutuhan & rasa sakit | Fitur kunci |
|---|---|---|
| **Rina (32), karyawan, ibu 1 anak, merawat ibunya** | Tidak punya waktu telepon; ingin tahu slot dokter langsung; mengelola jadwal anak & ibu di satu tempat | Booking visual, akun keluarga, reminder, riwayat |
| **Kevin (38), eksekutif sibuk** | Tidak mau antri; jadwal sering berubah | Slot & jalur eksekutif, reschedule fleksibel, check-in dari mobil |
| **Maya (35), datang tanpa janji** | Kadang butuh layanan hari itu juga | Walk-in resmi dengan nomor antrian & estimasi tunggu jelas |
| **dr. Anindya (owner klinik estetika, 3 cabang)** | No-show tinggi, antrian kacau, laporan tidak real-time, bingung komisi | Deposit, antrian dua jalur, dashboard multi-cabang, komisi |
| **Dewi (FDI)** | Ditelepon terus, input ganda, dimarahi pasien karena antrian | Agenda satu layar, check-in cepat, kontrol antrian |
| **dr. Michael (dokter)** | Perlu lihat pasien berikutnya + riwayat cepat | Daftar pasien, RME ringkas, foto before-after |
| **Maya (kasir) / Fajar (apoteker) / Bambang (analis lab)** | Rekonsiliasi pembayaran, stok, rilis hasil | Modul kasir, stok & pengiriman, input & validasi hasil |

---

## 4. Tujuan & Metrik Keberhasilan

| Tujuan | Metrik | Target 6 bulan setelah go-live klinik |
|---|---|---|
| Mengurangi no-show | % booking berstatus `no_show` | Turun ≥ 40% dari baseline klinik |
| Merapikan antrian | Rata-rata waktu tunggu jalur booking | ≤ 10 menit; walk-in ≤ 30 menit (dilaporkan transparan) |
| Adopsi digital | % booking via Public App/web | ≥ 60% |
| Bayar digital | % transaksi non-tunai | ≥ 70% |
| Efisiensi front desk | Waktu rata-rata pendaftaran + check-in | ≤ 90 detik per pasien |
| Retensi pasien | Pasien dengan ≥ 2 kunjungan dalam 90 hari | +15% |
| Kepuasan | Rating rata-rata kunjungan | ≥ 4,5 / 5 |
| Bisnis SaaS | Churn bulanan klinik berlangganan | ≤ 3% |

---

## 5. Cakupan & Fase Rilis

| Fase | Isi | Keluaran |
|---|---|---|
| **MVP (go-live pilot)** | Booking (dokter/tanggal), strip ketersediaan, akun & keluarga, pembayaran QRIS/VA/e-wallet + tunai, deposit, check-in QR, antrian 3 jalur, notifikasi WhatsApp/push, admin: jadwal, agenda, pasien, antrian, kasir, laporan dasar, RBAC | 3–5 klinik pilot |
| **V1.1** | RME ringkas (SOAP, ICD-10, resep, foto before-after), paket treatment & potong sesi, stok obat & pengambilan, **GoSend**, hasil lab & skrining di Public App, wayfinder, waiting list otomatis | Rilis publik |
| **V1.2** | Multi-cabang penuh (laporan konsolidasi, pasien lintas cabang), komisi dokter/terapis, voucher/promo, ulasan, banner, kiosk check-in | Skala |
| **V2** | Integrasi SATUSEHAT (bila diwajibkan regulator untuk jenis klinik target — *perlu verifikasi hukum*), asuransi swasta/korporasi, telekonsultasi, rekomendasi cerdas jadwal, aplikasi native | Ekspansi |

**Di luar lingkup (non-goals):** klaim BPJS/PCare/Mobile JKN, rawat inap, manajemen SDM/penggajian penuh, akuntansi umum (hanya ekspor), marketplace umum antar klinik (publik hanya melihat klinik yang bergabung; arsitektur data mendukung kelak).

---

## 6. Aturan Bisnis Inti

### 6.1 Slot & ketersediaan
- Slot dihasilkan otomatis dari **pola jadwal mingguan** dokter/expert (per klinik), 60 hari ke depan; libur klinik & cuti dokter menutup slot.
- Setiap slot punya **kapasitas online** dan **kapasitas walk-in** terpisah, serta kelas `regular` atau `executive`.
- Label ketersediaan (konsisten dengan layar kompetitor):
  - **Tersedia** (hijau): sisa kapasitas online > 25%.
  - **Hampir Penuh** (kuning): sisa kapasitas 1–25%.
  - **Waiting List** (merah): sisa 0; pasien dapat masuk daftar tunggu.
  - **Ada Slot / Terbatas / Penuh** pada strip tanggal = agregasi label di atas untuk filter aktif (kota, kategori, dokter).
- Pembulatan: sisa ≤ 25% dihitung dari kapasitas total slot pada tanggal tersebut (ambang dapat diubah per klinik).

### 6.2 Booking
1. Pasien memilih pasien (diri/keluarga) → layanan → dokter/tanggal → jam → konfirmasi.
2. Kursi **di-hold 15 menit** (`hold_expires_at`) bila layanan butuh deposit; hangus otomatis bila tidak dibayar.
3. Layanan tanpa deposit langsung `confirmed`.
4. **Deposit** (opsional, per layanan/klinik): persen atau nominal; dipotong dari tagihan akhir.
5. Satu pasien tidak dapat memesan dua slot aktif yang sama; sistem menolak duplikat.
6. **Pembatalan**: gratis hingga *cut-off* (default 3 jam sebelum jadwal). Lewat cut-off, deposit tidak dikembalikan (kebijakan dapat diubah klinik). Refund diproses ke metode asal.
7. **Reschedule**: membuat booking baru yang menaut ke booking lama; deposit dipindahkan.
8. **No-show**: ditandai otomatis setelah masa toleransi (default 15 menit) tanpa check-in; dapat dibatalkan manual oleh FDI.

### 6.3 Pasien eksekutif
- Klinik mengaktifkan opsi eksekutif per cabang. Slot eksekutif dikelola terpisah (kapasitas kecil, jam tertentu).
- Harga eksekutif = `executive_price` per layanan atau persentase surcharge default (50%) — ditampilkan transparan sebelum bayar.
- Jalur antrian **E-** (prioritas tertinggi), target tunggu ≤ 5 menit, panggilan didahulukan; fleksibilitas: reschedule hingga 1 jam sebelum jadwal tanpa penalti.

### 6.4 Antrian: booking vs walk-in vs eksekutif
| Jalur | Awalan | Prioritas | Target tunggu | Cara masuk |
|---|---|---|---|---|
| Eksekutif | **E-** | Tertinggi | ≤ 5 menit | Booking slot eksekutif + check-in |
| Booking | **A-** | Tinggi | ≤ 10 menit | Booking + check-in (QR/geofence/FDI/kiosk) |
| Walk-in | **W-** | Normal | ≤ 30 menit (estimasi ditampilkan) | Daftar di FDI/kiosk pada kapasitas walk-in slot hari itu |

- Nomor urut **harian per cabang per jalur**, tanpa celah/duplikat.
- Walk-in **bisa on-the-spot** (didaftarkan FDI, tetap tercatat di sistem dan memakai kapasitas walk-in), tetapi **tidak menyalip** pasien booking yang sudah check-in tepat waktu.
- Pasien booking yang datang terlambat melewati toleransi diturunkan ke jalur walk-in (dengan notifikasi).
- Estimasi waktu tunggu dihitung dari antrian di depan × rata-rata durasi layanan dokter.
- Pasien memantau posisi antrian dari ponsel; notifikasi saat 3 nomor lagi dan saat dipanggil.

### 6.5 Check-in
Metode: **QR mandiri** (tiket di aplikasi), **geofence** (otomatis saat berada ≤ 300 m dari klinik, dapat dimatikan), **front desk**, **kiosk**. Check-in dibuka mulai **60 menit** sebelum jadwal. Check-in dari rumah/mobil mengeluarkan nomor antrian lebih awal.

### 6.6 Pembayaran
- Metode: **QRIS**, Virtual Account (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, ShopeePay, DANA), kartu kredit, debit (EDC), tunai, transfer manual.
- Setiap klinik memilih metode aktif, urutan tampil, dan apakah biaya gateway dibebankan ke pasien atau klinik.
- Pembayaran idempoten: notifikasi ganda dari gateway tidak membuat transaksi ganda.
- Kedaluwarsa pembayaran default 15 menit untuk deposit; tagihan kunjungan 24 jam.
- Struk/invoice digital (PDF + tautan) otomatis ke WhatsApp/email.

### 6.7 Obat & treatment: ambil atau kirim
- Setelah resep/treatment selesai dan tagihan lunas, pasien memilih **ambil di klinik** (kode ambil 6 karakter) atau **kirim**.
- **Pengiriman GoSend** (instant/same-day): klinik memesan driver dari aplikasi admin; biaya ongkir ditagihkan ke pasien atau disubsidi; pasien melihat nama driver & pelacakan; bukti serah terima foto.
- Obat resep hanya dapat dikirim bila apoteker memverifikasi; produk yang ditandai tidak boleh dikirim hanya tersedia untuk diambil.
- Stok otomatis berkurang dari batch dengan kedaluwarsa terdekat (FEFO).

### 6.8 Paket treatment (kecantikan)
Pasien membeli paket (mis. Laser Toning 6×). Setiap sesi memotong saldo; sisa sesi & masa berlaku terlihat di aplikasi; pengingat sesi berikutnya.

### 6.9 Akun & keluarga
- Login publik dengan **nomor WhatsApp + OTP** (tanpa wajib password); opsional Google.
- Satu akun dapat mengelola banyak **profil pasien** (diri sendiri, anak, pasangan, orang tua) lintas klinik. Izin per profil: boleh booking, boleh lihat hasil.
- Data medis dan hasil hanya terlihat oleh akun yang ditautkan dan setelah dirilis klinik.
- Deteksi duplikat pasien (NIK ter-hash, nama + tanggal lahir + HP) dan alat gabung data di admin.

### 6.10 Single vs multi klinik
- **Single:** pengaturan disederhanakan (tanpa pemilih cabang).
- **Multi:** owner melihat konsolidasi; staf memiliki akses per cabang; katalog layanan dibagi di tingkat tenant dengan **harga per cabang**; pasien memiliki satu No. RM per tenant yang berlaku di semua cabang; dokter dapat praktik di beberapa cabang.

---

## 7. PUBLIC APP — Menu, Halaman & Fitur

### 7.1 Peta navigasi
Bottom navigation (mobile): **Beranda · Cari/Booking · Antrian & Tiket · Riwayat · Akun**

```
Beranda
├─ Pencarian cepat (Dokter / Layanan / Klinik)
├─ Banner promo & kategori
├─ Booking mendatang (kartu tiket + tombol Check-in)
└─ Pintasan: Hasil Lab, Obat Saya, Keluarga
Cari/Booking
├─ Pilih Kota/Klinik → Pilih Kategori (Dokter / Layanan / Lab / Paket)
├─ Hasil pencarian (mode Dokter | mode Tanggal)
├─ Detail Dokter / Detail Layanan
├─ Pilih Jadwal → Pilih Pasien → Ringkasan & Syarat
├─ Pembayaran (deposit/lunas)
└─ Tiket & Konfirmasi
Antrian & Tiket
├─ Tiket saya (QR) · Check-in
├─ Status antrian live (nomor, posisi, estimasi)
└─ Petunjuk arah (Wayfinder)
Riwayat
├─ Kunjungan · Tagihan & Struk
├─ Obat & Resep · Treatment & Paket
└─ Hasil Lab · Hasil Skrining
Akun
├─ Profil · Keluarga · Alamat · Metode bayar tersimpan
├─ Notifikasi & Privasi · Bantuan · Keluar
```

### 7.2 Halaman & fitur

| # | Halaman | Fitur & perilaku | Prioritas |
|---|---|---|---|
| P1 | **Onboarding & Login** | Masuk dengan nomor WhatsApp → OTP (6 digit, 5 menit, maks 5 percobaan) · Google opsional · persetujuan privasi (UU PDP) · "Lanjut sebagai tamu" hanya untuk melihat jadwal | MVP |
| P2 | **Beranda** | Kartu booking mendatang dengan hitung mundur · pencarian cepat · kategori (Kecantikan, Mata, Lab, Anak, dst.) · promo/banner · rekomendasi dokter · peringatan (pembayaran tertunda, hasil siap) | MVP |
| P3 | **Pilih Lokasi & Kategori** | Header **"Kota → Kategori"** · pencarian klinik berdasarkan kota/jarak · tab kategori | MVP |
| P4 | **Hasil Pencarian — Mode Dokter** | Daftar kartu dokter: foto, nama, spesialisasi, klinik, rating, tahun pengalaman, lencana verifikasi STR · chip jam dengan status warna (**Tersedia / Hampir Penuh / Waiting List**) · urutkan (rating, terdekat, jadwal tercepat, harga) | MVP |
| P5 | **Hasil Pencarian — Mode Tanggal** | **Strip tanggal horizontal** (7–14 hari) dengan label **Ada Slot / Terbatas / Penuh** per hari · ganti tanggal tanpa memuat ulang · menampilkan semua dokter pada tanggal itu | MVP |
| P6 | **Filter Lengkap** | Spesialisasi · klinik/cabang · rentang jam (pagi/siang/sore/malam) · rentang harga · rating minimum · jenis kelamin dokter · bahasa · **hanya slot eksekutif** · hanya yang tersedia | MVP |
| P7 | **Detail Dokter/Expert** | Profil, pengalaman, layanan & harga, jadwal 14 hari, ulasan terverifikasi (hanya dari pasien yang selesai kunjungan), klinik praktik | MVP |
| P8 | **Detail Layanan/Treatment** | Deskripsi, durasi, harga (regular & eksekutif), persiapan sebelum datang, kontraindikasi, paket tersedia, dokter yang melayani | MVP |
| P9 | **Pilih Jadwal** | Pilih tanggal + jam · slot kelas eksekutif ditandai · ikon durasi · jika penuh: tombol **"Masuk Waiting List"** (pilih rentang jam dan notifikasi) | MVP |
| P10 | **Pilih Pasien** | Daftar profil keluarga · tambah profil baru inline · tampilkan alergi tercatat · peringatan bila layanan tak sesuai usia/jenis kelamin | MVP |
| P11 | **Ringkasan & Syarat** | Rincian harga, surcharge eksekutif, deposit, kebijakan pembatalan, voucher · keluhan singkat · unggah foto (opsional, untuk kecantikan) · persetujuan | MVP |
| P12 | **Pembayaran** | Pilihan **QRIS (rekomendasi)**, VA, e-wallet, kartu · hitung mundur hold 15 menit · status real-time · gagal/kedaluwarsa → coba lagi tanpa kehilangan pilihan | MVP |
| P13 | **Konfirmasi & Tiket** | Kode booking, QR check-in, tambah ke kalender, bagikan, petunjuk persiapan, tombol Ubah Jadwal/Batalkan | MVP |
| P14 | **Ubah Jadwal / Batal** | Alur 2 langkah, tampilkan konsekuensi biaya sebelum konfirmasi, refund otomatis bila memenuhi syarat | MVP |
| P15 | **Check-in** | QR mandiri · geofence otomatis · tombol **"Saya Sudah Dekat"** · mendapatkan nomor antrian (A-/W-/E-) | MVP |
| P16 | **Status Antrian Live** | Nomor saya, nomor yang sedang dilayani, posisi, estimasi tunggu, ruang tujuan · notifikasi push saat 3 nomor lagi & saat dipanggil | MVP |
| P17 | **Wayfinder** | Peta lantai, rute dari pintu masuk/FDI/lift ke ruangan tujuan, instruksi langkah demi langkah, opsi **rute ramah kursi roda**, ganti lantai | V1.1 |
| P18 | **Walk-in Digital (via QR di lobi)** | Scan QR klinik → daftar singkat → ambil nomor W- dengan estimasi tunggu (tanpa perlu antri di FDI) | V1.1 |
| P19 | **Tagihan & Pembayaran Sisa** | Daftar tagihan, bayar sisa setelah kunjungan, unduh struk/invoice | MVP |
| P20 | **Tebus Obat / Treatment** | Setelah resep: pilih **Ambil di klinik** (tampilkan kode ambil) atau **Kirim GoSend** (pilih alamat, lihat ongkir & estimasi) | V1.1 |
| P21 | **Lacak Pengiriman** | Status: mencari driver → driver ditugaskan → dalam perjalanan → tiba; nama/plat/nomor driver; tautan pelacakan | V1.1 |
| P22 | **Riwayat Kunjungan** | Filter per anggota keluarga & klinik; ringkasan dokter, diagnosis (sesuai kebijakan klinik), tagihan | MVP |
| P23 | **Obat Saya & Resep** | Daftar obat aktif: nama, dosis, frekuensi, sisa hari; tombol "Beli lagi/Kirim ulang"; pengingat minum obat (opsional) | V1.1 |
| P24 | **Treatment & Paket** | Riwayat treatment (area, catatan, foto before-after jika diizinkan) · saldo paket, sesi terpakai, masa berlaku · jadwalkan sesi berikutnya | V1.1 |
| P25 | **Hasil Lab** | Daftar order, parameter, nilai, satuan, rentang normal, penanda L/H · unduh PDF · bagikan ke dokter · grafik tren parameter | V1.1 |
| P26 | **Hasil Skrining** | Skor & tingkat risiko (rendah/sedang/tinggi), ringkasan, rekomendasi; riwayat perbandingan antar waktu (mis. analisis kulit, skrining mata) | V1.1 |
| P27 | **Keluarga** | Tambah/ubah/hapus profil, hubungan, izin per profil, undang anggota keluarga untuk mengelola sendiri (bagi akses) | MVP |
| P28 | **Alamat** | Simpan beberapa alamat pengiriman dengan titik peta | V1.1 |
| P29 | **Ulasan** | Beri rating & komentar setelah kunjungan selesai (1 ulasan per kunjungan) | V1.2 |
| P30 | **Notifikasi** | Pusat notifikasi dalam aplikasi · preferensi kanal (WhatsApp, push, email) · senyap malam hari untuk promosi | MVP |
| P31 | **Voucher & Promo** | Masukkan kode voucher, lihat voucher aktif, riwayat pemakaian | V1.2 |
| P32 | **Privasi & Data** | Kelola persetujuan, unduh data saya, hapus akun (dengan batasan retensi rekam medis) | MVP |
| P33 | **Bantuan** | FAQ, kontak klinik (WhatsApp), laporkan masalah | MVP |
| P34 | **Halaman Klinik** | Profil klinik, foto, jam buka, peta & rute, fasilitas, dokter, layanan unggulan, ulasan (halaman *white-label* per tenant, dapat memakai domain sendiri) | MVP |

### 7.3 Kriteria penerimaan alur utama (Public App)

**A. Booking (P3–P13)**
- Dari beranda hingga tiket ≤ **5 ketukan** untuk pengguna berulang (profil & metode bayar tersimpan).
- Strip tanggal dan daftar dokter tampil ≤ **1 detik** pada koneksi 4G normal.
- Dua pasien merebut kursi terakhir: salah satu berhasil, yang lain langsung melihat "slot baru saja penuh" + usulan slot terdekat + opsi Waiting List.
- Hold kedaluwarsa melepas kursi otomatis dalam ≤ 1 menit setelah batas.

**B. Pembayaran (P12)**
- Status berubah menjadi *Dibayar* ≤ **10 detik** setelah pembayaran QRIS berhasil tanpa perlu muat ulang.
- Gagal bayar tidak membuat booking ganda; "coba lagi" memakai tagihan yang sama.

**C. Check-in & antrian (P15–P16)**
- Check-in menghasilkan nomor di jalur yang benar (booking → A-, eksekutif → E-, walk-in → W-).
- Posisi dan estimasi antrian diperbarui ≤ **5 detik** setelah petugas memanggil nomor berikutnya.

**D. Keluarga (P10, P27)**
- Booking atas nama anak tidak memerlukan login terpisah; riwayat anak terlihat di akun orang tua.

**E. Hasil (P25–P26)**
- Hasil hanya muncul setelah **dirilis** (divalidasi) oleh klinik; pasien menerima notifikasi.

### 7.4 Keadaan khusus (semua halaman)
Offline/koneksi buruk (tiket tetap dapat dibuka dari cache) · slot berubah saat dipilih · sesi habis · layanan hanya tersedia untuk jenis kelamin/usia tertentu · klinik tutup/libur · bahasa Indonesia (utama) dan Inggris (V1.2) · aksesibilitas (kontras, ukuran font, pembaca layar).

---

## 8. INTERNAL ADMIN APP — Menu, Halaman & Fitur

### 8.1 Peta navigasi (sidebar)

```
Dashboard
Operasional Harian
├─ Agenda & Booking
├─ Antrian (Kontrol)
├─ Front Desk (Registrasi & Check-in)
├─ Layar Antrian (Display)
├─ Waiting List
Pasien
├─ Daftar Pasien · Detail Pasien · Gabung Data Ganda
Klinis
├─ Daftar Kunjungan (Encounter) · RME Ringkas
├─ Resep · Treatment & Foto · Paket Pasien
├─ Laboratorium (Order, Input Hasil, Validasi)
├─ Skrining
Kasir & Keuangan
├─ Tagihan · Pembayaran · Refund · Tutup Kasir
├─ Voucher & Promo · Komisi
Apotek & Gudang
├─ Stok · Batch & Kedaluwarsa · Penerimaan · Penyesuaian
├─ Pengambilan & Pengiriman (GoSend)
Master Data
├─ Klinik & Cabang · Fasilitas (Ruang/Alat/Lantai) · Wayfinder Editor
├─ Dokter/Expert · Jadwal & Cuti · Layanan & Harga · Paket
├─ Metode Pembayaran · Template Notifikasi · Banner
Laporan
Pengaturan
├─ Pengguna & Peran · Kebijakan Booking · Aturan Antrian
├─ Integrasi (Pembayaran, WhatsApp, GoSend) · Langganan · Audit Log
```

### 8.2 Halaman & fitur

#### A. Dashboard
| # | Halaman | Fitur |
|---|---|---|
| A1 | **Dashboard Cabang** | Hari ini: booking, check-in, selesai, no-show, walk-in; antrian live per jalur (jumlah menunggu, rata-rata tunggu); omzet hari ini per metode bayar; slot kosong berikutnya; peringatan (stok menipis, pembayaran tertunda, hasil lab menunggu validasi) |
| A2 | **Dashboard Owner (multi-cabang)** | Perbandingan cabang (omzet, kunjungan, utilisasi dokter, no-show, rating) · filter periode · ekspor |

#### B. Operasional harian
| # | Halaman | Fitur |
|---|---|---|
| B1 | **Agenda & Booking** | Tampilan kalender per dokter/ruang/hari/minggu · warna per status · buat booking atas nama pasien (telepon/WhatsApp/walk-in) · ubah jadwal (drag & drop) · batalkan dengan alasan · tandai no-show · lihat slot eksekutif · cari booking dengan kode/nama/HP · cetak/kirim tiket |
| B2 | **Detail Booking** | Data pasien, layanan, dokter, deposit & status bayar, riwayat status, catatan internal, tombol tindakan (check-in, reschedule, batal, buat tagihan) |
| B3 | **Front Desk** | Satu layar: scan QR booking → check-in → cetak nomor; pendaftaran pasien baru (≤ 90 detik) dengan deteksi duplikat; **daftar walk-in** (pilih dokter, kapasitas walk-in tersisa, estimasi tunggu); alihkan pasien terlambat ke jalur walk-in |
| B4 | **Kontrol Antrian** | Tiga lajur (E / A / W) dengan daftar tiket; tombol **Panggil, Panggil Ulang, Lewati, Mulai, Selesai, Alihkan jalur, Eskalasi ke eksekutif**; filter per dokter/ruang; aturan prioritas terlihat; log kejadian |
| B5 | **Layar Antrian (Display)** | Mode TV/tablet untuk lobi: nomor dipanggil + ruang tujuan, suara pemanggil (TTS), nomor berikutnya, info promosi; satu layar per klinik atau per ruang |
| B6 | **Waiting List** | Daftar peminat per slot; saat slot kosong sistem menawarkan kepada antrean pertama (notifikasi); pilihan tawar manual |
| B7 | **Kiosk (V1.2)** | Mode layar sentuh: scan QR → check-in; ambil nomor walk-in |

#### C. Pasien
| # | Halaman | Fitur |
|---|---|---|
| C1 | **Daftar Pasien** | Pencarian cepat (nama, HP, No. RM, NIK) · filter (cabang, tanggal daftar, tag) |
| C2 | **Detail Pasien** | Profil, alergi, akun terhubung & anggota keluarga, linimasa (booking, kunjungan, tagihan, obat, treatment, lab, skrining), paket aktif, catatan internal, persetujuan (consent) |
| C3 | **Gabung Data Ganda** | Deteksi kandidat duplikat, pratinjau, gabung dengan jejak audit |
| C4 | **Impor Pasien** | Unggah CSV pasien lama dengan validasi dan laporan galat |

#### D. Klinis (dokter/expert/perawat)
| # | Halaman | Fitur |
|---|---|---|
| D1 | **Daftar Pasien Saya (hari ini)** | Antrian khusus dokter, tombol "Panggil berikutnya", ringkasan riwayat & alergi |
| D2 | **Kunjungan (RME ringkas)** | Tanda vital, keluhan, catatan SOAP, diagnosis ICD-10, tindakan, rencana & kontrol, ketentuan "terlihat oleh pasien", tanda tangan elektronik |
| D3 | **Resep** | Pilih produk dari stok, dosis/frekuensi/durasi, peringatan alergi, kirim ke apotek |
| D4 | **Treatment & Foto** | Catat tindakan, area, parameter alat, pemakaian ruang/alat, **foto before-after** (unggah dari tablet), potong sesi paket, consent |
| D5 | **Paket Pasien** | Jual paket, saldo sesi, riwayat pemakaian, masa berlaku |
| D6 | **Order Lab** | Buat order dari kunjungan; cetak label sampel |
| D7 | **Skrining** | Formulir dinamis per template (analisis kulit, skrining mata, KPSP, risiko diabetes); skor & tingkat risiko otomatis; rilis ke pasien |

#### E. Laboratorium
| # | Halaman | Fitur |
|---|---|---|
| E1 | **Daftar Kerja Lab** | Order: dipesan → sampel diambil → proses → hasil → tervalidasi |
| E2 | **Input Hasil** | Isian per parameter, rentang rujukan per jenis kelamin, **penandaan otomatis L/H/LL/HH**, catatan |
| E3 | **Validasi & Rilis** | Penanggung jawab memvalidasi, unggah PDF resmi, **rilis ke Public App** + notifikasi |
| E4 | **Katalog Tes** | Tes, parameter, satuan, nilai rujukan, waktu penyelesaian, harga |

#### F. Kasir & keuangan
| # | Halaman | Fitur |
|---|---|---|
| F1 | **Tagihan** | Buat dari kunjungan/booking; tambah layanan, produk, paket; diskon & voucher; surcharge eksekutif otomatis; status (draft, belum bayar, sebagian, lunas, batal) |
| F2 | **Terima Pembayaran** | Tunai, EDC, QRIS statis/dinamis (tampil di layar), VA, e-wallet, split bayar; cetak/kirim struk |
| F3 | **Monitor Pembayaran Online** | Pembayaran pending, gagal, kedaluwarsa; cek status ulang; riwayat webhook; rekonsiliasi harian |
| F4 | **Refund** | Ajukan → setujui (otorisasi manajer) → proses; alasan wajib |
| F5 | **Tutup Kasir** | Rekap per metode bayar, selisih kas, tanda tangan shift |
| F6 | **Voucher & Promo** | Buat kode, jenis (persen/nominal), batas pemakaian, periode, minimal belanja |
| F7 | **Komisi** | Aturan komisi per dokter/terapis/layanan, hitung bulanan, status (akrual → disetujui → dibayar), ekspor |

#### G. Apotek & gudang
| # | Halaman | Fitur |
|---|---|---|
| G1 | **Stok** | Per cabang & produk, ambang minimum, peringatan, pencarian cepat |
| G2 | **Batch & Kedaluwarsa** | Batch, tanggal kedaluwarsa, FEFO, peringatan 90/30 hari |
| G3 | **Penerimaan & Penyesuaian** | Terima barang dari pemasok, *stock opname*, transfer antar cabang, retur |
| G4 | **Pengambilan & Pengiriman** | Antrian pesanan: menunggu → disiapkan → siap → dikirim/diambil; verifikasi kode ambil; **pesan GoSend** (ongkir, estimasi), lacak driver, tangani gagal kirim/batal |

#### H. Master data
| # | Halaman | Fitur |
|---|---|---|
| H1 | **Klinik & Cabang** | Profil, alamat & titik peta, jam operasional, hari libur, zona waktu, pengaturan booking/walk-in/eksekutif |
| H2 | **Fasilitas** | Lantai, ruang, alat/laser, bilik lab; kapasitas |
| H3 | **Wayfinder Editor** | Unggah denah per lantai, tempatkan titik (pintu, FDI, ruang tunggu, lift, toilet, ruangan), hubungkan dengan jalur, tandai jalur ramah kursi roda, uji rute |
| H4 | **Dokter/Expert** | Profil publik, STR, spesialisasi, foto, klinik praktik, layanan yang dikerjakan, status verifikasi |
| H5 | **Jadwal & Cuti** | Pola mingguan (jam, durasi slot, kapasitas online/walk-in, kelas reguler/eksekutif, ruang), cuti/izin, tutup slot massal, pembuatan ulang slot, pratinjau |
| H6 | **Layanan & Harga** | Kategori, layanan (jenis, durasi, butuh dokter/ruang/alat), harga per cabang, harga eksekutif, deposit, persiapan sebelum datang, aturan kelayakan |
| H7 | **Paket** | Definisi paket, sesi, harga, masa berlaku |
| H8 | **Metode Pembayaran** | Aktif/nonaktif per cabang, urutan, biaya, akun gateway |
| H9 | **Template Notifikasi** | WhatsApp/SMS/email/push dengan variabel; uji kirim |
| H10 | **Banner & Promo** | Banner beranda per periode & cabang |

#### I. Laporan
| # | Laporan |
|---|---|
| I1 | **Booking & utilisasi:** booking per sumber, per jam, tingkat isi slot, no-show, pembatalan, waiting list terkonversi |
| I2 | **Antrian:** waktu tunggu per jalur (booking/walk-in/eksekutif), per dokter, per jam, pelanggaran target |
| I3 | **Keuangan:** omzet harian/bulanan per cabang, layanan, dokter, metode bayar; deposit; refund; piutang |
| I4 | **Pasien:** pasien baru vs lama, retensi, sumber, demografi |
| I5 | **Dokter:** jumlah pasien, rating, komisi |
| I6 | **Stok & pengiriman:** pergerakan stok, kedaluwarsa, waktu pengiriman, tingkat gagal |
| I7 | **Lab & skrining:** volume tes, waktu penyelesaian, hasil abnormal |
| I8 | **Ekspor:** CSV/Excel/PDF; jadwal pengiriman email |

#### J. Pengaturan & keamanan
| # | Halaman | Fitur |
|---|---|---|
| J1 | **Pengguna & Peran** | Undang staf, peran per cabang (Owner, Admin, FDI, Dokter, Kasir, Apoteker, Analis Lab, Marketing), 2FA, matriks izin |
| J2 | **Kebijakan Booking** | Maks hari ke depan, durasi hold, *cut-off* pembatalan, deposit, toleransi no-show, aturan reschedule |
| J3 | **Aturan Antrian** | Bobot prioritas jalur, target tunggu, perilaku pasien terlambat, format nomor |
| J4 | **Integrasi** | Gateway pembayaran, WhatsApp, GoSend, Google/OTP |
| J5 | **Langganan & Tagihan** | Paket aktif, batas pemakaian, riwayat tagihan SaaS |
| J6 | **Audit Log** | Siapa melihat/mengubah data pasien & keuangan, kapan, dari mana; filter & ekspor |

### 8.3 Matriks peran (ringkas)

| Modul | Owner | Admin | FDI | Dokter | Kasir | Apoteker | Analis Lab | Marketing |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Dashboard owner & laporan konsolidasi | ✔ | ◐ | | | | | | ◐ |
| Agenda & booking | ✔ | ✔ | ✔ | ◐ (miliknya) | ◐ | | | |
| Front desk & antrian | ✔ | ✔ | ✔ | ◐ | | | | |
| Data pasien | ✔ | ✔ | ✔ | ✔ | ◐ | ◐ | ◐ | |
| RME & resep | ◐ | | | ✔ | | ◐ (lihat resep) | | |
| Lab | ◐ | | | ◐ (order) | | | ✔ | |
| Tagihan & pembayaran | ✔ | ✔ | ◐ (lihat) | | ✔ | | | |
| Refund & void | ✔ | ✔ | | | ◐ (ajukan) | | | |
| Stok & pengiriman | ✔ | ✔ | | | | ✔ | | |
| Master data | ✔ | ✔ | | | | | | |
| Voucher, banner, notifikasi | ✔ | ✔ | | | | | | ✔ |
| Pengguna, langganan, audit | ✔ | ◐ | | | | | | |

✔ penuh · ◐ terbatas · kosong = tidak ada akses. Izin granular tersimpan di `permissions`/`role_permissions` (lihat `erd.md`) dan dapat diubah owner.

### 8.4 Kriteria penerimaan alur utama (Admin)

- **Pendaftaran walk-in on-the-spot ≤ 90 detik** dari scan/ketik hingga nomor W- tercetak; sistem menolak jika kapasitas walk-in habis dan menawarkan slot terdekat.
- **Tiga jalur antrian tidak saling mencampur**; "Panggil berikutnya" mengikuti bobot prioritas dan tidak melewatkan pasien booking yang sudah check-in tepat waktu.
- **Rekonsiliasi:** total pembayaran gateway per hari cocok dengan total tagihan lunas; webhook ganda tidak mengubah angka.
- **Audit:** setiap lihat/ubah rekam medis dan setiap refund tercatat dengan pelaku, waktu, IP.
- **Stok:** pengiriman/pengambilan mengurangi stok sekali (tidak ganda) dan dari batch terdekat kedaluwarsa.

---

## 9. Notifikasi

| Pemicu | Kanal | Penerima | Waktu |
|---|---|---|---|
| Booking terkonfirmasi (+ QR) | WhatsApp, push | Pasien | Instan |
| Menunggu pembayaran (hold) | WhatsApp, push | Pasien | Instan + 5 menit sebelum habis |
| Pembayaran berhasil / gagal / kedaluwarsa | WhatsApp, push | Pasien | Instan |
| Pengingat jadwal | WhatsApp | Pasien | H-1 pukul 09.00 |
| Check-in dibuka / sudah dekat | Push | Pasien | 60 menit sebelum / saat tiba |
| Antrian: 3 nomor lagi / dipanggil | Push | Pasien | Real-time |
| Slot waiting list terbuka | Push, WhatsApp | Pasien | Instan, tahan 10 menit |
| Hasil lab / skrining dirilis | WhatsApp, push | Pasien | Saat dirilis |
| Obat siap diambil / driver ditugaskan / tiba | WhatsApp, push | Pasien | Real-time |
| Pengingat sesi paket berikutnya | WhatsApp | Pasien | Sesuai pola |
| Booking baru / dibatalkan / pembayaran masuk | Dashboard | FDI/Admin | Real-time |
| Stok menipis / kedaluwarsa dekat | Dashboard, email | Apoteker | Harian |
| Pembayaran SaaS jatuh tempo | Email | Owner | H-7, H-1 |

Pasien dapat mengatur preferensi kanal; notifikasi transaksional tidak dapat dimatikan, promosi hanya dengan persetujuan.

---

## 10. Kebutuhan Non-Fungsional (tingkat produk)

| Aspek | Sasaran |
|---|---|
| **Kecepatan** | Pencarian & strip tanggal ≤ 1 detik (p95); aksi booking ≤ 2 detik; terbukti pada data uji 285 ribu booking (`erd.md` §7) |
| **Keandalan booking** | Tidak ada *overbooking* meski ribuan klik bersamaan (terbukti uji rebutan slot) |
| **Ketersediaan** | ≥ 99,5% pada jam operasional klinik; mode degradasi: check-in manual bila internet klinik putus |
| **Privasi & kepatuhan** | Sesuai UU Pelindungan Data Pribadi: persetujuan eksplisit, enkripsi data sensitif, audit akses, hak akses/hapus/unduh data, retensi rekam medis sesuai peraturan kesehatan (*perlu konfirmasi konsultan hukum*) |
| **Keamanan** | 2FA untuk staf, OTP untuk pasien, batas percobaan, sesi dapat dicabut, peran minimal (least privilege) |
| **Aksesibilitas & bahasa** | Bahasa Indonesia; kontras tinggi; target sentuh ≥ 44 px |
| **Kinerja perangkat** | Nyaman di ponsel Android kelas menengah dan koneksi 4G |
| **Skalabilitas** | Satu tenant hingga puluhan cabang & jutaan baris tanpa penurunan berarti |
| **Pencadangan** | Cadangan harian, pemulihan terdokumentasi |

---

## 11. Model Harga Usulan (untuk validasi pasar)

> Usulan awal, **bukan keputusan final**. Dipatok di bawah paket berbayar pesaing pada fitur sebanding (Klinik Pintar Siap Rp300 rb, Tumbuh Rp600 rb; AIDO mulai Rp75 rb). Perlu uji pasar dan hitung biaya per tenant (WhatsApp, gateway, penyimpanan).

| Paket | Harga/bulan | Untuk | Isi utama |
|---|---:|---|---|
| **Lite** | Rp149.000 | 1 klinik, ≤ 3 dokter, ≤ 5 staf | Booking, strip tanggal, akun keluarga, QRIS/VA, antrian 2 jalur, notifikasi, laporan dasar |
| **Pro** | Rp249.000 | 1 klinik, ≤ 15 dokter | + Jalur & slot eksekutif, wayfinder, GoSend, RME ringkas, paket treatment, stok, lab & skrining |
| **Multi-Cabang** | Rp499.000 | ≤ 5 cabang, ≤ 60 dokter | + Dashboard konsolidasi, komisi, voucher, pasien lintas cabang |
| **Enterprise** | Hubungi kami | > 5 cabang / kebutuhan khusus | SLA, integrasi khusus, domain sendiri |

Diskon tahunan ±17% (bayar 10, pakai 12 bulan). Biaya pihak ketiga (WhatsApp, gateway, GoSend) transparan dan diteruskan sesuai pemakaian. Uji coba gratis 14 hari tanpa kartu kredit. Pajak mengikuti ketentuan.

---

## 12. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Regulasi rekam medis elektronik/SATUSEHAT untuk klinik target | Klinik enggan memakai bila tidak patuh | Verifikasi hukum sejak awal; V2 sediakan integrasi SATUSEHAT; komunikasikan posisi kepatuhan di landing page secara akurat |
| Kompetitor gratis (paket mandiri) | Tekanan harga | Fokus nilai yang tidak mereka tawarkan: pengalaman pasien, antrian dua jalur, wayfinder, GoSend, eksekutif |
| Adopsi pasien rendah | Fitur tidak terpakai | Booking tanpa unduh (web/PWA), QR di klinik, insentif voucher pasien baru, FDI sebagai agen booking |
| Ketergantungan pihak ketiga (gateway, WhatsApp, GoSend) | Gangguan layanan | Adapter ganda, antrean ulang, mode manual (tunai/FDI) |
| Kualitas data lama klinik | Migrasi sulit | Alat impor CSV, pendampingan, deteksi duplikat |
| Privasi data medis | Reputasi & sanksi | Audit log, enkripsi, peran minimal, DPA dengan klinik, pelatihan |
| No-show tetap tinggi | KPI tidak tercapai | Deposit, pengingat berlapis, waiting list otomatis, penalti kebijakan |

---

## 13. Pertanyaan Terbuka (butuh keputusan)

1. Apakah RME (SOAP/ICD-10) masuk MVP atau cukup V1.1? *(rekomendasi: V1.1; MVP fokus booking–antrian–bayar agar cepat divalidasi)*
2. Penyedia pembayaran & WhatsApp resmi yang dipakai (menentukan biaya per transaksi).
3. Kebijakan default deposit & pembatalan per jenis klinik.
4. Apakah foto before-after boleh tampil di Public App secara default (butuh consent eksplisit).
5. Prioritas platform: PWA dahulu, native kemudian — setuju?
6. Kapan mulai integrasi SATUSEHAT setelah hukum diverifikasi?
7. Marketplace lintas klinik (pencarian publik antar tenant) — dibuka atau tidak?

---

## 14. Pemetaan Fitur → Data (`erd.md`)

| Fitur | Tabel utama |
|---|---|
| Strip tanggal & chip jam | `availability_daily`, `appointment_slots`, `waitlist_entries` |
| Booking, hold, reschedule | `appointments`, `appointment_services`, `appointment_status_history` |
| Kuota online vs walk-in vs eksekutif | `appointment_slots.capacity_*`, `slot_class`, `queue_lanes` |
| Check-in | `checkins` |
| Antrian | `queue_lanes`, `queue_counters`, `queue_tickets`, `queue_events` |
| Wayfinder | `floors`, `resources`, `wayfinder_nodes`, `wayfinder_edges` |
| Akun & keluarga | `customer_accounts`, `account_patients`, `patients`, `patient_allergies` |
| Pembayaran multi-channel & QRIS | `payment_methods`, `clinic_payment_methods`, `invoices`, `payments`, `payment_webhook_events`, `refunds` |
| Obat/treatment ambil atau kirim | `fulfillment_orders`, `fulfillment_items`, `deliveries`, `delivery_events`, `patient_addresses`, `stock_movements` |
| Riwayat, obat, treatment | `encounters`, `prescriptions`, `treatment_records`, `v_patient_medications`, `v_patient_treatments` |
| Hasil lab & skrining | `lab_orders`, `lab_results`, `screening_results` |
| Paket treatment | `service_packages`, `patient_packages` |
| Multi/single klinik & langganan | `tenants`, `clinics`, `subscription_plans`, `tenant_subscriptions` |
| RBAC & audit | `roles`, `permissions`, `staff_clinic_roles`, `audit_logs` |

---

### Sumber riset
- [Klinik Pintar — Software Klinik Kecantikan & Estetika](https://klinikpintar.id/aplikasiklinik/faskes/klinik-kecantikan)
- [Mekari — 7 Aplikasi Klinik & Farmasi Terbaik](https://mekari.com/blog/rekomendasi-aplikasi-klinik/)
- [Klinik Pintar — Daftar Harga (Scribd)](https://www.scribd.com/document/731111213/Daftar-Harga-Berlangganan-Aplikasi-Klinik-Pintar)
