import React, { useState } from 'react';

export default function Login({ onLoginSuccess, setActivePage, showToast }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.');
      return;
    }

    // Check saved users in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('wire_registered_users') || '[]');
    const foundUser = savedUsers.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() || u.email.toLowerCase() === username.trim().toLowerCase()
    );

    let userToLogin = null;
    if (foundUser) {
      if (foundUser.password !== password) {
        setError('Mật khẩu không chính xác.');
        return;
      }
      userToLogin = foundUser;
    } else {
      // Default demo account login
      userToLogin = {
        username: username.trim(),
        fullName: username.trim() === 'bandem' ? 'Bàn Đêm Reporter' : username.trim(),
        email: `${username.trim()}@thelatewire.vn`,
        role: 'Phóng Viên Bàn Đêm',
        department: 'Bàn Tin Đêm',
        pressId: `WIRE-${Math.floor(1000 + Math.random() * 9000)}`,
        joinedDate: '05/08/2026',
        bio: 'Nhà báo trực ca đêm tại toà soạn The Late Wire.'
      };
    }

    onLoginSuccess(userToLogin);
    showToast(`Đăng nhập thành công! Chào mừng ${userToLogin.fullName || userToLogin.username}`);
  };

  const handleDemoFill = (type) => {
    if (type === 'reporter') {
      setUsername('bandem');
      setPassword('wire123');
    } else {
      setUsername('tongbientap');
      setPassword('admin123');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="stamp stamp--brass" style={{ display: 'block', width: 'max-content', margin: '0 auto 12px' }}>
          ✦ CỔNG ĐĂNG NHẬP THẺ PHÓNG VIÊN
        </div>
        
        <div className="auth-header">
          <h1>Toà Soạn Bàn Đêm</h1>
          <p>Xác thực quyền truy cập hệ thống phát hành bản tin</p>
        </div>

        {error && <div className="error-text" style={{ textAlign: 'center', marginBottom: '16px' }}>⚠️ {error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Tên Đăng Nhập / Email Phóng Viên</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập username hoặc email..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật Khẩu Mật Mã</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="wire-btn" style={{ width: '100%', marginTop: '12px' }}>
            ✦ ĐĂNG NHẬP BÀN TRỰC
          </button>
        </form>

        <div className="demo-account-box">
          <p>Dùng Thử Tài Khoản Mẫu Nhanh:</p>
          <div className="demo-btn-group">
            <button type="button" className="demo-btn" onClick={() => handleDemoFill('reporter')}>
              Phóng Viên Bàn Đêm
            </button>
            <button type="button" className="demo-btn" onClick={() => handleDemoFill('editor')}>
              Tổng Biên Tập
            </button>
          </div>
        </div>

        <div className="auth-footer">
          Chưa có thẻ phóng viên? 
          <a href="#register" onClick={(e) => { e.preventDefault(); setActivePage('register'); }}>
            Đăng ký thẻ mới tại đây
          </a>
        </div>
      </div>
    </div>
  );
}
