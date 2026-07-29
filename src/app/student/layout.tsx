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
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🌸</span>
          <div>
            <div className={styles.logoTitle}>Hidaya School</div>
            <div className={styles.logoSub}>Học viên</div>
          </div>
        </div>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.logoutWrapper}>
          <Link href="/" className={styles.logout}>🚪 Đăng xuất</Link>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
      <nav className={styles.bottomNav}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} className={`${styles.bottomNavItem} ${pathname === item.href ? styles.activeBottom : ''}`}>
            <span className={styles.bottomNavIcon}>{item.icon}</span>
            <span className={styles.bottomNavLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
