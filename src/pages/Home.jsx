import React, { useState, useEffect } from 'react';

function RelativeTime({ minsAgo }) {
  const [mins, setMins] = useState(minsAgo || 0);

  useEffect(() => {
    if (!minsAgo && minsAgo !== 0) return;
    const id = setInterval(() => setMins(m => m + 1), 60000);
    return () => clearInterval(id);
  }, [minsAgo]);

  if (mins < 1) return <span className="byline__time">Vừa xong</span>;
  if (mins < 60) return <span className="byline__time">{mins} phút trước</span>;
  const h = Math.floor(mins / 60);
  const r = mins % 60;
  return <span className="byline__time">{h} giờ{r > 0 ? ` ${r} phút` : ''} trước</span>;
}

export default function Home({ articles, onSelectArticle, searchQuery, setSearchQuery }) {
  const leadArticle = articles.find(a => a.category === 'lead') || articles[0];
  const railArticles = articles.filter(a => a.category === 'lead-rail');
  const deskArticles = articles.filter(a => a.category === 'desk');
  const cultureArticles = articles.filter(a => a.category === 'culture');

  const filteredDesk = deskArticles.filter(a => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.headline.toLowerCase().includes(q) ||
      a.dek.toLowerCase().includes(q) ||
      a.section.toLowerCase().includes(q)
    );
  });

  return (
    <main>
      {/* Top bar: stamp + search */}
      <div
        style={{
          maxWidth: 'var(--container)',
          margin: '24px auto 0',
          padding: '0 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div className="stamp stamp--brass">BẢN TIN BAN ĐÊM — PHÁT HÀNH TỰ ĐỘNG</div>
        <div className="search-box">
          <span style={{ marginRight: '8px', color: 'var(--brass)', fontSize: '0.85rem' }}>⌕</span>
          <input
            type="text"
            placeholder="Tìm kiếm bản tin, chuyên mục..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Tìm kiếm bài viết"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--fog)', cursor: 'pointer', fontSize: '1rem' }}
              aria-label="Xoá tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── HERO / LEAD STORY ── */}
      <section className="hero" id="lead">
        <article className="hero__lead" onClick={() => onSelectArticle(leadArticle)}>
          {leadArticle.stamp && (
            <div className={`stamp ${leadArticle.stampClass || ''}`}>{leadArticle.stamp}</div>
          )}
          <p className="hero__eyebrow">{leadArticle.eyebrow || leadArticle.section}</p>
          <h1 className="hero__headline">{leadArticle.headline}</h1>
          <p className="hero__dek">{leadArticle.dek}</p>
          <div className="byline">
            <span>{leadArticle.author}</span>
            <span className="byline__sep">—</span>
            <RelativeTime minsAgo={leadArticle.minsAgo} />
          </div>
        </article>

        <aside className="hero__rail" aria-label="Tin phụ">
          {railArticles.map(item => (
            <article key={item.id} className="rail-item" onClick={() => onSelectArticle(item)}>
              <p className="rail-item__eyebrow">{item.eyebrow || item.section}</p>
              <h2 className="rail-item__headline">{item.headline}</h2>
              <RelativeTime minsAgo={item.minsAgo} />
            </article>
          ))}
        </aside>
      </section>

      {/* ── WIRE DESK GRID ── */}
      <section className="desk" id="desk">
        <div className="desk__header-row">
          <div>
            <h2 className="desk__title">Bàn tin</h2>
            <p className="desk__sub">Cập nhật liên tục từ các phóng viên trực đêm</p>
          </div>
        </div>

        <div className="desk__grid">
          {filteredDesk.length > 0 ? (
            filteredDesk.map(item => (
              <article key={item.id} className="card" onClick={() => onSelectArticle(item)}>
                {item.stamp && (
                  <div className={`stamp ${item.stampClass || 'stamp--dev'}`}>{item.stamp}</div>
                )}
                <p className="card__eyebrow">{item.eyebrow || item.section}</p>
                <h3 className="card__headline">{item.headline}</h3>
                <p className="card__dek">{item.dek}</p>
                <RelativeTime minsAgo={item.minsAgo} />
              </article>
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '48px',
                textAlign: 'center',
                color: 'var(--fog)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
              }}
            >
              ⌕ Không tìm thấy kết quả nào cho &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section className="culture" id="culture">
        <div className="culture__head">
          <h2 className="desk__title">Văn hoá &amp; Đời sống</h2>
          <p className="desk__sub">Những câu chuyện chậm hơn, đọc vào cuối ca trực</p>
        </div>
        <div className="culture__grid">
          {cultureArticles.map(item => (
            <article key={item.id} className="culture-card" onClick={() => onSelectArticle(item)}>
              <p className="card__eyebrow">{item.eyebrow || item.section}</p>
              <h3 className="card__headline">{item.headline}</h3>
              <p className="card__dek">{item.dek}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
