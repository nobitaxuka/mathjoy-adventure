# 💡 BRIEF: MathJoy Adventure (Toán Tư Duy Cho Bé)

**Ngày tạo:** 2026-02-05
**Dự án:** Web App học toán tư duy cho trẻ em (Gamification)

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
Trẻ em thường cảm thấy học toán khô khan và áp lực. Các ứng dụng hiện nay hoặc quá đơn giản (thiếu tính thử thách) hoặc quá phức tạp (thiếu tính tương tác sống động).

## 2. GIẢI PHÁP ĐỀ XUẤT
Xây dựng một Web App dạng game hành trình, nơi bé học toán thông qua việc chinh phục các "vùng đất" (levels). Game kết hợp giữa tính thử thách (giới hạn số lần sai) và sự khích lệ (animation, phần thưởng).

## 3. ĐỐI TƯỢNG SỬ DỤNG
- **Chính:** Trẻ em từ 4-8 tuổi.
- **Phụ:** Phụ huynh muốn theo dõi tiến độ học tập của con.

## 4. NGHIÊN CỨU THỊ TRƯỜNG & ĐỐI THỦ
### Phân tích đối thủ:
| App | Điểm mạnh | Điểm yếu |
|-----|-----------|----------|
| **Monkey Math** | Nội dung đồ sộ, nhân vật dễ thương, có lộ trình rõ ràng. | Phụ thuộc vào app cài đặt, chi phí cao. |
| **Khan Academy Kids** | Hoàn toàn miễn phí, chất lượng sư phạm cực cao. | UI hơi "phẳng", đôi khi thiếu tính cạnh tranh/gameplay kịch tính. |

### Điểm khác biệt của MathJoy:
- **Cơ chế "Thử thách lại":** Trả lời sai quá 3 câu sẽ phải chơi lại màn đó với bộ câu hỏi ngẫu nhiên mới -> Đảm bảo bé hiểu bài chứ không học thuộc đáp án.
- **Web App Hybrid:** Chạy mượt trên cả iPad và PC mà không cần cài đặt.
- **Thiết kế tập trung vào Animation:** Sử dụng các hiệu ứng micro-interaction để mỗi cú click đều mang lại niềm vui cho bé.

## 5. TÍNH NĂNG

### 🚀 MVP (Bắt buộc có):
- [ ] **Game Engine cơ bản:** Quản lý màn chơi (Levels) và chuyển cảnh.
- [ ] **Hệ thống câu hỏi:** 10 câu/màn, hỗ trợ nhiều dạng (chọn đáp án, kéo thả).
- [ ] **Cơ chế "3 Mạng":** Theo dõi số câu sai, reset màn chơi nếu vượt quá.
- [ ] **Randomization:** Xáo trộn câu hỏi từ ngân hàng đề mỗi khi chơi lại.
- [ ] **UI/UX cho trẻ em:** Màu sắc rực rỡ, nút bấm to, font chữ dễ đọc.

### 🎁 Phase 2 (Làm sau):
- [ ] **Hệ thống phần thưởng:** Sao, huy hiệu, rương báu.
- [ ] **Linh vật (Mascot):** Nhân vật dẫn dắt bé qua các màn.
- [ ] **Lưu tiến độ:** Tài khoản cá nhân cho từng bé.
- [ ] **Âm thanh:** Nhạc nền, giọng đọc câu hỏi (Voice-over).

## 6. ƯỚC TÍNH SƠ BỘ
- **Độ phức tạp:** Trung bình (Cần tập trung nhiều vào logic game và xử lý animation).
- **Rủi ro:** Hiệu năng animation trên các thiết bị cấu hình thấp (Cần tối ưu dung lượng asset).

## 7. BƯỚC TIẾP THEO
1.  **Chạy `/init`** để dựng folder structure chuẩn.
2.  **Chạy `/plan`** để thiết kế Schema cho câu hỏi và Logic Game.
3.  **Chạy `/visualize`** để chọn tông màu và layout "Wowed" cho bé.
