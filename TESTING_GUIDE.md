# 🧪 Hướng dẫn kiểm tra (Testing Guide)

## Yêu cầu
- Json-server đang chạy tại `http://localhost:3000`
- Mở file `test.html` trong trình duyệt

---

## ✅ Các tính năng cần kiểm tra

### 1️⃣ **Kiểm tra Soft Delete cho Posts**

#### Bước thực hiện:
1. Mở `test.html` trong trình duyệt
2. Xem danh sách posts hiện có
3. Click nút **"delete"** trên bất kỳ post nào (ví dụ: post ID "1")
4. **Kết quả mong đợi:**
   - Post vẫn hiển thị trong danh sách
   - Text của post có ~~gạch ngang~~
   - Độ mờ giảm (nhạt hơn)
   - Nút "delete" đổi thành **"restore"**
   - Console hiển thị: `"xoa mem thanh cong"`

5. Kiểm tra database:
   ```bash
   # Mở db.json, tìm post đã xóa
   # Kiểm tra: "isDeleted": true
   ```

---

### 2️⃣ **Kiểm tra Restore Post**

#### Bước thực hiện:
1. Click nút **"restore"** trên post đã xóa
2. **Kết quả mong đợi:**
   - Post trở về bình thường (không còn gạch ngang)
   - Nút "restore" đổi lại thành **"delete"**
   - Console hiển thị: `"khoi phuc thanh cong"`
   - Database: `"isDeleted": false`

---

### 3️⃣ **Kiểm tra Auto-increment ID**

#### Bước thực hiện:
1. Xem ID cao nhất trong danh sách posts (ví dụ: "8")
2. **Để trống** trường "ID"
3. Nhập:
   - Title: `"Test Auto ID"`
   - Views: `"999"`
4. Click **"Save Post"**
5. **Kết quả mong đợi:**
   - Post mới xuất hiện với ID = "9" (maxId + 1)
   - Console hiển thị: `"them du lieu thanh cong"`
   - Database có post mới với ID là string: `"id": "9"`

---

### 4️⃣ **Kiểm tra Edit Post**

#### Bước thực hiện:
1. Click nút **"edit"** trên bất kỳ post nào
2. **Kết quả mong đợi:**
   - Form tự động điền dữ liệu:
     - ID: (ID của post)
     - Title: (title của post)
     - Views: (views của post)
3. Thay đổi Title thành `"Updated Title"`
4. Click **"Save Post"**
5. **Kết quả mong đợi:**
   - Post được cập nhật với title mới
   - Console: `"edit du lieu thanh cong"`
   - Database cập nhật title

---

### 5️⃣ **Kiểm tra CRUD Comments - READ**

#### Bước thực hiện:
1. Click nút **"comments"** trên post ID "1"
2. **Kết quả mong đợi:**
   - Hiện ra section "💬 Comments for Post" phía dưới
   - Danh sách comments của post 1 hiển thị (2 comments)
   - Có nút **"Close"** phía trên

---

### 6️⃣ **Kiểm tra CREATE Comment**

#### Bước thực hiện:
1. Trong comments section:
2. **Để trống** trường "ID"
3. Nhập Comment Text: `"This is a new comment"`
4. Click **"Save Comment"**
5. **Kết quả mong đợi:**
   - Comment mới xuất hiện với ID = "3" (tự động)
   - Console: `"them comment thanh cong"`
   - Database có comment mới với `"postId": "1"`

---

### 7️⃣ **Kiểm tra UPDATE Comment**

#### Bước thực hiện:
1. Click nút **"edit"** trên bất kỳ comment nào
2. Form comment tự động điền dữ liệu
3. Thay đổi text thành: `"Updated comment text"`
4. Click **"Save Comment"**
5. **Kết quả mong đợi:**
   - Comment được cập nhật
   - Console: `"cap nhat comment thanh cong"`

---

### 8️⃣ **Kiểm tra Soft DELETE Comment**

#### Bước thực hiện:
1. Click nút **"delete"** trên một comment
2. **Kết quả mong đợi:**
   - Comment vẫn hiển thị với ~~gạch ngang~~
   - Nút "delete" đổi thành **"restore"**
   - Console: `"xoa mem comment thanh cong"`
   - Database: `"isDeleted": true`

---

### 9️⃣ **Kiểm tra Restore Comment**

#### Bước thực hiện:
1. Click nút **"restore"** trên comment đã xóa
2. **Kết quả mong đợi:**
   - Comment trở về bình thường
   - Console: `"khoi phuc comment thanh cong"`
   - Database: `"isDeleted": false`

---

### 🔟 **Kiểm tra Close Comments**

#### Bước thực hiện:
1. Click nút **"Close"** trong comments section
2. **Kết quả mong đợi:**
   - Comments section biến mất
   - Form comment được xóa sạch

---

## 🎨 Kiểm tra Giao diện

### Các điểm cần kiểm tra:

✅ **Background gradient** (purple-violet)  
✅ **Table header** có gradient background  
✅ **Hover effects** trên các dòng table  
✅ **Button colors:**
- 🟣 Save: Purple gradient
- 🔴 Delete: Pink-red gradient  
- 🔵 Restore: Blue gradient
- 🟢 Edit: Green gradient

✅ **Form inputs:**
- Border chuyển màu khi focus (thành màu tím)
- Placeholder text rõ ràng

✅ **Deleted items:**
- Strikethrough (gạch ngang)
- Opacity giảm (mờ hơn)

---

## 📊 Checklist tổng hợp

| Tính năng | Mô tả | Trạng thái |
|-----------|-------|------------|
| ✅ Soft Delete Post | Xóa mềm post (isDeleted: true) | |
| ✅ Restore Post | Khôi phục post đã xóa | |
| ✅ Auto ID Post | Tự động tăng ID khi tạo mới | |
| ✅ Edit Post | Sửa thông tin post | |
| ✅ Display Deleted | Hiển thị gạch ngang cho post xóa | |
| ✅ Create Comment | Tạo comment mới | |
| ✅ Read Comments | Hiển thị danh sách comments | |
| ✅ Update Comment | Sửa comment | |
| ✅ Soft Delete Comment | Xóa mềm comment | |
| ✅ Restore Comment | Khôi phục comment | |
| ✅ Auto ID Comment | Tự động tăng ID comment | |
| ✅ Close Comments | Đóng section comments | |

---

## 🐛 Các lỗi thường gặp

### Lỗi: "Failed to fetch"
- **Nguyên nhân:** Json-server chưa chạy
- **Giải pháp:** Chạy `npx json-server db.json`

### Lỗi: Post/Comment không hiển thị
- **Nguyên nhân:** JavaScript chưa load
- **Giải pháp:** Kiểm tra Console, refresh trang

### Lỗi: ID bị trùng
- **Nguyên nhân:** Nhập ID thủ công trùng với ID có sẵn
- **Giải pháp:** Để trống ID hoặc nhập ID khác

---

## 📸 Screenshots mong đợi

### 1. Trang chủ - Danh sách Posts
![Expected: Table với gradient header, các nút màu sắc khác nhau]

### 2. Post đã xóa (soft delete)
![Expected: Post với strikethrough, nút Restore màu xanh dương]

### 3. Comments section
![Expected: Bảng comments phía dưới, background màu xám nhạt]

### 4. Comment đã xóa
![Expected: Comment với strikethrough, nút Restore]

---

## ✅ Kết luận

Sau khi kiểm tra tất cả các tính năng trên, bạn đã xác nhận:
- ✅ Xóa mềm hoạt động cho cả posts và comments
- ✅ ID tự động tăng khi để trống
- ✅ CRUD đầy đủ cho comments
- ✅ Giao diện đẹp, responsive, có animations
- ✅ Database lưu ID dưới dạng string
