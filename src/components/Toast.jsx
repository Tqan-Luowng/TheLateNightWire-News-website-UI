import React, { useEffect } from 'react';

export default function Toast({ message, onClear }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear && onClear();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast">
        <span aria-hidden="true">✦</span>
        {message}
      </div>
    </div>
  );
}
