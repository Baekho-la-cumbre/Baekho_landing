import { useEffect, useState, type JSX } from "react";

const MIN_MS = 1800;

export default function LoadingScreen(): JSX.Element | null {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const started = Date.now();
    let leaveTimer: number | undefined;
    let hideTimer: number | undefined;

    const finish = () => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, MIN_MS - elapsed);

      leaveTimer = window.setTimeout(() => {
        setLeaving(true);
        hideTimer = window.setTimeout(() => setVisible(false), 450);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.removeEventListener("load", finish);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`baekho-loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando Academia Baekho"
    >
      <div className="baekho-loader__glow" aria-hidden="true" />

      <div className="baekho-loader__content">
        <img
          src="https://i.imgur.com/8nZiWan.jpeg"
          alt="Mascota Baekho"
          className="baekho-loader__mascot"
        />

        <p className="baekho-loader__brand">BAEKHO</p>
        <p className="baekho-loader__sub">ACADEMIA DEPORTIVA</p>

        <div className="baekho-loader__bar" aria-hidden="true">
          <span className="baekho-loader__bar-fill" />
        </div>
      </div>
    </div>
  );
}
