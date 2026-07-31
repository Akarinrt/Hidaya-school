'use client';

import { useState } from 'react';

interface CopyLinkButtonProps {
  path: string;
  label?: string;
  style?: React.CSSProperties;
}

export default function CopyLinkButton({ path, label = 'Copy Link', style }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Build full absolute URL
    const fullUrl = `${window.location.origin}${path}`;
    
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback if clipboard API is blocked
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e2) {
        alert('Không thể tự động copy. Hãy copy link này: ' + fullUrl);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: '5px 12px',
        fontSize: '13px',
        fontWeight: 'bold',
        background: copied ? '#4caf50' : 'var(--primary-light)',
        color: copied ? 'white' : 'var(--primary)',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        ...style
      }}
    >
      <span>{copied ? '✓ Đã copy!' : `🔗 ${label}`}</span>
    </button>
  );
}
