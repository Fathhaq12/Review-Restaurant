# 📦 REST API Dokumentasi (Versi Tabel)

Dokumentasi untuk REST API Backend yang mencakup otentikasi, pengguna, restoran, menu, dan ulasan.

---

## 🧾 Autentikasi (`/auth`)

| Method | Endpoint             | Deskripsi                      | Autentikasi |
|--------|----------------------|--------------------------------|-------------|
| POST   | `/auth/register`     | Registrasi pengguna            | ❌          |
| POST   | `/auth/login`        | Login pengguna                 | ❌          |
| GET    | `/auth/refresh-token`| Refresh access token           | ❌          |

---

## 👤 User (`/users`)

| Method | Endpoint         | Deskripsi                      | Autentikasi  |
|--------|------------------|--------------------------------|--------------|
| POST   | `/users/register`| Registrasi pengguna            | ❌           |
| POST   | `/users/login`   | Login pengguna                 | ❌           |
| POST   | `/users/logout`  | Logout pengguna                | ✅           |
| GET    | `/users/me`      | Ambil profil pengguna saat ini | ✅           |
| GET    | `/users/`        | Ambil semua pengguna           | ❌ (Admin)   |
| GET    | `/users/:id`     | Ambil pengguna berdasarkan ID  | ❌ (Admin)   |
| POST   | `/users/`        | Tambah pengguna baru           | ❌ (Admin)   |
| PUT    | `/users/:id`     | Perbarui pengguna              | ❌ (Admin)   |
| DELETE | `/users/:id`     | Hapus pengguna                 | ❌ (Admin)   |

---

## 🍽️ Menu (`/menus`)

> Semua endpoint membutuhkan autentikasi token. Akses `POST`, `PUT`, `DELETE` hanya untuk Admin.

| Method | Endpoint      | Deskripsi            | Autentikasi |
|--------|---------------|----------------------|-------------|
| GET    | `/menus/`     | Ambil semua menu     | ✅          |
| GET    | `/menus/:id`  | Ambil menu by ID     | ✅          |
| POST   | `/menus/`     | Tambah menu          | ✅ (Admin)  |
| PUT    | `/menus/:id`  | Perbarui menu        | ✅ (Admin)  |
| DELETE | `/menus/:id`  | Hapus menu           | ✅ (Admin)  |

---

## 🏬 Restoran (`/restaurants`)

> Semua endpoint memerlukan autentikasi. `POST`, `PUT`, `DELETE` hanya untuk Admin. Gunakan form-data untuk upload gambar (`image`).

| Method | Endpoint            | Deskripsi                  | Autentikasi |
|--------|---------------------|----------------------------|-------------|
| GET    | `/restaurants/`     | Ambil semua restoran       | ✅          |
| GET    | `/restaurants/:id`  | Ambil restoran by ID       | ✅          |
| POST   | `/restaurants/`     | Tambah restoran baru       | ✅ (Admin)  |
| PUT    | `/restaurants/:id`  | Perbarui restoran          | ✅ (Admin)  |
| DELETE | `/restaurants/:id`  | Hapus restoran             | ✅ (Admin)  |

---

## ⭐ Ulasan / Review (`/reviews`)

> Endpoint memerlukan autentikasi. Hanya user yang dapat membuat dan mengubah review.

| Method | Endpoint                          | Deskripsi                              | Autentikasi |
|--------|-----------------------------------|----------------------------------------|-------------|
| GET    | `/reviews/`                       | Ambil semua review                     | ✅          |
| GET    | `/reviews/:id`                    | Ambil review berdasarkan ID            | ✅          |
| GET    | `/reviews/restaurant/:restaurantId` | Review berdasarkan restoran          | ✅          |
| POST   | `/reviews/`                       | Tambah review                          | ✅ (User)   |
| PUT    | `/reviews/:id`                    | Perbarui review                        | ✅ (User)   |
| DELETE | `/reviews/:id`                    | Hapus review                           | ✅ (User)   |

---

## 🔐 Middleware

- `verifyToken` - Autentikasi token JWT
- `isAdmin` - Hanya untuk admin
- `isUser` - Untuk akses user (review)
- `uploadImage` - Middleware upload gambar restoran

---

## 🚀 Teknologi

- Express.js
- JWT Authentication
- Middleware Based Authorization
- File Upload (Multer)
