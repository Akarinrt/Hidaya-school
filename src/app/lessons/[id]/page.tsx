'use client';

import { LESSONS_DATA } from '@/data/lessons';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { use, useState, useEffect } from 'react';

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lesson = LESSONS_DATA[resolvedParams.id as keyof typeof LESSONS_DATA];
  // Bài 26-28 dùng nguphap.html đầy đủ; từ bài 29 dùng index.html (bản slide hoàn chỉnh)
  const lessonNum = parseInt(resolvedParams.id.replace('bai-', ''), 10);
  const slideFile = lessonNum >= 29 ? 'index.html' : 'nguphap.html';
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!lesson) {
    notFound();
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center" suppressHydrationWarning>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative font-sans h-screen overflow-hidden">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 flex-none">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/lessons"
            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Trở về danh sách
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-gray-800">
              {lesson.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Reveal.js Container via Iframe */}
      <main className="flex-grow w-full h-full p-4 sm:p-8 flex items-center justify-center bg-slate-900">
        <div className="w-full h-full max-w-6xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden border border-gray-700 bg-white relative">
            <iframe
              title={lesson.title}
              src={`/slides/bai${lesson.id.replace('bai-', '')}/${slideFile}`}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-modals"
            />
        </div>
      </main>
    </div>
  );
}
