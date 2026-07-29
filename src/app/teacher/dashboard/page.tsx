import Link from 'next/link';
import '../../globals.css';

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto glass-panel p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4">
          👨‍🏫 Bảng Điều Khiển Giáo Viên
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          Chào mừng bạn quay lại. Tại đây bạn có thể quản lý bài giảng, giao bài tập và chấm điểm học viên.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 hover:shadow-[0_4px_15px_rgba(255,152,0,0.4)] transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">📚 Quản lý Khóa học</h2>
            <p className="text-sm text-[var(--text-muted)]">Tạo bài học mới, đăng tải video và tài liệu PDF.</p>
          </div>
          
          <div className="glass-panel p-6 hover:shadow-[0_4px_15px_rgba(255,152,0,0.4)] transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">📝 Chấm điểm Bài tập</h2>
            <p className="text-sm text-[var(--text-muted)]">Xem và nhận xét các bài nộp của học viên.</p>
          </div>
          
          <div className="glass-panel p-6 hover:shadow-[0_4px_15px_rgba(255,152,0,0.4)] transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">👥 Quản lý Học viên</h2>
            <p className="text-sm text-[var(--text-muted)]">Xem tiến độ học tập và quản lý danh sách lớp.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[var(--primary-color)] hover:underline">
            Đăng xuất
          </Link>
        </div>
      </div>
    </div>
  );
}
