import { useState, useEffect } from 'react';
import PyramidLoader from './PyramidLoader';

interface LoadingScreenProps {
  isDark: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ isDark, onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentVerse, setCurrentVerse] = useState('');

  const verses = [
    '"Be still and know that I am God" - Psalm 46:10',
    '"For I know the plans I have for you" - Jeremiah 29:11',
    '"I can do all things through Christ" - Philippians 4:13',
    '"The Lord is my shepherd" - Psalm 23:1',
    '"Trust in the Lord with all your heart" - Proverbs 3:5'
  ];

  useEffect(() => {
    setCurrentVerse(verses[Math.floor(Math.random() * verses.length)]);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
      isDark ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-orange-100 via-yellow-100 to-green-100'
    }`}>
      {/* Main Content */}
      <div className="text-center space-y-8 animate-fade-in">
        {/* Title */}
        <div className="space-y-4">
          <h1 className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${
            isDark 
              ? 'from-purple-400 via-pink-400 to-cyan-400' 
              : 'from-orange-500 via-red-500 to-pink-500'
          } bg-clip-text text-transparent animate-pulse`}>
            DSCPL
          </h1>
          <p className={`text-xl md:text-2xl font-light ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Your Spiritual Companion
          </p>
        </div>

        {/* Pyramid Loader */}
        <div className="flex justify-center py-8">
          <PyramidLoader isDark={isDark} />
        </div>

        {/* Progress Section */}
        <div className="space-y-6 max-w-md mx-auto px-4">
          <div className="text-center">
            <p className={`text-lg font-medium mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Preparing your spiritual journey
            </p>
            <div className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-purple-300' : 'text-orange-600'
            }`}>
              {progress}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            isDark ? 'bg-slate-700' : 'bg-white/50'
          }`}>
            <div 
              className={`h-full transition-all duration-300 ease-out bg-gradient-to-r ${
                isDark 
                  ? 'from-purple-500 via-pink-500 to-cyan-500' 
                  : 'from-orange-500 via-red-500 to-pink-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bible Verse */}
          <div className={`text-center italic text-lg leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {currentVerse}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-300/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-red-300/20 rounded-full blur-xl animate-pulse delay-500" />
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;