'use client';

import { useState, useEffect } from 'react';
import styles from './students.module.css';

export default function ClassManager({ currentUser, initialStudents }: { currentUser: any, initialStudents: any[] }) {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'attendance'>('info');

  const fetchClasses = async () => {
    const res = await fetch(`/api/classes?teacherId=${currentUser.id}`);
    const data = await res.json();
    setClasses(data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateClass = async () => {
    const name = prompt('Nhập tên lớp mới:');
    if (name) {
      await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: '', teacherId: currentUser.id })
      });
      fetchClasses();
    }
  };

  const handleSelectClass = async (cls: any) => {
    const res = await fetch(`/api/classes/${cls.id}`);
    const data = await res.json();
    setSelectedClass(data);
    setActiveTab('info');
  };

  const handleAddStudent = async () => {
    if (!selectedClass) return;
    const studentId = prompt('Nhập ID Học viên để thêm vào lớp: (Trong thực tế sẽ là menu thả xuống)');
    if (studentId) {
      await fetch(`/api/classes/${selectedClass.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId })
      });
      handleSelectClass(selectedClass); // refresh
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
      {/* Sidebar: Danh sách lớp */}
      <div style={{ width: '250px', borderRight: '1px solid var(--border)', paddingRight: '20px' }}>
        <h3>🏫 Danh sách Lớp</h3>
        <button onClick={handleCreateClass} style={{ width: '100%', padding: '10px', marginBottom: '15px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>+ Tạo lớp mới</button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {classes.map(c => (
            <div 
              key={c.id} 
              onClick={() => handleSelectClass(c)}
              style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', background: selectedClass?.id === c.id ? 'var(--surface-hover)' : 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <strong>{c.name}</strong>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c._count?.students || 0} Học viên</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main: Chi tiết lớp */}
      <div style={{ flex: 1 }}>
        {!selectedClass ? (
          <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
            Hãy chọn một lớp học để xem chi tiết
          </div>
        ) : (
          <div>
            <h2>{selectedClass.name}</h2>
            <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '20px' }}>
              <button 
                onClick={() => setActiveTab('info')}
                style={{ padding: '8px 16px', background: activeTab === 'info' ? 'var(--primary)' : 'transparent', color: activeTab === 'info' ? 'white' : 'var(--text-main)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >Danh sách & Liên kết</button>
              <button 
                onClick={() => setActiveTab('attendance')}
                style={{ padding: '8px 16px', background: activeTab === 'attendance' ? 'var(--primary)' : 'transparent', color: activeTab === 'attendance' ? 'white' : 'var(--text-main)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >Điểm danh</button>
            </div>

            {activeTab === 'info' && (
              <div>
                <button onClick={handleAddStudent} style={{ padding: '10px 20px', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}>+ Thêm học sinh</button>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-hover)', textAlign: 'left' }}>
                      <th style={{ padding: '10px' }}>Họ Tên</th>
                      <th style={{ padding: '10px' }}>Username</th>
                      <th style={{ padding: '10px' }}>Liên hệ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClass.students?.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: '10px', textAlign: 'center' }}>Chưa có học sinh nào</td></tr>
                    ) : (
                      selectedClass.students?.map((enr: any) => (
                        <tr key={enr.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '10px' }}>
                            <a href={`/teacher/students/${enr.student.id}`} style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                              {enr.student.fullName}
                            </a>
                          </td>
                          <td style={{ padding: '10px' }}>@{enr.student.username}</td>
                          <td style={{ padding: '10px' }}>{enr.student.email || 'Chưa cập nhật'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'attendance' && (
              <AttendanceGrid classId={selectedClass.id} students={selectedClass.students?.map((e: any) => e.student) || []} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Attendance Component (Inner)
function AttendanceGrid({ classId, students }: { classId: string, students: any[] }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<Record<string, string>>({}); // studentId -> status

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await fetch(`/api/attendance?classId=${classId}&date=${date}`);
      const data = await res.json();
      const loaded: Record<string, string> = {};
      data.forEach((a: any) => {
        loaded[a.studentId] = a.status;
      });
      // Default rest to PRESENT
      students.forEach(s => {
        if (!loaded[s.id]) loaded[s.id] = 'PRESENT';
      });
      setRecords(loaded);
    };
    fetchAttendance();
  }, [classId, date, students]);

  const handleStatusChange = (studentId: string, status: string) => {
    setRecords(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    const attendances = Object.entries(records).map(([studentId, status]) => ({ studentId, status }));
    await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classId, date, attendances })
    });
    alert('Đã lưu điểm danh thành công!');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <label>
          Ngày điểm danh: 
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }} />
        </label>
        <button onClick={handleSave} style={{ padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>💾 Lưu dữ liệu</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ background: 'var(--surface-hover)' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Học viên</th>
            <th style={{ padding: '10px' }}>Có mặt (✅)</th>
            <th style={{ padding: '10px' }}>Đi muộn (⏰)</th>
            <th style={{ padding: '10px' }}>Vắng (❌)</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px', textAlign: 'left' }}>{s.fullName}</td>
              <td style={{ padding: '10px' }}>
                <input type="radio" name={`att-${s.id}`} checked={records[s.id] === 'PRESENT'} onChange={() => handleStatusChange(s.id, 'PRESENT')} />
              </td>
              <td style={{ padding: '10px' }}>
                <input type="radio" name={`att-${s.id}`} checked={records[s.id] === 'LATE'} onChange={() => handleStatusChange(s.id, 'LATE')} />
              </td>
              <td style={{ padding: '10px' }}>
                <input type="radio" name={`att-${s.id}`} checked={records[s.id] === 'ABSENT'} onChange={() => handleStatusChange(s.id, 'ABSENT')} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
