import React, { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { id: 'lead',    label: 'Tin Đầu',    icon: '◈' },
  { id: 'desk',    label: 'Bàn Tin',    icon: '◉' },
  { id: 'markets', label: 'Thị Trường', icon: '▲' },
  { id: 'culture', label: 'Văn Hoá',    icon: '✦' },
];

export default function Navbar({
  activePage,
  setActivePage,
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
  currentUser,
  onOpenPublishModal,
}) {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const menuRef   = useRef(null);

  /* Close mobile menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Focus search input when it opens */
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleNavClick = (sectionId) => {
    setActivePage('home');
    setActiveSection(sectionId);
    setMenuOpen(false);
    if (sectionId !== 'all') {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const isActive = (id) => activePage === 'home' && activeSection === id;

  return (
    <nav className="navbar" aria-label="Điều hướng chính" ref={menuRef}>
      <div className="navbar__inner">

        {/* Left: section links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ id, label, icon }) => (
            <li key={id}>
              <button
                className={`navbar__link${isActive(id) ? ' navbar__link--active' : ''}`}
                onClick={() => handleNavClick(id)}
                aria-current={isActive(id) ? 'page' : undefined}
              >
                <span className="navbar__link-icon" aria-hidden="true">{icon}</span>
                <span className="navbar__link-label">{label}</span>
                {isActive(id) && <span className="navbar__link-bar" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: search + publish */}
        <div className="navbar__actions">
          <div className={`navbar__search${searchOpen ? ' navbar__search--open' : ''}`}>
            <button
              className="navbar__search-toggle"
              aria-label={searchOpen ? 'Đóng tìm kiếm' : 'Mở tìm kiếm'}
              onClick={() => {
                setSearchOpen((o) => !o);
                if (searchOpen) setSearchQuery('');
              }}
            >
              {searchOpen ? '✕' : '⌕'}
            </button>
            {searchOpen && (
              <input
                ref={searchRef}
                type="search"
                className="navbar__search-input"
                placeholder="Tìm bài viết…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setActivePage('home');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                aria-label="Tìm kiếm bài viết"
              />
            )}
          </div>

          {currentUser && (
            <button
              className="navbar__publish-btn"
              onClick={onOpenPublishModal}
              title="Viết bài mới"
            >
              <span aria-hidden="true">+</span> Viết Bài
            </button>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="navbar__drawer" role="dialog" aria-label="Menu điều hướng">
          <ul className="navbar__drawer-links" role="list">
            {NAV_LINKS.map(({ id, label, icon }) => (
              <li key={id}>
                <button
                  className={`navbar__drawer-link${isActive(id) ? ' navbar__drawer-link--active' : ''}`}
                  onClick={() => handleNavClick(id)}
                >
                  <span className="navbar__drawer-icon" aria-hidden="true">{icon}</span>
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="navbar__drawer-bottom">
            <input
              type="search"
              className="navbar__drawer-search"
              placeholder="Tìm bài viết…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) { setActivePage('home'); setMenuOpen(false); }
              }}
              aria-label="Tìm kiếm bài viết"
            />
            {currentUser && (
              <button
                className="wire-btn"
                style={{ width: '100%', marginTop: '12px' }}
                onClick={() => { onOpenPublishModal(); setMenuOpen(false); }}
              >
                + Viết Bài Mới
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
