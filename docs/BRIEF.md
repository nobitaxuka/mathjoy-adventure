# 💡 BRIEF: Dạng toán Nhận biết số (V1.1)

**Ngày tạo:** 2026-02-05
**Brainstorm cùng:** Nobita (Vibe Coder)

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
Bé cần học cách liên hệ giữa con số ký hiệu (1, 2, 3...) và số lượng vật thể thực tế (1 củ cà rốt, 2 con mèo...). Hiện tại game chủ yếu là các phép tính text, cần thêm hình ảnh sinh động và âm thanh để phù hợp với lứa tuổi mầm non.

## 2. GIẢI PHÁP ĐỀ XUẤT
Thêm một dạng câu hỏi mới: **"Nhìn số, chọn hình"**.
- **Tính chất:** Đây là dạng bài độc lập, không ảnh hưởng đến logic các phép tính hiện tại.
- **Âm thanh:** Tự động đọc "Số Một", "Số Hai" khi hiện câu hỏi.
- **Hình ảnh:** 4 lựa chọn hình ảnh sinh động, 1 hình đúng số lượng, 3 hình sai số lượng.
- **Tự động hóa:** AI sẽ tự sinh script câu hỏi, tự tạo hình ảnh minh họa đồng nhất phong cách.
- **Phân loại (Tagging):** Áp dụng hệ thống tag để quản lý:
    - `age_group`: "3-4"
    - `difficulty`: "easy"
    - `category`: "number_recognition"

## 3. ĐỐI TƯỢNG SỬ DỤNG
- **Primary:** Trẻ em mầm non (3-5 tuổi) đang tập nhận biết mặt số.
- **Secondary:** Phụ huynh muốn bé vừa chơi vừa học số đếm cơ bản.

## 4. CÁCH TỰ ĐỘNG HÓA (BRAINSTORM)
### 🔄 Quy trình tạo tự động:
1. **Dữ liệu:** Em (AI) sẽ lập bảng: Số -> Tên vật thể -> Lời đọc (VD: 1 -> "Một củ cà rốt" -> "Số Một").
2. **Hình ảnh:** Dùng tool `generate_image` của em để tạo các hình vẽ phong cách hoạt hình (cartoon/vector style) cho từng vật thể.
3. **Phát triển:** Viết code tự động load các hình ảnh này dựa trên ID câu hỏi.

## 5. TÍNH NĂNG

### 🚀 MVP (Bắt buộc có):
- [ ] Tính năng đọc âm thanh ngay khi hiện câu hỏi (Speech Synthesis).
- [ ] Giao diện 4 thẻ hình ảnh lớn, dễ bấm cho bé.
- [ ] Ngân hàng câu hỏi nhận biết số từ **1 đến 10**.
- [ ] Hệ thống Tagging cơ cấu lại dữ liệu câu hỏi.
- [ ] Animation phản hồi khi bé chọn đúng (pháo hoa/confetti).

### 🎁 Phase 2 (Làm sau):
- [ ] Mở rộng lên số 10, 20.
- [ ] Dạng toán ngược: "Nhìn hình, chọn số".
- [ ] Giọng đọc thật của cô giáo (thay vì giọng máy).

## 6. ƯỚC TÍNH SƠ BỘ
- **Độ phức tạp:** 🟢 **DỄ** (Vì logic đếm đơn giản, chủ yếu là xử lý Asset hình ảnh).
- **Rủi ro:** Cần đảm bảo hình ảnh gen ra đúng số lượng (AI đôi khi gen nhầm số lượng củ cà rốt nếu prompt không kỹ).

## 7. BƯỚC TIẾP THEO
→ Chạy `/plan` để thiết kế chi tiết các component UI và cấu trúc dữ liệu mới.
