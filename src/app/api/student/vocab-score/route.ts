import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getJwtSecret } from '@/lib/auth';

const prisma = new PrismaClient();

// POST: Save vocab test score
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const decoded = jwt.verify(token, getJwtSecret()) as { id: string };
    const studentId = decoded.id;

    const { category, score, total } = await req.json();

    if (!category || score === undefined || !total) {
      return NextResponse.json({ error: "Thiếu dữ liệu điểm số" }, { status: 400 });
    }

    // Save vocab score to database
    const vocabScore = await prisma.vocabScore.create({
      data: {
        userId: studentId,
        category,
        score,
        total
      }
    });

    return NextResponse.json({ success: true, data: vocabScore });
  } catch (error: any) {
    console.error("Lỗi lưu điểm từ vựng:", error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

// GET: Retrieve highest score for a category
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const decoded = jwt.verify(token, getJwtSecret()) as { id: string };
    const studentId = decoded.id;

    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    if (!category) {
      return NextResponse.json({ error: "Thiếu category" }, { status: 400 });
    }

    const scores = await prisma.vocabScore.findMany({
      where: {
        userId: studentId,
        category
      },
      orderBy: {
        score: "desc"
      },
      take: 5
    });

    return NextResponse.json({ success: true, scores });
  } catch (error: any) {
    console.error("Lỗi lấy điểm từ vựng:", error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
