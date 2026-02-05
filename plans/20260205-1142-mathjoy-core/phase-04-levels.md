# Phase 04: Level Progression & Persistence
Status: ✅ Complete
Dependencies: Phase 01, 02, 03

## Objective
Cho phép bé mở khóa các màn chơi mới và lưu lại tiến độ vào trình duyệt (LocalStorage).

## Requirements
### Functional
- [x] Lưu màn chơi cao nhất đã mở khóa (`maxUnlockedLevel`).
- [x] Hiển thị màn hình chọn Level (Level Selection).
- [x] Tự động chuyển màn khi thắng.
- [x] Ghi nhớ tiến độ kể cả khi tắt máy/tải lại trang.

## Implementation Steps
1. [x] Cập nhật `useGame.ts` để đọc/ghi dữ liệu từ `localStorage`.
2. [x] Tạo giao diện màn hình chọn Level rực rỡ.
3. [x] Bổ sung data cho Level 2 (Toán cộng trừ phạm vi 20).

## Files to Create/Modify
- `src/hooks/useGame.ts`
- `src/app/page.tsx`
- `src/lib/questions.ts`
