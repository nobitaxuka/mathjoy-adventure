# Phase 01: Game Engine & Data Logic
Status: ✅ Complete
Dependencies: None

## Objective
Thiết lập hệ thống dữ liệu câu hỏi và logic cốt lõi của trò chơi (tính điểm, đếm số câu sai, chọn ngẫu nhiên 10 câu từ 30 câu).

## Requirements
### Functional
- [x] Định nghĩa cấu trúc dữ liệu `Question` (Toán tư duy cho bé).
- [x] Tạo ngân hàng câu hỏi mẫu cho Level 1 (30 câu).
- [x] Logic "Bốc thăm" (Shuffle & Slice) 10 câu ngẫu nhiên.
- [x] State máy chủ yếu (Game State): `START`, `PLAYING`, `GAME_OVER`, `VICTORY`.

## Implementation Steps
1. [x] Tạo `src/types/game.ts` để định nghĩa Interface.
2. [x] Tạo `src/lib/questions.ts` chứa data mẫu.
3. [x] Viết Hook `useGame` tại `src/hooks/useGame.ts`.
4. [x] Viết logic Engine xáo trộn tại `src/lib/engine.ts`.

## Files to Create/Modify
- `src/types/game.ts`
- `src/lib/questions.ts`
- `src/lib/engine.ts`

## Test Criteria
- [ ] Chạy game, kiểm tra 10 câu hỏi có khác nhau mỗi lần reset không.
- [ ] Trả lời sai 4 câu -> Trạng thái phải là `GAME_OVER`.
- [ ] Trả lời đúng 10 câu -> Trạng thái phải là `VICTORY`.

---
Next Phase: [Phase 02: Core UI Components](phase-02-ui.md)
