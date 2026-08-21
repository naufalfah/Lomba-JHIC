# Backend Service - Lomba JHIC (Spring Boot)

Template backend REST API berbasis **Spring Boot 3.x** & **Java 17**.

## 🚀 Struktur Folder

```
backend/
├── pom.xml                                   # File Konfigurasi Maven & Dependensi
├── README.md                                 # Petunjuk Penggunaan
├── application.properties                     # Server & App Properties
└── src/
    ├── main/
    │   ├── java/com/jhic/backend/
    │   │   ├── JhicBackendApplication.java   # Main Class Application
    │   │   ├── config/                       # Konfigurasi (CORS, Security, etc.)
    │   │   ├── controller/                   # REST API Controllers
    │   │   ├── dto/                          # Data Transfer Objects
    │   │   ├── model/                        # Entity / Domain Models
    │   │   ├── repository/                   # JPA Data Repositories
    │   │   └── service/                      # Business Logic Services
    │   └── resources/
    │       └── application.properties        # File Konfigurasi Aplikasi
    └── test/                                 # Unit & Integration Tests
```

---

## 🛠️ Persyaratan Sistem

- **JDK**: Java 17 (atau Java 21)
- **Build Tool**: Maven (`mvn`)

---

## 💻 Cara Menjalankan Aplikasi

### 1. Menggunakan Maven langsung:
```bash
cd backend
mvn spring-boot:run
```

### 2. Menggunakan Maven Wrapper (Windows):
```cmd
cd backend
mvnw.cmd spring-boot:run
```

---

## 🔗 Endpoint API Default

- **Health Check**: `GET http://localhost:8080/api/health`
  - Mengembalikan status kesehatan server dan info service dalam format JSON.

---

## 🌐 Konfigurasi CORS Frontend

Konfigurasi CORS siap pakai ada pada [`WebConfig.java`](file:///c:/Users/Nana/OneDrive/Desktop/Lomba%20JHIC/backend/src/main/java/com/jhic/backend/config/WebConfig.java).
Menerima request dari Origin Frontend Vite:
- `http://localhost:5173`
- `http://localhost:3000`
