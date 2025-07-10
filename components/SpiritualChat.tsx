import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Heart, Book, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface SpiritualChatProps {
  isDark: boolean;
}

const SpiritualChat = ({ isDark }: SpiritualChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const spiritualResponses = {
    greeting: [
      "Hello, beloved child of God! How wonderful to meet you. How would you like to start your spiritual journey today?",
      "Greetings in the name of our Lord! I'm here to walk with you on your faith journey. What's on your heart today?",
      "Peace be with you! I'm blessed to be your spiritual companion today. How can I help nurture your soul?"
    ],
    encouragement: [
      "Remember, God has not given you a spirit of fear, but of power, love, and sound mind. (2 Timothy 1:7)",
      "The Lord your God is with you wherever you go. He will never leave you nor forsake you. (Joshua 1:9)",
      "Cast all your anxiety on Him because He cares for you. (1 Peter 5:7)"
    ],
    loneliness: [
      "Here's a prayer for loneliness: 'Heavenly Father, I feel alone right now, but I know You are always with me. Help me feel Your presence and surround me with Your love. Connect me with people who will encourage my faith. In Jesus' name, Amen.'",
      "When you feel lonely, remember: 'The Lord your God goes with you; he will never leave you nor forsake you.' (Deuteronomy 31:6). Try this prayer: 'Lord, fill this emptiness with Your love and help me find community in You.'",
      "Prayer for loneliness: 'Dear God, even when I feel isolated, help me remember that You are my constant companion. Show me ways to connect with others and be a light in someone else's darkness. Amen.'"
    ],
    wisdom: [
      "Trust in the Lord with all your heart and lean not on your own understanding. (Proverbs 3:5)",
      "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you. (Jeremiah 29:11)",
      "Be still and know that I am God. (Psalm 46:10)"
    ],
    prayer: [
      "Let's pray together. Heavenly Father, we come before You with grateful hearts...",
      "Would you like to pray about something specific? I'm here to lift your concerns to the Lord.",
      "Prayer is our direct line to God. What would you like to bring before His throne today?"
    ]
  };

  const detectIntent = (message: string): keyof typeof spiritualResponses => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('loneliness') || lowerMessage.includes('alone')) return 'loneliness';
    if (lowerMessage.includes('pray') || lowerMessage.includes('prayer')) return 'prayer';
    if (lowerMessage.includes('encourage') || lowerMessage.includes('sad') || lowerMessage.includes('down')) return 'encouragement';
    if (lowerMessage.includes('wisdom') || lowerMessage.includes('guidance') || lowerMessage.includes('help')) return 'wisdom';
    
    return 'encouragement';
  };

  const generateResponse = (userMessage: string): string => {
    // Check if user is introducing themselves
    const namePattern = /(i am|i'm|my name is|call me)\s+([a-zA-Z]+)/i;
    const match = userMessage.match(namePattern);
    
    if (match && !hasIntroduced) {
      const name = match[2];
      setUserName(name);
      setHasIntroduced(true);
      return `Hello ${name}! What a beautiful name. I'll remember that. How would you like to start your day in God's presence? Would you like a devotional, prayer time, meditation, or just to chat about what's on your heart? I'm here to support your spiritual journey.`;
    }

    if (!hasIntroduced && (
      userMessage.toLowerCase().includes('hello') || 
      userMessage.toLowerCase().includes('hi') || 
      userMessage.toLowerCase().includes('hey')
    )) {
      return spiritualResponses.greeting[Math.floor(Math.random() * spiritualResponses.greeting.length)];
    }

    // If user has been introduced, personalize responses
    if (hasIntroduced && userName) {
      const intent = detectIntent(userMessage);
      const responses = spiritualResponses[intent];
      const baseResponse = responses[Math.floor(Math.random() * responses.length)];
      return `${userName}, ${baseResponse}`;
    }

    const intent = detectIntent(userMessage);
    const responses = spiritualResponses[intent];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = generateResponse(userMessage);
    addMessage(response, 'ai');
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      addMessage("Welcome to DSCPL! I'm your spiritual companion, here to guide you through devotionals, prayers, meditation, and accountability. Feel free to introduce yourself or let me know how I can help you grow in faith today! 🙏", 'ai');
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className={`text-center py-6 rounded-xl mb-4 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/20' 
          : 'bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200'
      }`}>
        <h1 className={`text-3xl font-bold bg-gradient-to-r ${
          isDark 
            ? 'from-purple-400 to-cyan-400' 
            : 'from-orange-600 to-pink-600'
        } bg-clip-text text-transparent flex items-center justify-center gap-2`}>
          <Heart className="text-pink-500" />
          DSCPL Chat
          <Book className="text-purple-500" />
        </h1>
        <p className={`mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Your Spiritual Companion for Faith, Prayer & Growth
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] p-4 ${
              message.sender === 'user'
                ? isDark
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : isDark
                  ? 'bg-black/30 backdrop-blur-sm border-gray-600/50 text-gray-100'
                  : 'bg-white border-gray-200 text-gray-800'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <div className={`text-xs mt-2 opacity-70`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className={`p-4 ${
              isDark 
                ? 'bg-black/30 backdrop-blur-sm border-gray-600/50' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    isDark ? 'bg-cyan-400' : 'bg-orange-400'
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-pulse delay-75 ${
                    isDark ? 'bg-blue-400' : 'bg-red-400'
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-pulse delay-150 ${
                    isDark ? 'bg-gray-400' : 'bg-yellow-400'
                  }`}></div>
                </div>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  DSCPL is typing...
                </span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`flex gap-3 p-4 rounded-xl ${
        isDark 
          ? 'bg-slate-800/50 border border-slate-700' 
          : 'bg-white/50 border border-gray-200'
      }`}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={hasIntroduced ? `Share what's on your heart, ${userName}...` : "Tell me your name or ask for spiritual guidance..."}
          className={`flex-1 ${
            isDark 
              ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
          }`}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className={`px-6 ${
            isDark
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
          } text-white border-0`}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SpiritualChat;