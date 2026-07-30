'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import styles from './layout.module.css';

const navItems = [
  { href: '/student/dashboard', icon: '🏠', label: 'Tổng quan' },
  { href: '/student/classes', icon: '🏫', label: 'Lớp học' },
  { href: '/student/schedule', icon: '📅', label: 'Lịch học' },
  { href: '/student/homework', icon: '📝', label: 'Bài tập' },
  { href: '/student/tests', icon: '📋', label: 'Kiểm tra' },
  { href: '/student/messages', icon: '💬', label: 'Tin nhắn' },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
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
            <div className={styles.logoSub}>Student Portal</div>
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
            <div className="avatar" style={{background: 'linear-gradient(135deg, var(--success), var(--accent))'}}>👨‍🎓</div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>Học viên</div>
              <div className={styles.userRole}>Học viên</div>
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
            <span className={styles.pageTitle}>Hidaya School</span>
            <span className={styles.pageSub}>Hệ thống học tập trực tuyến</span>
          </div>
          <div className={styles.headerActions} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ position: 'relative', cursor: 'pointer', fontSize: '20px' }} title="Thông báo">
              🔔
              <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--danger)', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
            </div>
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                title="Đổi giao diện"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}
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
