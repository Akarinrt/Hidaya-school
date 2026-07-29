import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getStudentId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    return decoded.id;
  } catch { return null; }
}

export default async function StudentDashboard() {
  const studentId = await getStudentId();

  const [notifications, schedules, homeworks] = await Promise.all([
    studentId ? prisma.notification.findMany({ where: { userId: studentId }, orderBy: { createdAt: 'desc' }, take: 5 }) : [],
    prisma.schedule.findMany({ orderBy: { dayOfWeek: 'asc' } }),
    prisma.homework.findMany({ where: { isPublished: true }, orderBy: { deadline: 'asc' }, take: 3 }),
  ]);

  const today = new Date().getDay();
  const todaySchedules = schedules.filter(s => s.dayOfWeek === today);
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div style={{ fontSize: '42px' }}>🌸</div>
        <div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '2px' }}>Xin chào, Học viên!</div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tiếp tục hành trình chinh phục tiếng Nhật của bạn.</div>
        </div>
      </div>

      <div className="section-label">Thông tin cá nhân</div>
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        <div className="kpi-card" style={{ borderLeftColor: 'var(--primary)' }}>
          <div className="kpi-label">Lớp học hôm nay</div>
          <div className="kpi-value" style={{ color: todaySchedules.length > 0 ? 'var(--primary)' : 'inherit' }}>{todaySchedules.length}</div>
          <div className="kpi-sub">Lịch học ({dayNames[today]})</div>
        </div>
        <div className="kpi-card" style={{ borderLeftColor: 'var(--warning)' }}>
          <div className="kpi-label">Bài tập sắp hạn</div>
          <div className="kpi-value" style={{ color: homeworks.length > 0 ? 'var(--warning)' : 'inherit' }}>{homeworks.length}</div>
          <div className="kpi-sub">Cần hoàn thành</div>
        </div>
        <div className="kpi-card" style={{ borderLeftColor: 'var(--danger)' }}>
          <div className="kpi-label">Thông báo mới</div>
          <div className="kpi-value" style={{ color: unreadCount > 0 ? 'var(--danger)' : 'inherit' }}>{unreadCount}</div>
          <div className="kpi-sub">Chưa đọc</div>
        </div>
      </div>

      <div className="section-label">Truy cập nhanh</div>
      
      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        <Link href="/student/lessons" className="quick-link-card">
          <div className="quick-link-icon" style={{ background: 'var(--success-bg)' }}>📖</div>
          <div>
            <div className="quick-link-title">Xem bài giảng</div>
            <div className="quick-link-desc">Tài liệu & Slides</div>
          </div>
        </Link>
        <Link href="/student/vocab" className="quick-link-card">
          <div className="quick-link-icon" style={{ background: 'var(--primary-light)' }}>🎮</div>
          <div>
            <div className="quick-link-title">Game từ vựng</div>
            <div className="quick-link-desc">Luyện Kanji</div>
          </div>
        </Link>
        <Link href="/student/homework" className="quick-link-card">
          <div className="quick-link-icon" style={{ background: 'var(--warning-bg)' }}>📝</div>
          <div>
            <div className="quick-link-title">Bài tập</div>
            <div className="quick-link-desc">Nộp bài & Kiểm tra</div>
          </div>
        </Link>
        <Link href="/student/messages" className="quick-link-card">
          <div className="quick-link-icon" style={{ background: 'var(--danger-bg)' }}>💬</div>
          <div>
            <div className="quick-link-title">Nhắn tin GV</div>
            <div className="quick-link-desc">Hỏi đáp trực tiếp</div>
          </div>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Today's Classes */}
        <div>
          <div className="section-label">Lớp học hôm nay ({dayNames[today]})</div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {todaySchedules.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Hôm nay không có lớp học. Hãy ôn bài nhé! 📚</div>
            ) : (
              todaySchedules.map((s) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{s.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.startTime} - {s.endTime}</div>
                  </div>
                  {s.meetLink ? (
                    <a href={s.meetLink} target="_blank" rel="noreferrer" className="badge badge-blue" style={{ textDecoration: 'none' }}>🎥 Vào lớp</a>
                  ) : (
                    <span className="badge badge-blue">{s.location || 'Online'}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="section-label">Thông báo mới</div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Chưa có thông báo nào.</div>
            ) : (
              notifications.map((n) => (
                <Link key={n.id} href={n.link || '#'} className={`notif-item ${!n.isRead ? 'unread' : ''}`}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>
                    {n.type === 'TEST' ? '📋' : n.type === 'HOMEWORK' ? '📝' : n.type === 'MATERIAL' ? '📂' : '🔔'}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-body">{n.body}</div>
                  </div>
                  {!n.isRead && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }}></span>}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
