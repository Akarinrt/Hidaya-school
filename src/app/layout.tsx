import type { Metadata } from "next";
import "./globals.css";

import Providers from './providers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hidaya School LMS',
  description: 'Hệ thống quản lý học tập tiếng Nhật',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
