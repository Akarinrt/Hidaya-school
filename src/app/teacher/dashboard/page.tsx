import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import AnalyticsCharts from './AnalyticsCharts';

const prisma = new PrismaClient();

export default async function TeacherDashboard() {
  const [teachersCount, studentsCount, pendingCount, upcomingClasses] = await Promise.all([
    prisma.user.count({ where: { role: 'TEACHER' } }),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.submission.count({ where: { status: 'PENDING' } }),
    prisma.schedule.findMany({ take: 3, orderBy: { dayOfWeek: 'asc' } }),
  ]);

  const quickLinks = [
    { href: '/teacher/schedule', icon: '📅', label: 'Xếp lịch dạy', desc: 'Quản lý lịch học', bg: 'var(--primary-light)' },
    { href: '/teacher/lessons', icon: '📂', label: 'Giáo án', desc: 'Soạn bài giảng', bg: 'var(--success-bg)' },
    { href: '/teacher/homework', icon: '📝', label: 'Giao bài tập', desc: 'Bài tập về nhà', bg: 'var(--warning-bg)' },
    { href: '/teacher/grading', icon: '✅', label: 'Chấm điểm', desc: `${pendingCount} bài chưa chấm`, bg: 'var(--danger-bg)' },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--surface))', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div style={{ fontSize: '42px' }}>🏮</div>
        <div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '2px' }}>Xin chào, Giáo viên!</div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Quản lý hệ thống giảng dạy Hidaya School</div>
        </div>
      </div>

      <div className="section-label">Tổng quan hệ thống</div>
      <AnalyticsCharts />
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        <div className="kpi-card" style={{ borderLeftColor: 'var(--primary)' }}>
          <div className="kpi-label">Tổng học viên</div>
          <div className="kpi-value">{studentsCount}</div>
          <div className="kpi-sub">Đang theo học</div>
        </div>
        <div className="kpi-card" style={{ borderLeftColor: 'var(--success)' }}>
          <div className="kpi-label">Giáo viên</div>
          <div className="kpi-value">{teachersCount}</div>
          <div className="kpi-sub">Trên hệ thống</div>
        </div>
        <div className="kpi-card" style={{ borderLeftColor: 'var(--warning)' }}>
          <div className="kpi-label">Bài tập chờ chấm</div>
          <div className="kpi-value" style={{ color: pendingCount > 0 ? 'var(--warning)' : 'inherit' }}>{pendingCount}</div>
          <div className="kpi-sub">Cần xử lý</div>
        </div>
      </div>

      <div className="section-label">Truy cập nhanh</div>
      
      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {quickLinks.map(ql => (
          <Link key={ql.href} href={ql.href} className="quick-link-card">
            <div className="quick-link-icon" style={{ background: ql.bg }}>{ql.icon}</div>
            <div>
              <div className="quick-link-title">{ql.label}</div>
              <div className="quick-link-desc">{ql.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-label">Lịch dạy sắp tới</div>

      {/* Recent Sessions */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {upcomingClasses.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Không có lịch dạy sắp tới</div>
        ) : (
          upcomingClasses.map((cls, idx) => (
            <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'var(--primary)', flexShrink: 0 }}>
                T{cls.dayOfWeek + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{cls.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cls.startTime} - {cls.endTime}</div>
              </div>
              <span className="badge badge-blue">{cls.location || 'Online'}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
