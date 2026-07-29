import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ClassResourcesPage({ params }: { params: any }) {
  const { id } = await params;

  const resources = await prisma.resource.findMany({
    where: { classId: id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>📚 Kho Tài liệu</h2>
      
      {resources.length === 0 ? (
        <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Chưa có tài liệu nào được chia sẻ trong lớp này.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {resources.map(res => {
            let icon = '📎';
            if (res.type === 'PDF') icon = '📕';
            if (res.type === 'AUDIO') icon = '🎧';

            return (
              <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="card hover-scale" style={{ padding: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '30px' }}>{icon}</div>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-main)', fontSize: '16px' }}>{res.title}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {res.createdAt.toLocaleDateString()} • {res.type}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
