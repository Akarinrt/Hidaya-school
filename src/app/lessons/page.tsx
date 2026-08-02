import Link from 'next/link';
import { LESSONS_DATA } from '@/data/lessons';
import { BookOpen } from 'lucide-react';

export default function LessonsPage() {
  const lessons = Object.values(LESSONS_DATA);

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Giáo Án Ngữ Pháp
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 block"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {lesson.level}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-3">
                {lesson.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Nhấn vào để xem chi tiết giáo án và giải thích ngữ pháp.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
