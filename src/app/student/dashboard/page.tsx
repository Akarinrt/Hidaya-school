import Link from 'next/link';
import '../../globals.css';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto glass-panel p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4">
          🎓 Góc Học Tập
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          Chào mừng bạn! Hãy tiếp tục hành trình chinh phục tiếng Nhật của mình.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 hover:shadow-[0_4px_15px_rgba(255,152,0,0.4)] transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">▶️ Video Bài Giảng</h2>
            <p className="text-sm text-[var(--text-muted)]">Xem lại các video bài học cũ và mới nhất.</p>
          </div>
          
          <div className="glass-panel p-6 hover:shadow-[0_4px_15px_rgba(255,152,0,0.4)] transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">✍️ Nộp Bài Tập</h2>
            <p className="text-sm text-[var(--text-muted)]">Làm bài tập trắc nghiệm hoặc upload ảnh vở bài tập.</p>
          </div>
          
          <div className="glass-panel p-6 hover:shadow-[0_4px_15px_rgba(255,152,0,0.4)] transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">📥 Tài Liệu (PDF)</h2>
            <p className="text-sm text-[var(--text-muted)]">Tải xuống giáo án và tài liệu ôn tập N5/N4.</p>
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
