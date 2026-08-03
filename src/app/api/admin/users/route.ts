import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { requireAuth, requireRole } from '@/lib/auth';

const prisma = new PrismaClient();

// GET: Lấy danh sách tất cả Users (Giáo viên và Học sinh)
export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(['TEACHER']);
    if (error) return error;
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        email: true,
        phone: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách user:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

// POST: Tạo User mới (Giáo viên hoặc Học sinh)
export async function POST(req: NextRequest) {
  try {
    const { error } = await requireRole(['TEACHER']);
    if (error) return error;
    const body = await req.json();
    const { username, password, fullName, role, email, phone } = body;

    if (!username || !password || !fullName || !role) {
      return NextResponse.json({ error: "Vui lòng nhập đủ các trường bắt buộc" }, { status: 400 });
    }

    // Kiểm tra role hợp lệ (tránh tự gán ADMIN hoặc role ảo)
    const allowedRoles = ['STUDENT', 'TEACHER'];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: 'Role không hợp lệ' }, { status: 400 });
    }

    // Kiểm tra trùng lặp
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Tên đăng nhập đã tồn tại" }, { status: 400 });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo User
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        fullName,
        role, // 'TEACHER' hoặc 'STUDENT'
        email: email || null,
        phone: phone || null,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
      }
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Lỗi tạo user:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
