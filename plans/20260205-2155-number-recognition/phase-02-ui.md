# Phase 02: Question UI Logic
Status: ✅ Complete
Dependencies: Phase 01

## Objective
Xây dựng giao diện hiển thị 4 thẻ hình ảnh lớn cho dạng bài nhận biết số.

## Requirements
### Functional
- [ ] Tạo UI hiển thị con số chính giữa (Target).
- [ ] Grid 2x2 hiển thị 4 hình ảnh lựa chọn.
- [ ] Logic xáo trộn (shuffle) các lựa chọn để bài toán không bị lặp lại.

### Non-Functional
- [ ] Thẻ hình ảnh có border bo tròn, đổ bóng nhẹ, hiệu ứng hover/click thân thiện với trẻ em.

## Implementation Steps
1. [ ] Chỉnh sửa `GameBoard` để nhận biết loại câu hỏi và render UI phù hợp.
2. [ ] Thêm component `ImageOption` cho các thẻ lựa chọn.

## Files to Create/Modify
- `src/components/game/GameBoard.tsx` (hoặc file UI tương ứng)
- `src/components/game/ImageOption.tsx`

## Test Criteria
- [ ] UI hiển thị đúng 4 hình ảnh.
- [ ] Click vào hình đúng -> Trigger logic "Correct".

---
Next Phase: [Phase 03: TTS Integration](./phase-03-tts.md)
