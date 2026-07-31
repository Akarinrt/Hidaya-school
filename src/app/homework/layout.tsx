export default function HomeworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {children}
    </div>
  );
}
