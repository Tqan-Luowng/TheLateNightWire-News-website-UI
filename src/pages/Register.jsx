import React, { useState } from 'react';

export default function Register({ onRegisterSuccess, setActivePage, showToast }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Phóng Viên Bàn Đêm');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }

    // Check existing users
    const existingUsers = JSON.parse(localStorage.getItem('wire_registered_users') || '[]');
    if (existingUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      setError('Tên đăng nhập này đã được sử dụng!');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      fullName,
      username,
      email,
      password,
      role,
      department: role === 'Phóng Viên Bàn Đêm' ? 'Bàn Tin Đêm' : (role === 'Tổng Biên Tập' ? 'Ban Biên Tập' : 'Độc Giả Trực'),
      pressId: `WIRE-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: new Date().toLocaleDateString('vi-VN'),
      bio: bio || 'Thành viên mới của toà soạn The Late Wire.'
    };

    // Save user list
    existingUsers.push(newUser);
    localStorage.setItem('wire_registered_users', JSON.stringify(existingUsers));

    onRegisterSuccess(newUser);
    showToast(`Đăng ký thành công! Đã cấp Thẻ Phóng Viên: ${newUser.pressId}`);
  };

  return (
    <div className="auth-container" style={{ maxWidth: '560px' }}>
      <div className="auth-card">
        <div className="stamp stamp--urgent" style={{ display: 'block', width: 'max-content', margin: '0 auto 12px' }}>
          ✦ ĐĂNG KÝ THẺ PHÓNG VIÊN MỚI
        </div>

        <div className="auth-header">
          <h1>Đăng Ký Thẻ Ban Đêm</h1>
          <p>Tạo hồ sơ phóng viên hoặc biên tập viên trực thuộc The Late Wire</p>
        </div>

        {error && <div className="error-text" style={{ textAlign: 'center', marginBottom: '16px' }}>⚠️ {error}</div>}

        <form onSubmit={handleRegister}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Họ Và Tên Báo Chí</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Tên Đăng Nhập (Username)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="vanya_wire"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Toà Soạn / Cá Nhân</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="reporter@thelatewire.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Chức Danh / Vị Trí Công Tác</label>
            <select 
              className="form-control" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Phóng Viên Bàn Đêm">Phóng Viên Bàn Đêm</option>
              <option value="Tổng Biên Tập">Tổng Biên Tập Toà Soạn</option>
              <option value="Nhà Phân Tích Thị Trường">Nhà Phân Tích Thị Trường</option>
              <option value="Độc Giả Thân Thiết">Độc Giả Thân Thiết</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Mật Khẩu</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Ít nhất 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Xác Nhận Mật Khẩu</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Giới Thiệu Ngắn (Motto / Bio)</label>
            <textarea 
              className="form-control" 
              rows="2"
              placeholder="Đôi dòng về phong cách đưa tin của bạn..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button type="submit" className="wire-btn" style={{ width: '100%', marginTop: '12px' }}>
            ✦ XÁC NHẬN ĐĂNG KÝ THẺ PHÓNG VIÊN
          </button>
        </form>

        <div className="auth-footer">
          Đã có thẻ phóng viên? 
          <a href="#login" onClick={(e) => { e.preventDefault(); setActivePage('login'); }}>
            Đăng nhập tại đây
          </a>
        </div>
      </div>
    </div>
  );
}
