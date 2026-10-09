import { Menu, X } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, onToggleTheme, mobileOpen, onToggleMenu, isScrolled }) {
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav container">
        <a href="#home" className="brand-mark">
          <span className="brand-dot" />
          Deepak Omkar
        </a>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {portfolio.navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href={portfolio.profile.resumeUrl} className="button secondary" download="Deepak_Omkar_Resume.pdf">
            Resume
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button type="button" className="mobile-menu" onClick={onToggleMenu} aria-label="Toggle mobile menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
