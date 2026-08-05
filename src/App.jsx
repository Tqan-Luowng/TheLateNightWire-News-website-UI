import { useState, useEffect, useCallback } from 'react';

import Masthead from './components/Masthead';
import Ticker from './components/Ticker';
import Markets from './components/Markets';
import ArticleModal from './components/ArticleModal';
import PublishModal from './components/PublishModal';
import Toast from './components/Toast';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import { INITIAL_ARTICLES } from './data/mockArticles';

function Footer() {
  const [edNo] = useState(() => String(Math.floor(100 + Math.random() * 900)).padStart(4, '0'));
  return (
    <footer className="colophon">
      <div className="colophon__inner">
        <p className="colophon__mark">The Late Wire</p>
        <p className="colophon__line">
          Bản in thử nghiệm · Ấn bản Bàn Đêm · Không dùng cho mục đích đưa tin thật
        </p>
        <p className="colophon__wire">
          WIRE/EDITION №<span id="editionNo">{edNo}</span>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  /* ── Page routing ── */
  const [activePage, setActivePage] = useState('home'); // 'home' | 'login' | 'register' | 'profile'
  const [activeSection, setActiveSection] = useState('lead');

  /* ── Auth ── */
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('wire_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  /* ── Articles ── */
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [userArticles, setUserArticles] = useState([]);

  /* ── Article modal ── */
  const [selectedArticle, setSelectedArticle] = useState(null);

  /* ── Bookmarks ── */
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wire_bookmarks') || '[]');
    } catch { return []; }
  });

  /* ── Publish modal ── */
  const [publishOpen, setPublishOpen] = useState(false);

  /* ── Search ── */
  const [searchQuery, setSearchQuery] = useState('');

  /* ── Toast ── */
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  /* ── Persist user & bookmarks ── */
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('wire_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('wire_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('wire_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  /* ── Auth handlers ── */
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActivePage('home');
  };

  const handleRegisterSuccess = (user) => {
    setCurrentUser(user);
    setActivePage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage('home');
    showToast('Đã đăng xuất. Hẹn gặp lại ca trực tiếp theo!');
  };

  const handleUpdateUser = (updated) => {
    setCurrentUser(updated);
    // Also update in the registered users list
    const savedUsers = JSON.parse(localStorage.getItem('wire_registered_users') || '[]');
    const idx = savedUsers.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      savedUsers[idx] = updated;
      localStorage.setItem('wire_registered_users', JSON.stringify(savedUsers));
    }
  };

  /* ── Bookmark handler ── */
  const handleBookmark = (article) => {
    setBookmarkedIds(prev => {
      if (prev.includes(article.id)) {
        showToast('Đã bỏ lưu bài viết.');
        return prev.filter(id => id !== article.id);
      } else {
        showToast('✦ Đã lưu bài viết vào hồ sơ!');
        return [...prev, article.id];
      }
    });
  };

  const bookmarkedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  /* ── Publish handler ── */
  const handlePublish = (newArticle) => {
    setArticles(prev => [newArticle, ...prev]);
    setUserArticles(prev => [newArticle, ...prev]);
    showToast(`✦ Bài viết "${newArticle.headline.slice(0, 30)}..." đã được phát hành!`);
  };

  /* ── Render pages ── */
  const renderPage = () => {
    switch (activePage) {
      case 'login':
        return (
          <Login
            onLoginSuccess={handleLoginSuccess}
            setActivePage={setActivePage}
            showToast={showToast}
          />
        );
      case 'register':
        return (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            setActivePage={setActivePage}
            showToast={showToast}
          />
        );
      case 'profile':
        return (
          <Profile
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
            bookmarkedArticles={bookmarkedArticles}
            userArticles={userArticles}
            onSelectArticle={setSelectedArticle}
            showToast={showToast}
          />
        );
      default:
        return (
          <>
            <Home
              articles={articles}
              onSelectArticle={setSelectedArticle}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Markets />
          </>
        );
    }
  };

  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Sticky header */}
      <Masthead
        currentUser={currentUser}
        activePage={activePage}
        setActivePage={setActivePage}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenPublishModal={() => {
          if (!currentUser) {
            showToast('Vui lòng đăng nhập để viết bài.');
            setActivePage('login');
          } else {
            setPublishOpen(true);
          }
        }}
      />

      {/* Breaking news ticker */}
      <Ticker />

      {/* Page content */}
      {renderPage()}

      {/* Footer */}
      <Footer />

      {/* Article reading modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onBookmark={handleBookmark}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        showToast={showToast}
      />

      {/* Publish article modal */}
      <PublishModal
        isOpen={publishOpen}
        onClose={() => setPublishOpen(false)}
        onPublish={handlePublish}
        currentUser={currentUser}
      />

      {/* Toast notifications */}
      <Toast message={toastMessage} onClear={() => setToastMessage('')} />
    </>
  );
}
