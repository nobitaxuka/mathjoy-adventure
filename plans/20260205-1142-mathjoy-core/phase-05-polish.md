# Phase 05: Polish & Sound Effects
Status: ✅ Complete
Dependencies: Phase 04

## Objective
Thêm âm thanh vui nhộn và các hiệu ứng phản hồi vật lý để game trở nên thu hút hơn.

## Requirements
### Functional
- [x] Hệ thống âm thanh (Correct, Wrong, Victory, Click).
- [x] Hiệu ứng rung màn hình (Screen Shake) khi trả lời sai.
- [x] Đổi màu nền tức thì để báo hiệu sai (Flash red).
- [x] Mascot nhún nhảy mạnh mẽ hơn.

## Implementation Steps
1. [x] Tạo `src/hooks/useAudio.ts` quản lý âm thanh.
2. [x] Tích hợp hiệu ứng rung (`isShaking`) vào `Home` component.
3. [x] Xử lý sự kiện `VICTORY` để phát âm thanh chiến thắng.
4. [x] Tạo cấu trúc thư mục `public/sounds/` để người dùng thêm nhạc.

## Quick Note
Anh hãy copy các file âm thanh vào `public/sounds/` với tên:
- `correct.mp3`
- `wrong.mp3`
- `victory.mp3`
- `click.mp3`
