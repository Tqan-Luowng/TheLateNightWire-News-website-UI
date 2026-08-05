import React, { useState, useEffect } from 'react';

const BASE_HEADLINES = [
  'THỊ TRƯỜNG CHÂU Á MỞ CỬA TRONG SẮC XANH NHẠT',
  'HỘI NGHỊ KHÍ HẬU KÉO DÀI THÊM MỘT PHIÊN ĐÀM PHÁN',
  'CÔNG BỐ CHIP SUY LUẬN THẾ HỆ MỚI, TIẾT KIỆM NĂNG LƯỢNG 40%',
  'LIÊN HOAN PHIM ĐỘC LẬP KHÉP LẠI VỚI GIẢI THƯỞNG BẤT NGỜ',
  'BA THÀNH PHỐ CẢNG KÝ THOẢ THUẬN LƯỚI ĐIỆN GIÓ NGOÀI KHƠI',
  'THỬ NGHIỆM LIỆU PHÁP GENE GĐ.II ĐẠT KẾT QUẢ ĐẦY HỨA HẸN',
];

export default function Ticker() {
  const [timeLabel, setTimeLabel] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setTimeLabel(`PHÁT HÀNH LÚC ${hh}:${mm} — BÀN ĐÊM ĐANG TRỰC`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const items = [timeLabel, ...BASE_HEADLINES];
  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="ticker" role="marquee" aria-label="Bản tin nhanh">
      <div className="ticker__track">
        {allItems.map((item, i) => (
          <React.Fragment key={i}>
            <span>{item}</span>
            <span className="ticker__dot">●</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
