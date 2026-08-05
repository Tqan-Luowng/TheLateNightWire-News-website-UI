import React, { useState, useEffect } from 'react';

const MARKET_BASE = [
  { label: 'Chỉ số Wire-40', base: 1284.6, dir: 'up' },
  { label: 'Vàng / oz',      base: 2041.2, dir: 'down' },
  { label: 'Dầu Brent',      base: 78.4,   dir: 'up' },
  { label: 'USD/VND',        base: 25410,   dir: 'flat' },
  { label: 'Trái phiếu 10Y', base: 4.12,   dir: 'down', suffix: '%' },
];

function jitter(val, pct = 0.002) {
  return +(val * (1 + (Math.random() - 0.5) * 2 * pct)).toFixed(
    val > 1000 ? 1 : val > 10 ? 2 : 3
  );
}

export default function Markets() {
  const [data, setData] = useState(MARKET_BASE.map(m => ({ ...m, value: m.base })));

  useEffect(() => {
    const id = setInterval(() => {
      setData(prev =>
        prev.map(m => {
          const next = jitter(m.value);
          const delta = next - m.base;
          const dir = Math.abs(delta) < m.base * 0.0003 ? 'flat' : delta > 0 ? 'up' : 'down';
          return { ...m, value: next, dir };
        })
      );
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const fmt = (item) => {
    const arrow = item.dir === 'up' ? '▲' : item.dir === 'down' ? '▼' : '—';
    const num = item.value.toLocaleString('vi-VN');
    return `${arrow} ${num}${item.suffix || ''}`;
  };

  return (
    <section className="markets" id="markets" aria-label="Chỉ số thị trường">
      <div className="markets__inner">
        {data.map(item => (
          <div className="markets__item" key={item.label}>
            <span className="markets__label">{item.label}</span>
            <span className={`markets__value markets__value--${item.dir}`}>
              {fmt(item)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
