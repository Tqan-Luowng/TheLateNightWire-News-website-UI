import React, { useState } from 'react';

export default function Profile({ currentUser, onUpdateUser, onLogout, bookmarkedArticles, userArticles, onSelectArticle, showToast }) {
  const [activeTab, setActiveTab] = useState('pass'); // 'pass', 'bookmarks', 'my-wires', 'edit'
  const [editName, setEditName] = useState(currentUser?.fullName || '');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editDept, setEditDept] = useState(currentUser?.department || 'Bàn Tin Đêm');

  if (!currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'var(--font-mono)' }}>
        <p>Vui lòng đăng nhập để xem thông tin thẻ phóng viên.</p>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      fullName: editName,
      bio: editBio,
      department: editDept
    };

    onUpdateUser(updated);
    showToast('Đã cập nhật thông tin thẻ phóng viên thành công!');
    setActiveTab('pass');
  };

  return (
    <div className="profile-container">
      <div className="press-pass-wrapper">
        {/* Left Press Pass Badge Visual Card */}
        <div className="press-pass-card">
          <div className="avatar-large">
            {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'P'}
          </div>
          <h3 className="pass-name">{currentUser.fullName || currentUser.username}</h3>
          <p className="pass-role">{currentUser.role || 'Phóng Viên Bàn Đêm'}</p>
          <div className="stamp stamp--verified">✦ ĐÃ XÁC THỰC TOÀ SOẠN</div>

          <div className="pass-details-list">
            <div className="pass-detail-item">
              <span className="label">Mã Thẻ (ID):</span>
              <span className="val">{currentUser.pressId || 'WIRE-8842'}</span>
            </div>
            <div className="pass-detail-item">
              <span className="label">Bộ Phận:</span>
              <span className="val">{currentUser.department || 'Bàn Đêm'}</span>
            </div>
            <div className="pass-detail-item">
              <span className="label">Email:</span>
              <span className="val">{currentUser.email}</span>
            </div>
            <div className="pass-detail-item">
              <span className="label">Ngày Cấp Thẻ:</span>
              <span className="val">{currentUser.joinedDate || '05/08/2026'}</span>
            </div>
          </div>

          <button 
            className="wire-btn wire-btn--danger" 
            style={{ width: '100%', marginTop: '24px' }}
            onClick={onLogout}
          >
            🚪 Đăng Xuất Ra Ca
          </button>
        </div>

        {/* Right Content & Management Tabs */}
        <div className="profile-main-tabs">
          <div className="tabs-nav">
            <button 
              className={`tab-btn ${activeTab === 'pass' ? 'active' : ''}`}
              onClick={() => setActiveTab('pass')}
            >
              📜 Thông Tin Thẻ
            </button>
            <button 
              className={`tab-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookmarks')}
            >
              ★ Bài Viết Đã Lưu ({bookmarkedArticles.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'my-wires' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-wires')}
            >
              ✍️ Bài Đã Phát Hành ({userArticles.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              ⚙️ Chỉnh Sửa Hồ Sơ
            </button>
          </div>

          {activeTab === 'pass' && (
            <div>
              <h2 className="hero__headline" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
                Hồ Sơ Công Tác Phóng Viên
              </h2>
              <p style={{ color: 'var(--fog)', fontStyle: 'italic', marginBottom: '20px' }}>
                "{currentUser.bio || 'Chưa cập nhật phương châm làm báo.'}"
              </p>

              <div style={{ background: 'var(--ink)', padding: '20px', border: '1px solid var(--line)', borderRadius: '4px' }}>
                <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--brass)', margin: '0 0 10px' }}>
                  QUYỀN HẠN BẢN TIN:
                </h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--paper)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                  <li>Quyền viết và đăng tải bài viết trực tiếp lên Bàn Tin Đêm.</li>
                  <li>Xem các phân tích thị trường & chỉ số Wire-40 theo thời gian thực.</li>
                  <li>Lưu trữ không giới hạn các bản tin quan trọng.</li>
                  <li>Truy cập trực tiếp hệ thống kiểm duyệt tin tức toà soạn.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div>
              <h2 className="hero__headline" style={{ fontSize: '1.4rem', marginBottom: '16px' }}>
                Danh Sách Bài Viết Đã Lưu Trữ
              </h2>
              {bookmarkedArticles.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {bookmarkedArticles.map(art => (
                    <div 
                      key={art.id} 
                      style={{ background: 'var(--ink)', padding: '16px', border: '1px solid var(--line)', cursor: 'pointer' }}
                      onClick={() => onSelectArticle(art)}
                    >
                      <span className="card__eyebrow">{art.eyebrow || art.section}</span>
                      <h4 className="card__headline" style={{ fontSize: '1.1rem', margin: '4px 0' }}>{art.headline}</h4>
                      <p className="card__dek" style={{ fontSize: '0.85rem' }}>{art.dek}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--fog)', fontFamily: 'var(--font-mono)' }}>
                  Bạn chưa lưu bài viết nào. Hãy bấm "☆ Lưu Bài Viết" khi đọc tin!
                </p>
              )}
            </div>
          )}

          {activeTab === 'my-wires' && (
            <div>
              <h2 className="hero__headline" style={{ fontSize: '1.4rem', marginBottom: '16px' }}>
                Bài Báo Đã Phát Hành
              </h2>
              {userArticles.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {userArticles.map(art => (
                    <div 
                      key={art.id} 
                      style={{ background: 'var(--ink)', padding: '16px', border: '1px solid var(--line)', cursor: 'pointer' }}
                      onClick={() => onSelectArticle(art)}
                    >
                      <div className="stamp stamp--dev">{art.stamp || 'Đã phát hành'}</div>
                      <h4 className="card__headline" style={{ fontSize: '1.1rem', margin: '4px 0' }}>{art.headline}</h4>
                      <p className="card__dek" style={{ fontSize: '0.85rem' }}>{art.dek}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--fog)', fontFamily: 'var(--font-mono)' }}>
                  Bạn chưa đăng bài viết nào. Bấm nút "+ Viết Bài" ở góc thanh điều hướng để viết bài mới!
                </p>
              )}
            </div>
          )}

          {activeTab === 'edit' && (
            <form onSubmit={handleSaveProfile}>
              <h2 className="hero__headline" style={{ fontSize: '1.4rem', marginBottom: '16px' }}>
                Chỉnh Sửa Hồ Sơ Phóng Viên
              </h2>

              <div className="form-group">
                <label>Họ Và Tên</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Bộ Phận Công Tác</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={editDept}
                  onChange={(e) => setEditDept(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phương Châm Làm Báo / Giới Thiệu (Bio)</label>
                <textarea 
                  className="form-control" 
                  rows="3"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                />
              </div>

              <button type="submit" className="wire-btn" style={{ marginTop: '12px' }}>
                ✦ LƯU THAY ĐỔI HỒ SƠ
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
