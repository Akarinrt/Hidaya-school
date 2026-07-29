'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

const navItems = [
  { href: '/student/dashboard', icon: '🏠', label: 'Tổng quan' },
  { href: '/student/schedule', icon: '📅', label: 'Lịch học' },
  { href: '/student/lessons', icon: '📖', label: 'Bài giảng' },
  { href: '/student/vocab', icon: '🎮', label: 'Luyện tập' },
  { href: '/student/homework', icon: '📝', label: 'Bài tập' },
  { href: '/student/messages', icon: '💬', label: 'Tin nhắn' },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <span className={styles.pageTitle}>Daruma LMS</span>
            <span className={styles.pageSub}>Hệ thống học tập trực tuyến</span>
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
