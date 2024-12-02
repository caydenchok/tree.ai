import { IconType } from 'react-icons';

export interface Message {
  content: string;
  sender: 'user' | 'assistant';
}

export interface SavedChat {
  id: string;
  name: string;
  messages: Message[];
  timestamp: number;
}

export interface Subject {
  name: string;
  icon: IconType;
  description: string;
  gradient: string;
  shadowColor: string;
}

export interface TipItem {
  icon: IconType;
  text: string;
}
