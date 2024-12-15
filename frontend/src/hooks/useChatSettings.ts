import { useState, useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/react';

interface UseChatSettingsReturn {
  selectedMode: string;
  isSidebarOpen: boolean;
  showMobileOverlay: boolean;
  activeTab: 'history' | 'saved';
  getGreeting: () => string;
  getLateNightMessage: () => string;
  setSelectedMode: (mode: string) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setShowMobileOverlay: (show: boolean) => void;
  setActiveTab: (tab: 'history' | 'saved') => void;
}

export const useChatSettings = (): UseChatSettingsReturn => {
  const [selectedMode, setSelectedMode] = useState('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'saved'>('history');
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (isLargerThan1024) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isLargerThan1024]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return '🌙 Happy late night';
    if (hour < 12) return '🌅 Good morning';
    if (hour < 17) return '☀️ Good afternoon';
    if (hour < 22) return '🌆 Good evening';
    return '🌙 Happy late night';
  };

  const getLateNightMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 5) {
      return "✨ Ask me anything... I know everything (even at this hour!)";
    }
    return "✨ Ask me anything... I know everything";
  };

  return {
    selectedMode,
    isSidebarOpen,
    showMobileOverlay,
    activeTab,
    getGreeting,
    getLateNightMessage,
    setSelectedMode,
    setIsSidebarOpen,
    setShowMobileOverlay,
    setActiveTab,
  };
};
