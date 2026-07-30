'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClassTabs({ classId }: { classId: string }) {
  const pathname = usePathname();

  const tabs = [
    { href: `/student/class/${classId}`, label: '📢 Bảng tin', exact: true },
    { href: `/student/class/${classId}/lessons`, label: '📖 Bài giảng' },
    { href: `/student/class/${classId}/homework`, label: '📝 Bài tập' },
    { href: `/student/class/${classId}/tests`, label: '📋 Kiểm tra' },
    { href: `/student/class/${classId}/resources`, label: '📁 File chia sẻ' },
    { href: `/student/class/${classId}/flashcards`, label: '🃏 Từ vựng' },
  ];

  return (
    <div style={{ display: 'flex', gap: '5px', marginBottom: '30px', borderBottom: '2px solid var(--border)', flexWrap: 'wrap' }}>
      {tabs.map(tab => {
        const isActive = tab.exact 
          ? pathname === tab.href 
          : pathname === tab.href || pathname.startsWith(tab.href + '/');

        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: '12px 24px',
              fontWeight: 'bold',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              textDecoration: 'none',
              borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
