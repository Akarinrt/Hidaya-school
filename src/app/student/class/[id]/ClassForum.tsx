'use client';

import { useState, useEffect } from 'react';

export default function ClassForum({ classId, currentUser }: { classId: string, currentUser: any }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [commentContents, setCommentContents] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPosts();
  }, [classId]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/class-posts?classId=${classId}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const res = await fetch('/api/class-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId, content: newPostContent })
      });
      if (res.ok) {
        setNewPostContent('');
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateComment = async (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const content = commentContents[postId];
    if (!content?.trim()) return;

    try {
      const res = await fetch(`/api/class-posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      if (res.ok) {
        setCommentContents({ ...commentContents, [postId]: '' });
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Đang tải diễn đàn...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>✍️ Tạo bài viết mới</h3>
        <form onSubmit={handleCreatePost}>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Bạn có câu hỏi gì không? Hãy chia sẻ với lớp nhé..."
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', minHeight: '100px', marginBottom: '15px', background: 'var(--surface-hover)' }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '10px 25px', borderRadius: '25px', border: 'none', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,82,204,0.3)' }}>
              Đăng bài
            </button>
          </div>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map(post => (
          <div key={post.id} className="card" style={{ padding: '20px', borderLeft: post.author.role === 'TEACHER' ? '4px solid var(--danger)' : '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: post.author.role === 'TEACHER' ? 'var(--danger)' : 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {post.author.fullName.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: post.author.role === 'TEACHER' ? 'var(--danger)' : 'var(--text)' }}>
                  {post.author.fullName} {post.author.role === 'TEACHER' && '🎓'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {new Date(post.createdAt).toLocaleString('vi-VN')}
                </div>
              </div>
            </div>
            
            <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {post.comments.map((cmt: any) => (
                <div key={cmt.id} style={{ display: 'flex', gap: '10px', background: 'var(--surface-hover)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: cmt.author.role === 'TEACHER' ? 'var(--danger)' : 'var(--border)', color: cmt.author.role === 'TEACHER' ? 'white' : 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>
                    {cmt.author.fullName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: cmt.author.role === 'TEACHER' ? 'var(--danger)' : 'var(--text)' }}>
                      {cmt.author.fullName}
                    </div>
                    <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}>{cmt.content}</div>
                  </div>
                </div>
              ))}

              <form onSubmit={(e) => handleCreateComment(post.id, e)} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Viết bình luận..."
                  value={commentContents[post.id] || ''}
                  onChange={(e) => setCommentContents({ ...commentContents, [post.id]: e.target.value })}
                  style={{ flex: 1, padding: '10px 15px', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--surface)' }}
                  required
                />
                <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', padding: '0 10px' }}>Gửi</button>
              </form>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
            Chưa có bài viết nào. Hãy là người đầu tiên thảo luận!
          </div>
        )}
      </div>
    </div>
  );
}
