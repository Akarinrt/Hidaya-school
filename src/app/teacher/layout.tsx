'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

const navItems = [
  { href: '/teacher/dashboard', icon: '🏠', label: 'Tổng quan' },
  { href: '/teacher/schedule', icon: '📅', label: 'Lịch dạy' },
  { href: '/teacher/lessons', icon: '📂', label: 'Kho giáo án' },
  { href: '/teacher/homework', icon: '📝', label: 'Bài tập' },
  { href: '/teacher/grading', icon: '✅', label: 'Chấm bài' },
  { href: '/teacher/students', icon: '👥', label: 'Học viên' },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      {/* Sidebar (Desktop) */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>桜</span>
          <div>
            <div className={styles.logoTitle}>Hidaya School</div>
            <div className={styles.logoSub}>Giáo viên</div>
          </div>
        </div>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.logoutWrapper}>
          <Link href="/" className={styles.logout}>🚪 Đăng xuất</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className={styles.bottomNav}>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.bottomNavItem} ${pathname === item.href ? styles.activeBottom : ''}`}
          >
            <span className={styles.bottomNavIcon}>{item.icon}</span>
            <span className={styles.bottomNavLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
