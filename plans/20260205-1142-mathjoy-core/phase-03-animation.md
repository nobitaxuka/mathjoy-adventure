# Phase 03: Animation & Transitions (The "Wowed" Factor)
Status: ✅ Complete
Dependencies: Phase 02

## Objective
Thêm "linh hồn" vào game thông qua Framer Motion. Đảm bảo mọi tương tác đều sống động.

## Requirements
### Non-Functional
- [x] Chuyển giữa các câu hỏi: Hiệu ứng trượt (Slide) hoặc mờ dần (Fade).
- [x] Trả lời đúng: Hiệu ứng bắn pháo hoa hoặc ngôi sao bay.
- [x] Trả lời sai: Hiệu ứng rung (Shake) màn hình nhẹ nhàng.
- [x] Mascot xuất hiện vui vẻ khi bé thắng.

## Implementation Steps
1. [x] Cài đặt `AnimatePresence` để xử lý chuyển cảnh Layout.
2. [x] Tạo `FeedbackOverlay` cho hiệu ứng đúng/sai.
3. [x] Tích hợp `framer-motion` vào Question Card và Buttons.

## Test Criteria
- [ ] Thử nghiệm trên thiết bị di động xem animation có bị giật (lag) không.
