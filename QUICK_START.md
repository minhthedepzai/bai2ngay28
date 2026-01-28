# 🚀 Quick Start Guide

## Khởi động ứng dụng (3 bước)

### 1️⃣ Mở Terminal
```bash
cd "c:\Users\minht\Downloads\NNPTUD-C4-20260128\NNPTUD-C4-20260128"
```

### 2️⃣ Chạy JSON Server
```bash
npx json-server db.json
```
Đợi đến khi thấy:
```
✓ Database ready
✓ http://localhost:3000/posts
✓ http://localhost:3000/comments
✓ http://localhost:3000/profile
```

### 3️⃣ Mở trình duyệt
- Mở file `test.html` trong browser
- Hoặc kéa thả file vào Chrome/Edge/Firefox

---

## ⚡ Tính năng chính

### Posts
- ✅ **Create**: Để trống ID → tự động tạo ID
- ✅ **Read**: Tự động load khi mở trang
- ✅ **Update**: Click "Edit" → Sửa → Save
- ✅ **Delete**: Click "Delete" → Xóa mềm (strikethrough)
- ✅ **Restore**: Click "Restore" → Khôi phục

### Comments  
- ✅ Click "Comments" trên post → Mở comments section
- ✅ **Create**: Để trống ID → Nhập text → Save
- ✅ **Update**: Edit → Sửa → Save
- ✅ **Delete**: Delete → Xóa mềm
- ✅ **Restore**: Restore → Khôi phục
- ✅ Click "Close" → Đóng comments

---

## 🎯 Thử ngay

### Test 1: Tạo post mới
1. Để trống ID
2. Title: `Test Post`
3. Views: `100`
4. Click "Save Post"
✅ Post mới xuất hiện với ID tự động

### Test 2: Xóa mềm
1. Click "Delete" trên post bất kỳ
✅ Post hiện ~~gạch ngang~~

### Test 3: Khôi phục
1. Click "Restore" trên post đã xóa
✅ Post trở về bình thường

### Test 4: Comments
1. Click "Comments" trên post 1
2. Để trống ID
3. Text: `Nice post!`
4. Click "Save Comment"
✅ Comment mới xuất hiện

---

## 📋 API Endpoints

Server chạy tại: `http://localhost:3000`

- `GET /posts` - Danh sách posts
- `GET /posts/1` - Chi tiết post ID 1
- `GET /comments?postId=1` - Comments của post 1
- `POST /posts` - Tạo post mới
- `PUT /posts/1` - Cập nhật post 1

---

## 🐛 Troubleshooting

### Lỗi: "Failed to fetch"
**Giải pháp:** Kiểm tra json-server đã chạy chưa

### Data không hiển thị
**Giải pháp:** Mở DevTools (F12) → Check Console có lỗi không

### Port 3000 đã sử dụng
**Giải pháp:** 
```bash
npx json-server db.json --port 3001
# Rồi sửa URL trong main.js thành localhost:3001
```

---

## 💡 Tips

1. **ID tự động:** Luôn để trống ID khi tạo mới
2. **Xóa mềm:** Data không bị xóa thật, có thể restore
3. **Edit:** Click Edit để load data vào form
4. **Console:** Mở F12 để xem log operations

---

## 📚 Đọc thêm

- **README.md** - Tài liệu đầy đủ
- **TESTING_GUIDE.md** - Hướng dẫn test chi tiết  
- **SUMMARY.md** - Tóm tắt thay đổi
- **db.json** - Database structure

---

## ✅ Checklist

- [ ] Server đang chạy (http://localhost:3000)
- [ ] Mở test.html trong browser
- [ ] Thử tạo post mới (để trống ID)
- [ ] Thử xóa và restore post
- [ ] Thử mở comments
- [ ] Thử tạo comment mới
- [ ] Thử xóa và restore comment

**Enjoy! 🎉**
