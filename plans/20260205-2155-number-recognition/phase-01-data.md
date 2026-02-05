# Phase 01: Asset & Question Data
Status: ⬜ Pending
Dependencies: None

## Objective
Chuẩn bị ngân hàng câu hỏi nhận biết số từ 1-10 cùng bộ asset hình ảnh đồng nhất.

## Requirements
### Functional
- [ ] List 10 câu hỏi nhận biết số (1-10) trong `src/lib/questions.ts`.
- [ ] Mỗi câu hỏi có đầy đủ `category: "NUMBER_RECOGNITION"` và `tags`.
- [ ] Gen 10 hình ảnh minh họa tương ứng với số lượng (VD: 1 carrot, 2 cats...).

### Non-Functional
- [ ] Hình ảnh đồng nhất phong cách "Children Illustration/Cartoon".
- [ ] Đảm bảo AI vẽ đúng số lượng vật thể.

## Implementation Steps
1. [ ] Gen ảnh cho các số từ 1-10 bằng `generate_image`.
2. [ ] Lưu ảnh vào `/public/images/questions/`.
3. [ ] Cập nhật `src/lib/questions.ts` với mảng `RECOGNITION_QUESTIONS`.

## Files to Create/Modify
- `src/lib/questions.ts` - Thêm dữ liệu câu hỏi mới.
- `/public/images/questions/*` - Lưu asset hình ảnh.

## Test Criteria
- [ ] Dữ liệu câu hỏi đúng format interface `Question`.
- [ ] Ảnh hiển thị rõ ràng, đúng số lượng vật thể.

---
Next Phase: [Phase 02: Question UI Logic](./phase-02-ui.md)
