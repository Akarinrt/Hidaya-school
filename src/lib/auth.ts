import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Lấy JWT_SECRET từ biến môi trường.
 * Bắt buộc phải set JWT_SECRET trong production.
 * Fallback CHỈ dùng cho development.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET chưa được cấu hình trong production environment!');
  }
  return secret || 'dev-only-insecure-secret-do-not-use-in-production';
}

export interface AuthUser {
  id: string;
  username: string;
  role: string;
}

/**
 * Kiểm tra và giải mã token từ cookie.
 * Trả về null nếu không có token hoặc token không hợp lệ.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AuthUser;
    return {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

/**
 * Middleware helper: Yêu cầu đăng nhập.
 * Trả về NextResponse lỗi 401 nếu chưa đăng nhập.
 */
export async function requireAuth(): Promise<
  { user: AuthUser; error: null } | { user: null; error: NextResponse }
> {
  const user = await getAuthUser();
  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { message: 'Vui lòng đăng nhập để tiếp tục' },
        { status: 401 }
      ),
    };
  }
  return { user, error: null };
}

/**
 * Middleware helper: Yêu cầu quyền giáo viên (hoặc role khác).
 * Trả về NextResponse lỗi 401/403 nếu không được phép.
 */
export async function requireRole(roles: string[]): Promise<
  { user: AuthUser; error: null } | { user: null; error: NextResponse }
> {
  const result = await requireAuth();
  if (result.error) {
    return result;
  }
  if (!roles.includes(result.user!.role)) {
    return {
      user: null,
      error: NextResponse.json(
        { message: 'Không có quyền truy cập' },
        { status: 403 }
      ),
    };
  }
  return { user: result.user!, error: null };
}

/**
 * Tạo token JWT cho user.
 */
export function signToken(user: { id: string; username: string; role: string }): string {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    getJwtSecret(),
    { expiresIn: '1d' }
  );
}

/**
 * Helper chung: Trả về lỗi chuẩn hóa (không lộ stack trace ra client).
 */
export function apiError(message: string, status = 500, detail?: unknown) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({ message, detail }, { status });
  }
  return NextResponse.json({ message }, { status });
}