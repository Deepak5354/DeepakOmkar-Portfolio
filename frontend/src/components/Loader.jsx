import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(timer);
          return 100;
        }
        return current + 8;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loader-screen" aria-live="polite">
      <div className="loader-card">
        <p className="eyebrow text-muted">INITIALIZING PORTFOLIO...</p>
        <h2>Loading components...</h2>
        <div className="progress-bar" aria-label="loading progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <strong>{progress}%</strong>
      </div>
    </div>
  );
}
