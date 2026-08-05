import React from 'react';

export default function ArticleModal({ article, onClose, onBookmark, isBookmarked, showToast }) {
  if (!article) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {article.stamp && (
          <div className={`stamp ${article.stampClass || ''}`}>{article.stamp}</div>
        )}
        <p className="hero__eyebrow">{article.eyebrow || article.section}</p>
        <h2 className="hero__headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
          {article.headline}
        </h2>

        <div className="byline" style={{ marginBottom: '20px' }}>
          <span>Tác giả: <strong>{article.author}</strong></span>
          <span className="byline__sep">—</span>
          <span>{article.minsAgo ? `${article.minsAgo} phút trước` : 'Mới cập nhật'}</span>
        </div>

        <p className="hero__dek" style={{ fontStyle: 'italic', marginBottom: '24px', color: 'var(--paper)' }}>
          {article.dek}
        </p>

        <div style={{ fontSize: '0.98rem', lineHeight: '1.7', color: '#d8d2c0', whiteSpace: 'pre-line', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
          {article.content || article.dek}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
          <button 
            className={`wire-btn ${isBookmarked ? 'wire-btn--secondary' : ''}`}
            onClick={() => onBookmark(article)}
          >
            {isBookmarked ? '★ Đã Lưu Bài' : '☆ Lưu Bài Viết'}
          </button>
          
          <button className="wire-btn wire-btn--secondary" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            showToast('Đã sao chép liên kết bài viết!');
          }}>
            📋 Chia Sẻ
          </button>
        </div>
      </div>
    </div>
  );
}
