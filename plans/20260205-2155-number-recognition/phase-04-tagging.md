# Phase 04: Tagging & Infrastructure Update
Status: ✅ Complete
Dependencies: Phase 01

## Objective
Cập nhật toàn bộ hệ thống câu hỏi hiện tại với hệ thống tag mới để hỗ trợ bộ lọc sau này.

## Requirements
### Functional
- [ ] Gán tag `category: "CALCULATION"`, `ageGroup: "5-6"`, `difficulty: "MEDIUM"` cho các câu hỏi cũ trong `LEVEL_1_QUESTIONS` và `LEVEL_2_QUESTIONS`.
- [ ] Đảm bảo types logic trong codebase không bị lỗi sau khi thêm trường bắt buộc.

## Implementation Steps
1. [ ] Cập nhật file `src/lib/questions.ts`.
2. [ ] Kiểm tra và sửa lỗi TS (nếu có) ở những nơi sử dụng interface `Question`.

## Files to Create/Modify
- `src/lib/questions.ts`

## Test Criteria
- [ ] Build project không lỗi.
- [ ] Dữ liệu câu hỏi cũ và mới đều có đầy đủ tags.

---
Next Phase: [Phase 05: Testing & Integration](./phase-05-test.md)
