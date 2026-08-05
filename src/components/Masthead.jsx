import React, { useState, useEffect } from 'react';

export default function Masthead({ currentUser, activePage, setActivePage, activeSection, setActiveSection, searchQuery, setSearchQuery, onOpenPublishModal }) {
  const [timeStr, setTimeStr] = useState('--:--:--');
  const [dateStr, setDateStr] = useState('—');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}:${ss}`);

      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      const d = now.getDate();
      const m = now.getMonth() + 1;
      const y = now.getFullYear();
      setDateStr(`${days[now.getDay()]}, ${d}/${m}/${y}`);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (sectionId) => {
    setActivePage('home');
    setActiveSection(sectionId);
    if (sectionId !== 'all') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="masthead">
      <div className="masthead__inner">
        <div className="masthead__mark" onClick={() => setActivePage('home')}>
          <span className="masthead__glyph">✦</span>
          <div>
            <p className="masthead__title">The Late Wire</p>
            <p className="masthead__tag">Night Desk Edition</p>
          </div>
        </div>

        <nav className="masthead__nav" aria-label="Chuyên mục chính">
          <button 
            className={activePage === 'home' && activeSection === 'lead' ? 'active' : ''} 
            onClick={() => handleNavClick('lead')}
          >
            Tin đầu
          </button>
          <button 
            className={activePage === 'home' && activeSection === 'desk' ? 'active' : ''} 
            onClick={() => handleNavClick('desk')}
          >
            Bàn tin
          </button>
          <button 
            className={activePage === 'home' && activeSection === 'markets' ? 'active' : ''} 
            onClick={() => handleNavClick('markets')}
          >
            Thị trường
          </button>
          <button 
            className={activePage === 'home' && activeSection === 'culture' ? 'active' : ''} 
            onClick={() => handleNavClick('culture')}
          >
            Văn hoá
          </button>
          {currentUser && (
            <button className="wire-btn wire-btn--secondary" style={{ padding: '2px 8px', fontSize: '0.7rem' }} onClick={onOpenPublishModal}>
              + Viết Bài
            </button>
          )}
        </nav>

        <div className="masthead__meta">
          <div className="masthead__clock-box">
            <p className="masthead__clock">{timeStr}</p>
            <p className="masthead__date">{dateStr}</p>
          </div>

          {currentUser ? (
            <div className="user-nav-badge" onClick={() => setActivePage('profile')} title="Xem Thẻ Phóng Viên / Hồ Sơ">
              <div className="user-avatar-small">
                {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="user-nav-name">{currentUser.fullName || currentUser.username}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className={`wire-btn wire-btn--secondary ${activePage === 'login' ? 'active' : ''}`}
                style={{ padding: '5px 12px', fontSize: '0.72rem' }}
                onClick={() => setActivePage('login')}
              >
                Đăng Nhập
              </button>
              <button 
                className={`wire-btn ${activePage === 'register' ? 'active' : ''}`}
                style={{ padding: '5px 12px', fontSize: '0.72rem' }}
                onClick={() => setActivePage('register')}
              >
                Đăng Ký
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
