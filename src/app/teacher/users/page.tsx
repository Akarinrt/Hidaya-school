'use client';
import { useState, useEffect } from 'react';
import styles from './users.module.css';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterRole, setFilterRole] = useState('ALL');

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('STUDENT');
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, fullName, role })
      });
      if (res.ok) {
        setShowModal(false);
        setUsername(''); setPassword(''); setFullName('');
        fetchUsers();
      } else {
        const err = await res.json();
        alert("Lỗi: " + err.error);
      }
    } catch (error) {
      alert("Lỗi hệ thống");
    }
  };

  const filteredUsers = filterRole === 'ALL' ? users : users.filter(u => u.role === filterRole);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className="text-2xl font-bold">Quản lý Tài khoản</h1>
          <p className="text-gray-500">Thêm mới và quản lý Giáo viên / Học sinh</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>
          + Tạo tài khoản
        </button>
      </div>

      <div className={styles.filterBar}>
        <button className={filterRole === 'ALL' ? styles.activeFilter : ''} onClick={() => setFilterRole('ALL')}>Tất cả</button>
        <button className={filterRole === 'TEACHER' ? styles.activeFilter : ''} onClick={() => setFilterRole('TEACHER')}>Giáo viên</button>
        <button className={filterRole === 'STUDENT' ? styles.activeFilter : ''} onClick={() => setFilterRole('STUDENT')}>Học sinh</button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Họ Tên</th>
                <th>Username</th>
                <th>Vai trò</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td className="font-semibold">{u.fullName}</td>
                  <td>{u.username}</td>
                  <td>
                    <span className={u.role === 'TEACHER' ? styles.badgeTeacher : styles.badgeStudent}>
                      {u.role === 'TEACHER' ? 'Giáo viên' : 'Học sinh'}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Tạo tài khoản mới</h2>
            <form onSubmit={handleCreate}>
              <div className={styles.formGroup}>
                <label>Vai trò</label>
                <select value={role} onChange={e => setRole(e.target.value)}>
                  <option value="STUDENT">Học sinh</option>
                  <option value="TEACHER">Giáo viên</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Họ và Tên</label>
                <input required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Nhập họ tên đầy đủ..." />
              </div>
              <div className={styles.formGroup}>
                <label>Tên đăng nhập (Username)</label>
                <input required value={username} onChange={e => setUsername(e.target.value)} placeholder="Viết liền không dấu..." />
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu..." />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className={styles.btnPrimary}>Tạo ngay</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
