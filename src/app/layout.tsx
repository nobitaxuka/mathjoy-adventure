import type { Metadata } from "next";
import { outfit } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "MathJoy Adventure - Toán Tư Duy Cho Bé",
  description: "Cùng bé học toán qua những chuyến phiêu lưu kỳ thú!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
