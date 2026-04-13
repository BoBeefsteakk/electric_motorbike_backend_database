# 🚀 Project Setup Guide

## 📦 1. Cài đặt dependencies

Chạy lệnh sau để cài tất cả thư viện cần thiết:

```bash
npm install
```

---

## ⚙️ 2. Cấu hình môi trường (.env)

Tạo file `.env` từ file mẫu:

```bash
cp .env.example .env
```

Sau đó chỉnh sửa các biến môi trường trong file `.env` theo cấu hình máy của bạn (DB, port, API key,...).

---

## 🗄️ 3. Import Database vào MySQL

### 🔹 Bước 1: Tạo Database

* Mở **MySQL Workbench**
* Vào phần **Connections**
* Tạo connection (nếu chưa có)
* Tạo database (schema) mới

---

### 🔹 Bước 2: Import file SQL

* Vào menu: **Server → Data Import**
* Chọn:

  * **Import from Self-Contained File**
* Nhấn nút `...` và chọn file:

  ```
  login_register.sql
  ```

---

### 🔹 Bước 3: Chọn Schema

* Ở mục **Default Target Schema**
* Nhấn **New**
* Tạo schema mới (ví dụ: `fulldb`)
* Chọn schema vừa tạo

---

### 🔹 Bước 4: Import

* Nhấn **Start Import**
* Đợi quá trình hoàn tất

---

### 🔹 Bước 5: Kiểm tra

* Quay lại tab **Schemas**
* Nhấn **Refresh**
* Database sẽ hiển thị cùng các bảng bên trong

---

## ✅ Hoàn tất

Sau khi hoàn thành các bước trên:

* Database đã sẵn sàng
* Project có thể chạy bình thường

---

## 💡 Ghi chú

* Đảm bảo MySQL đang chạy trước khi import
* Nếu import lỗi → kiểm tra lại quyền user hoặc cấu hình `.env`
* Nên đặt tên database rõ ràng để tránh nhầm lẫn

---

