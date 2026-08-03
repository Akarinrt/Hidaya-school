import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET chưa được cấu hình trong production environment!');
  }
  return secret || 'dev-only-insecure-secret-do-not-use-in-production';
}

// Các route công khai (không cần đăng nhập)
const PUBLIC_PATHS = [
  '/',
  '/login',
  '/lessons',
  '/test',
  '/vocab',
  '/api/auth/login',
  '/slides',
  '/materials',
  '/favicon.ico',
  '/_next',
];

const STATIC_FILE_PATTERN = /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|html|pdf|mp3|mp4|woff|woff2|ttf)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cho phép file tĩnh
  if (STATIC_FILE_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  // Cho phép public paths
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Kiểm tra token
  const token = request.cookies.get('token')?.value;
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Vui lòng đăng nhập' }, { status: 401 });
    }
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { id: string; role: string };

    // Bảo vệ teacher routes - chỉ TEACHER mới vào được
    if (pathname.startsWith('/teacher') && decoded.role !== 'TEACHER') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ message: 'Không có quyền truy cập' }, { status: 403 });
      }
      const dashUrl = new URL('/student/dashboard', request.url);
      return NextResponse.redirect(dashUrl);
    }

    // Bảo vệ student routes - STUDENT hoặc TEACHER đều xem được
    if (pathname.startsWith('/student') && !['STUDENT', 'TEACHER'].includes(decoded.role)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ message: 'Không có quyền truy cập' }, { status: 403 });
      }
      const dashUrl = new URL('/student/dashboard', request.url);
      return NextResponse.redirect(dashUrl);
    }

    return NextResponse.next();
  } catch {
    // Token không hợp lệ hoặc hết hạn
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Phiên đăng nhập đã hết hạn' }, { status: 401 });
    }
    const loginUrl = new URL('/', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match tất cả các request trừ:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};