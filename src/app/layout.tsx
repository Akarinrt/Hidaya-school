import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hidaya School - Nền tảng Học Tiếng Nhật",
  description: "Nền tảng học tiếng Nhật online dành cho học viên Hidaya School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
