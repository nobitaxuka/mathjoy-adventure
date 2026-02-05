# MathJoy Adventure - Toán Tư Duy Cho Bé

Dự án Web App học toán tư duy dành cho trẻ em (4-8 tuổi) với phong cách thiết kế hiện đại, sống động và tối ưu trải nghiệm học tập qua trò chơi (Gamification).

## 🚀 Tính năng chính
- **Hệ thống Level:** Chinh phục các màn chơi từ dễ đến khó.
- **Cơ chế 3 Mạng:** Giúp bé rèn luyện tính cẩn thận. Sai quá 3 câu sẽ phải chơi lại với bộ câu hỏi ngẫu nhiên mới.
- **Ngân hàng câu hỏi:** 30 câu mỗi màn, tự động bốc 10 câu ngẫu nhiên để tránh học vẹt.
- **Animation sống động:** Sử dụng Framer Motion cho các hiệu ứng chuyển câu, phản hồi đúng/sai cực kỳ bắt mắt.
- **Lưu tiến độ:** Tự động lưu màn chơi cao nhất vào LocalStorage.
- **Âm thanh:** Tích hợp hệ thống âm thanh vui nhộn (Correct, Wrong, Victory).

## 🛠️ Công nghệ sử dụng
- **Frontend:** Next.js 15, Tailwind CSS, Framer Motion.
- **Icons:** Lucide React.
- **State Management:** React Hooks (Custom Hooks: `useGame`, `useAudio`).

## 📁 Cài đặt và Chạy dự án
1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```
2. **Chạy server phát triển:**
   ```bash
   npm run dev
   ```
3. **Thêm âm thanh:**
   Copy các file `.mp3` vào `public/sounds/` với tên: `correct.mp3`, `wrong.mp3`, `victory.mp3`, `click.mp3`.

## 📂 Cấu trúc thư mục
- `src/app`: Giao diện chính và Routing.
- `src/components`: UI components cho game.
- `src/hooks`: Logic cốt lõi (Game Engine & Audio).
- `src/lib`: Data câu hỏi và thuật toán xử lý.
- `src/types`: TypeScript definitions.
- `plans/`: Toàn bộ kế hoạch và nhật ký phát triển theo AWF.

---
Phát triển bởi **Antigravity AI** theo quy trình Agile.
