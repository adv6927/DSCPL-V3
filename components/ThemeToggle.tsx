import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  onThemeChange: (isDark: boolean) => void;
}

const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  const handleToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    onThemeChange(newTheme);
  };

  return (
    <div className="neo-toggle-container fixed top-6 right-6 z-50">
      <input
        type="checkbox"
        id="neo-toggle"
        className="neo-toggle-input"
        checked={isDark}
        onChange={handleToggle}
      />
      <label htmlFor="neo-toggle" className="neo-toggle">
        <div className="neo-track">
          <div className="neo-background-layer"></div>
          <div className="neo-grid-layer"></div>
          <div className="neo-track-highlight"></div>
          <div className="neo-spectrum-analyzer">
            <div className="neo-spectrum-bar"></div>
            <div className="neo-spectrum-bar"></div>
            <div className="neo-spectrum-bar"></div>
            <div className="neo-spectrum-bar"></div>
            <div className="neo-spectrum-bar"></div>
          </div>
        </div>
        <div className="neo-thumb">
          <div className="neo-thumb-ring">
            <div className="neo-thumb-core">
              <div className="neo-thumb-icon">
                <div className="neo-thumb-wave"></div>
                <div className="neo-thumb-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="neo-gesture-area"></div>
        <div className="neo-interaction-feedback">
          <div className="neo-ripple"></div>
          <div className="neo-progress-arc"></div>
        </div>
      </label>
      <div className="neo-status">
        <div className="neo-status-indicator">
          <div className="neo-status-dot"></div>
          <div className="neo-status-text"></div>
        </div>
      </div>
      <div className="neo-value-display">
        <div className="neo-value-text">{isDark ? 'DARK' : 'LIGHT'}</div>
      </div>
    </div>
  );
};

export default ThemeToggle;