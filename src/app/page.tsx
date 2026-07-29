'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(data.role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard');
      } else {
        setError(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch {
      setError('Không thể kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (u: string, p: string) => { setUsername(u); setPassword(p); };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoRow}>
          <div className={styles.logoIcon}>🌸</div>
          <div>
            <div className={styles.logoName}>Hidaya School</div>
            <div className={styles.logoSub}>Nền tảng học tiếng Nhật online</div>
          </div>
        </div>

        <div className={styles.heading}>Đăng nhập</div>
        <div className={styles.subheading}>Chào mừng bạn quay lại!</div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Tên đăng nhập</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Mật khẩu</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>⚠ {error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập →'}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>Tài khoản demo</span>
          <span className={styles.dividerLine}></span>
        </div>

        <div className={styles.demoAccounts}>
          <button onClick={() => quickLogin('teacher', 'teacher123')} className={styles.demoBtn}>
            <span className={styles.demoIcon}>👩‍🏫</span>
            <div>
              <div className={styles.demoName}>Giáo viên</div>
              <div className={styles.demoDesc}>teacher / teacher123</div>
            </div>
            <span className={styles.demoArrow}>→</span>
          </button>
          <button onClick={() => quickLogin('student', 'student123')} className={styles.demoBtn}>
            <span className={styles.demoIcon}>👨‍🎓</span>
            <div>
              <div className={styles.demoName}>Học viên</div>
              <div className={styles.demoDesc}>student / student123</div>
            </div>
            <span className={styles.demoArrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
