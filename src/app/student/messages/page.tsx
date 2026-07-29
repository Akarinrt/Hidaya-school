'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './messages.module.css';

type Message = { id: string; content: string; senderId: string; createdAt: string; sender: { fullName: string; role: string } };

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [myId, setMyId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setMyId(data.myId);
      }
    } catch {}
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!newMsg.trim() || sending) return;
    setSending(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMsg }),
      });
      setNewMsg('');
      await fetchMessages();
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>👩‍🏫</div>
        <div>
          <div className={styles.name}>Giáo viên Hồng Khuông</div>
          <div className={styles.status}>🟢 Trực tuyến</div>
        </div>
      </div>

      <div className={styles.chatBox}>
        {messages.length === 0 && (
          <div className={styles.empty}>Chưa có tin nhắn. Bắt đầu trò chuyện với giáo viên!</div>
        )}
        {messages.map(msg => {
          const isMe = msg.senderId === myId;
          return (
            <div key={msg.id} className={`${styles.bubble} ${isMe ? styles.mine : styles.theirs}`}>
              <div className={styles.bubbleContent}>{msg.content}</div>
              <div className={styles.bubbleMeta}>
                {!isMe && <span className={styles.senderName}>{msg.sender.fullName}</span>}
                <span className={styles.time}>
                  {new Date(msg.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputArea}>
        <textarea
          className={styles.input}
          placeholder="Nhập tin nhắn... (Enter để gửi)"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          onKeyDown={handleKey}
          rows={2}
        />
        <button onClick={send} disabled={sending || !newMsg.trim()} className={styles.sendBtn}>
          {sending ? '...' : '➤'}
        </button>
      </div>
    </div>
  );
}
