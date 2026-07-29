'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import styles from './layout.module.css';

const navItems = [
  { href: '/teacher/dashboard', icon: '🏠', label: 'Tổng quan' },
  { href: '/teacher/schedule', icon: '📅', label: 'Lịch dạy' },
  { href: '/teacher/lessons', icon: '📂', label: 'Kho giáo án' },
  { href: '/teacher/homework', icon: '📝', label: 'Bài tập' },
  { href: '/teacher/grading', icon: '✅', label: 'Chấm bài' },
  { href: '/teacher/students', icon: '👥', label: 'Lớp học' },
  { href: '/teacher/users', icon: '🔐', label: 'Tài khoản' },
  { href: '/teacher/ai-analytics', icon: '🤖', label: 'Trợ lý AI' },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.appShell}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>🌸</div>
          <div>
            <div className={styles.logoTitle}>Hidaya School</div>
            <div className={styles.logoSub}>Teacher Portal</div>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navGroupLabel}>Menu chính</div>
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className="avatar">👩‍🏫</div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>Hồng Khuông</div>
              <div className={styles.userRole}>Giáo viên</div>
            </div>
          </div>
          <Link href="/" className={styles.logoutBtn} title="Đăng xuất">🚪</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <button className={styles.menuBtn} onClick={() => setIsMobileMenuOpen(true)}>☰</button>
          <div className={styles.headerTitle}>
            <span className={styles.pageTitle}>Daruma LMS</span>
            <span className={styles.pageSub}>Hệ thống quản lý giảng dạy</span>
          </div>
          <div className={styles.headerActions} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                title="Đổi giao diện"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}
            <button className="btn-primary">Tạo mới</button>
          </div>
        </header>
        
        <div className={styles.pageWrapper}>
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
}
