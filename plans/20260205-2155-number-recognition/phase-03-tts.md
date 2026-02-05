# Phase 03: TTS (Text-to-Speech) Integration
Status: ✅ Complete
Dependencies: Phase 02

## Objective
Tích hợp giọng đọc "Số Một", "Số Hai"... tự động khi hiện câu hỏi.

## Requirements
### Functional
- [ ] Sử dụng Web Speech API.
- [ ] Tự động trigger âm thanh khi render câu hỏi mới loại `NUMBER_RECOGNITION`.
- [ ] Đảm bảo chọn đúng voice Tiếng Việt của hệ thống.

### Non-Functional
- [ ] Tránh overlap âm thanh khi user click liên tục.

## Implementation Steps
1. [ ] Viết hook `useSpeech` để quản lý giọng đọc.
2. [ ] Gọi giọng đọc trong effect khi `currentQuestion` thay đổi.

## Files to Create/Modify
- `src/hooks/useSpeech.ts`
- `src/components/game/GameManager.tsx`

## Test Criteria
- [ ] Khi chuyển sang câu hỏi "1", máy đọc "Số một".

---
Next Phase: [Phase 04: Tagging Update](./phase-04-tagging.md)
