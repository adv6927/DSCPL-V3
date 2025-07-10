import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Book, 
  Clock, 
  Users, 
  Target, 
  Heart,
  Calendar,
  Bookmark,
  Trophy,
  Settings
} from 'lucide-react';
import SpiritualChat from './SpiritualChat';

interface DashboardProps {
  isDark: boolean;
}

type Section = 'dashboard' | 'chat' | 'devotionals' | 'prayer' | 'accountability' | 'meditation' | 'goals' | 'community';

const Dashboard = ({ isDark }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [userName, setUserName] = useState('');

  const categories = [
    {
      id: 'chat' as Section,
      title: 'Just Chat',
      description: 'Talk with your spiritual companion',
      icon: MessageCircle,
      color: isDark ? 'from-cyan-500/20 to-blue-500/20' : 'from-cyan-100 to-blue-100'
    },
    {
      id: 'devotionals' as Section,
      title: 'Daily Devotionals',
      description: 'Scripture-based daily readings',
      icon: Book,
      color: isDark ? 'from-purple-500/20 to-pink-500/20' : 'from-purple-100 to-pink-100'
    },
    {
      id: 'prayer' as Section,
      title: 'Prayer Corner',
      description: 'Guided prayers & requests',
      icon: Heart,
      color: isDark ? 'from-rose-500/20 to-red-500/20' : 'from-rose-100 to-red-100'
    },
    {
      id: 'meditation' as Section,
      title: 'Meditation',
      description: 'Peaceful moments with God',
      icon: Clock,
      color: isDark ? 'from-green-500/20 to-emerald-500/20' : 'from-green-100 to-emerald-100'
    },
    {
      id: 'accountability' as Section,
      title: 'Accountability',
      description: 'Track your spiritual journey',
      icon: Target,
      color: isDark ? 'from-orange-500/20 to-yellow-500/20' : 'from-orange-100 to-yellow-100'
    },
    {
      id: 'community' as Section,
      title: 'Community',
      description: 'Connect with fellow believers',
      icon: Users,
      color: isDark ? 'from-indigo-500/20 to-purple-500/20' : 'from-indigo-100 to-purple-100'
    }
  ];

  const renderDashboardContent = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className={`text-center py-12 rounded-xl ${
        isDark 
          ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600' 
          : 'bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200'
      }`}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${
            isDark 
              ? 'from-cyan-400 to-blue-400' 
              : 'from-orange-600 to-pink-600'
          } bg-clip-text text-transparent`}>
            Welcome to DSCPL
          </h1>
          <Book className="text-purple-500 w-8 h-8" />
        </div>
        <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Your Digital Spiritual Companion for Prayer, Learning & Growth
        </p>
        <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          "Be still and know that I am God" - Psalm 46:10
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection(category.id)}
            >
              <div className={`bg-gradient-to-br ${category.color} p-4 rounded-xl mb-4`}>
                <IconComponent className={`w-8 h-8 ${
                  isDark ? 'text-white' : 'text-gray-700'
                }`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {category.title}
              </h3>
              <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                {category.description}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-slate-800/30 border border-slate-700' 
          : 'bg-gray-50 border border-gray-200'
      }`}>
        <h2 className={`text-2xl font-semibold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className={`h-auto py-4 flex-col gap-2 ${
              isDark 
                ? 'border-slate-600 hover:bg-slate-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('prayer')}
          >
            <Heart className="w-5 h-5" />
            <span>Pray Now</span>
          </Button>
          <Button 
            variant="outline" 
            className={`h-auto py-4 flex-col gap-2 ${
              isDark 
                ? 'border-slate-600 hover:bg-slate-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('devotionals')}
          >
            <Book className="w-5 h-5" />
            <span>Today's Reading</span>
          </Button>
          <Button 
            variant="outline" 
            className={`h-auto py-4 flex-col gap-2 ${
              isDark 
                ? 'border-slate-600 hover:bg-slate-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('chat')}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat</span>
          </Button>
          <Button 
            variant="outline" 
            className={`h-auto py-4 flex-col gap-2 ${
              isDark 
                ? 'border-slate-600 hover:bg-slate-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('meditation')}
          >
            <Clock className="w-5 h-5" />
            <span>Meditate</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'chat':
        return <SpiritualChat isDark={isDark} />;
      case 'devotionals':
        return (
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-slate-800/50' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Daily Devotionals
            </h2>
            <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Coming soon - Scripture-based daily readings and reflections
            </p>
          </div>
        );
      case 'prayer':
        return (
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-slate-800/50' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Prayer Corner
            </h2>
            <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Coming soon - Guided prayers and prayer requests
            </p>
          </div>
        );
      case 'meditation':
        return (
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-slate-800/50' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Meditation
            </h2>
            <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Coming soon - Guided meditation and peaceful moments with God
            </p>
          </div>
        );
      case 'accountability':
        return (
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-slate-800/50' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Accountability
            </h2>
            <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Coming soon - Track your spiritual growth and goals
            </p>
          </div>
        );
      case 'community':
        return (
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-slate-800/50' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Community
            </h2>
            <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Coming soon - Connect with fellow believers
            </p>
          </div>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-4">
      {/* Navigation Bar */}
      {activeSection !== 'dashboard' && (
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveSection('dashboard')}
            className={isDark ? 'border-slate-600' : 'border-gray-300'}
          >
            ← Back to Dashboard
          </Button>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {categories.find(cat => cat.id === activeSection)?.title || 'DSCPL'}
          </h1>
        </div>
      )}

      {renderSectionContent()}
      
      {/* Footer */}
      <div className="fixed bottom-4 right-4">
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          Made by Aditya Vardhan Sharma
        </p>
      </div>
    </div>
  );
};

export default Dashboard;