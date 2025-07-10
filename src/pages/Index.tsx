import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ThemeToggle from '@/components/ThemeToggle';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleThemeChange = (dark: boolean) => {
    setIsDark(dark);
  };

  useEffect(() => {
    // Set dark mode by default on mount
    document.documentElement.classList.add('dark');
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' 
          : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50'
      }`}>
        <div className="absolute top-4 left-4 z-50">
          <ThemeToggle onThemeChange={handleThemeChange} />
        </div>
        <LoadingScreen isDark={isDark} onLoadingComplete={handleLoadingComplete} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' 
        : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50'
    }`}>
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle onThemeChange={handleThemeChange} />
      </div>
      <Dashboard isDark={isDark} />
    </div>
  );
};

export default Index;
