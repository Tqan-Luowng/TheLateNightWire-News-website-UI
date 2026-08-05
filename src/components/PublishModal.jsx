import React, { useState } from 'react';

export default function PublishModal({ isOpen, onClose, onPublish, currentUser }) {
  const [headline, setHeadline] = useState('');
  const [section, setSection] = useState('Bàn tin');
  const [dek, setDek] = useState('');
  const [content, setContent] = useState('');
  const [stamp, setStamp] = useState('Đang cập nhật');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!headline || !dek) return;

    const newArticle = {
      id: `wire-user-${Date.now()}`,
      category: 'desk',
      section: section,
      stamp: stamp,
      stampClass: stamp === 'Tin nóng' ? 'stamp--urgent' : 'stamp--dev',
      eyebrow: `Wire ${Math.floor(100 + Math.random() * 900)} · ${section}`,
      headline: headline,
      dek: dek,
      content: content || dek,
      author: currentUser ? currentUser.fullName || currentUser.username : 'Phóng Viên Trực Đêm',
      minsAgo: 0
    };

    onPublish(newArticle);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="stamp stamp--brass">TOÀ SOẠN BÀN ĐÊM</div>
        <h2 className="hero__headline" style={{ fontSize: '1.6rem', marginBottom: '20px' }}>
          Phát Hành Bài Viết Mới
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tiêu Đề Bài Báo (Headline)</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập tiêu đề phát hành..."
              value={headline} 
              onChange={(e) => setHeadline(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Chuyên Mục</label>
            <select 
              className="form-control" 
              value={section} 
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="Bàn tin">Bàn tin</option>
              <option value="Đối ngoại">Đối ngoại</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Thị trường">Thị trường</option>
              <option value="Văn hoá & Đời sống">Văn hoá & Đời sống</option>
              <option value="Khoa học">Khoa học</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nhãn Phát Hành (Stamp)</label>
            <select 
              className="form-control" 
              value={stamp} 
              onChange={(e) => setStamp(e.target.value)}
            >
              <option value="Đang cập nhật">Đang cập nhật</option>
              <option value="Tin nóng">Tin nóng</option>
              <option value="Đặc biệt">Đặc biệt</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tóm Tắt (Dek)</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Nội dung ngắn hiển thị trên trang chủ..."
              value={dek} 
              onChange={(e) => setDek(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Nội Dung Chi Tiết</label>
            <textarea 
              className="form-control" 
              rows="5" 
              placeholder="Chi tiết bản tin..."
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="wire-btn wire-btn--secondary" onClick={onClose}>Huỷ</button>
            <button type="submit" className="wire-btn">✦ Phát Hành Ngay</button>
          </div>
        </form>
      </div>
    </div>
  );
}
