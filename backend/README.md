# Website Sekolah — Backend (Spring Boot + Maven)

Backend REST API sederhana untuk website sekolah: profil siswa, guru, alumni,
crew, prestasi (achievement), fasilitas, berita, karya (work), jurusan
(major) beserta statistik & kolaborasinya, lengkap dengan autentikasi admin
(JWT) dan fitur pencarian.

## Struktur project

```
src/main/java/com/school/websitesekolah/
 ├── entity/        # 15 entity JPA, sesuai skema tabel yang diberikan
 ├── repository/     # Spring Data JPA repositories
 ├── service/        # Business logic (CRUD, search, dsb.)
 ├── controller/      # REST controllers
 ├── dto/             # Login request/response, hasil search, dsb.
 ├── security/        # JWT util, filter, UserDetailsService
 ├── config/          # SecurityConfig (Spring Security + CORS)
 └── exception/       # Global exception handler
```

## Menjalankan

1. Buat file `.env`/environment variable atau langsung edit
   `src/main/resources/application.properties`:
   - `DB_URL` (default `jdbc:postgresql://localhost:5432/websitesekolah`)
   - `DB_USERNAME`, `DB_PASSWORD`
   - `JWT_SECRET` — **wajib diganti** dengan string acak panjang untuk production
2. Pastikan tabel-tabel di database sudah dibuat sesuai skema yang kamu berikan
   (termasuk tabel baru `major_collab`, lihat DDL contoh di bawah).
3. Buat minimal 1 baris di tabel `admin` untuk bisa login (password di-hash
   dengan BCrypt — lihat contoh generate hash di bawah).
4. Jalankan:
   ```bash
   mvn spring-boot:run
   ```
   atau build jar:
   ```bash
   mvn clean package
   java -jar target/websitesekolah-0.0.1-SNAPSHOT.jar
   ```

> Catatan: project ini dibuat & ditinjau di lingkungan tanpa akses ke Maven
> Central, jadi saya tidak bisa menjalankan `mvn compile` langsung di sini.
> Saya sudah cek strukturnya baris demi baris (package, import, tanda kurung),
> tapi tetap jalankan `mvn clean compile` di komputer kamu sebagai langkah
> pertama untuk menangkap kalau ada typo yang lolos.

## DDL untuk tabel baru: major_collab

```sql
CREATE TABLE major_collab (
    id        BIGSERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    info      TEXT NOT NULL,
    logo_path VARCHAR(255),
    major_id  BIGINT NOT NULL REFERENCES major(id)
);
```

## Autentikasi (Admin)

- `POST /api/auth/login` — body `{ "email": "...", "password": "..." }`,
  balasan berisi `token` (JWT). Kirim token ini di header
  `Authorization: Bearer <token>` untuk semua request yang butuh login
  (POST/PUT/DELETE).
- Semua endpoint **GET** untuk data sekolah (student, teacher, achievement,
  facility, alumni, news, work, major, dst) bersifat **publik** — cocok untuk
  ditampilkan di halaman web sekolah tanpa login.
- Semua endpoint **POST/PUT/DELETE** wajib login sebagai admin.

Contoh generate password BCrypt untuk admin pertama (pakai endpoint apapun
yang expose `PasswordEncoder`, atau gunakan situs bcrypt generator / kode
Java kecil):
```java
new BCryptPasswordEncoder().encode("passwordAdminKamu");
```
Lalu insert manual ke tabel `admin`.

## Fitur pencarian

`GET /api/search?keyword=budi` — mencari sekaligus di student, teacher,
achievement, facility, dan alumni (by nama/judul), hasilnya dikelompokkan per
kategori dalam satu response.

Selain itu tiap resource juga punya pencarian sendiri, contoh:
`GET /api/students?search=budi`, `GET /api/achievements?search=olimpiade`, dst.

## ⚠️ Catatan penting soal `achievement_recipient` & `work_recipient`

Di skema yang kamu berikan, kolom `student_id`, `teacher_id`, `alumni_id`,
`crew_id` pada kedua tabel ini semuanya **NOT NULL**. Padahal secara logika,
satu baris "penerima" biasanya hanya merujuk ke SATU jenis entitas (siswa
ATAU guru ATAU alumni ATAU crew), mirip pola "polymorphic recipient".

Saya sudah implementasikan service-nya (`AchievementRecipientService`,
`WorkRecipientService`) dengan asumsi kamu hanya mengisi salah satu id saat
membuat data (`create(achievementId, studentId, teacherId, alumniId, crewId)`
— sisanya `null`). **Tapi karena kolom di database NOT NULL, insert akan
gagal kalau ada kolom yang null.**

Supaya fitur ini benar-benar jalan, kamu perlu salah satu dari ini:
1. **(Disarankan)** Ubah keempat kolom FK tsb menjadi `NULLABLE` di database:
   ```sql
   ALTER TABLE achievement_recipient ALTER COLUMN student_id DROP NOT NULL;
   ALTER TABLE achievement_recipient ALTER COLUMN teacher_id DROP NOT NULL;
   ALTER TABLE achievement_recipient ALTER COLUMN alumni_id  DROP NOT NULL;
   ALTER TABLE achievement_recipient ALTER COLUMN crew_id    DROP NOT NULL;
   -- ulangi juga untuk work_recipient
   ```
   Lalu di entity Java, hapus `nullable = false` pada keempat `@JoinColumn`
   tsb (jadikan `nullable = true`, atau hapus atributnya saja).
2. Atau, kalau kolom NOT NULL memang disengaja, kamu perlu baris "dummy/default"
   di tabel student/teacher/alumni/crew (misalnya id 0) untuk dipakai sebagai
   nilai default pada kolom yang tidak relevan — cara ini kurang bersih tapi
   valid kalau memang itu desainnya.

## Endpoint ringkas

| Resource | Base path |
|---|---|
| Auth | `/api/auth/login` |
| Student | `/api/students` |
| Alumni | `/api/alumni` |
| Teacher | `/api/teachers` |
| Crew | `/api/crews` |
| Achievement | `/api/achievements` |
| Achievement Recipient | `/api/achievement-recipients` |
| Facility | `/api/facilities` |
| Facility Photo | `/api/facility-photos` |
| News | `/api/news` |
| Work | `/api/works` |
| Work Recipient | `/api/work-recipients` |
| Major | `/api/majors` |
| Major Statistic | `/api/major-statistics` |
| Major Collab | `/api/major-collabs` |
| Search | `/api/search?keyword=...` |

Semua resource punya `GET` (list, list dengan `?search=`, dan `GET /{id}`),
serta `POST` / `PUT` / `DELETE` (butuh JWT admin).
