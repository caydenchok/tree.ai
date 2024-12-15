import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import chatService from '../services/chatService';

interface SavedMessage {
  id: number;
  content: string;
  timestamp: string;
  topic: string;
}

interface RecentChat {
  id: number;
  title: string;
  preview: string;
  timestamp: string;
}

interface UseChatHistoryReturn {
  recentChats: RecentChat[];
  savedMessages: SavedMessage[];
  handleSaveMessage: (message: string, topic?: string) => void;
  loadChatHistory: () => Promise<void>;
}

export const useChatHistory = (): UseChatHistoryReturn => {
  const [recentChats] = useState<RecentChat[]>([
    {
      id: 1,
      title: "Python Programming ",
      preview: "Last conversation about Python basics...",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "JavaScript Help ",
      preview: "Discussion about React hooks...",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "Database Design ",
      preview: "SQL query optimization tips...",
      timestamp: "1 day ago"
    }
  ]);

  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([
    {
      id: 1,
      content: "Here's how to implement a binary search tree...",
      timestamp: "1 day ago",
      topic: "Data Structures"
    },
    {
      id: 2,
      content: "The key principles of React hooks are...",
      timestamp: "2 days ago",
      topic: "React"
    },
    {
      id: 3,
      content: "To optimize your database queries, consider...",
      timestamp: "3 days ago",
      topic: "Database"
    }
  ]);

  const toast = useToast();

  const handleSaveMessage = (message: string, topic: string = "General") => {
    setSavedMessages(prev => [{
      id: prev.length + 1,
      content: message,
      timestamp: "Just now",
      topic
    }, ...prev]);
  };

  const loadChatHistory = async () => {
    try {
      const history = await chatService.getConversationHistory();
      return history;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load chat history",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      return [];
    }
  };

  return {
    recentChats,
    savedMessages,
    handleSaveMessage,
    loadChatHistory,
  };
};
