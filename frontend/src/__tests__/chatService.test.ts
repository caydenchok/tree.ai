import axios from 'axios';
import chatService from '../services/chatService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ChatService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('sendMessage', () => {
    it('sends a message successfully', async () => {
      const mockResponse = {
        data: {
          message: {
            role: 'assistant',
            content: 'Test response',
            id: 1
          }
        }
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() }
        }
      } as any);

      const result = await chatService.sendMessage('test message', { mode: 'default' });

      expect(result).toEqual({
        ...mockResponse.data.message,
        timestamp: expect.any(Date)
      });
    });

    it('handles rate limit errors', async () => {
      const errorResponse = {
        response: {
          status: 429,
          data: {
            message: 'Rate limit exceeded'
          }
        }
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockRejectedValue(errorResponse),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() }
        }
      } as any);

      await expect(chatService.sendMessage('test message')).rejects.toThrow(
        'Rate limit exceeded. Please wait before sending more messages.'
      );
    });

    it('handles authentication errors', async () => {
      const errorResponse = {
        response: {
          status: 401,
          data: {
            message: 'Unauthorized'
          }
        }
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockRejectedValue(errorResponse),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() }
        }
      } as any);

      await expect(chatService.sendMessage('test message')).rejects.toThrow(
        'Authentication required. Please log in again.'
      );
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

  describe('getConversationHistory', () => {
    it('retrieves conversation history successfully', async () => {
      const mockHistory = {
        data: {
          messages: [
            {
              role: 'user',
              content: 'test message',
              id: 1,
              timestamp: '2024-01-01T00:00:00Z'
            }
          ]
        }
      };

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockHistory),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() }
        }
      } as any);

      const result = await chatService.getConversationHistory();

      expect(result).toEqual([
        {
          ...mockHistory.data.messages[0],
          timestamp: expect.any(Date)
        }
      ]);
    });
  });

  describe('clearChatHistory', () => {
    it('clears chat history successfully', async () => {
      mockedAxios.create.mockReturnValue({
        delete: jest.fn().mockResolvedValue({}),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() }
        }
      } as any);

      await expect(chatService.clearChatHistory()).resolves.not.toThrow();
    });
  });

  describe('saveMessage', () => {
    it('saves a message successfully', async () => {
      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue({}),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() }
        }
      } as any);

      await expect(chatService.saveMessage(1)).resolves.not.toThrow();
    });
  });

  describe('getSavedMessages', () => {
    it('retrieves saved messages successfully', async () => {
      const mockSaved = {
        data: {
          messages: [
            {
              role: 'assistant',
              content: 'saved message',
              id: 1
            }
          ]
        }
      };

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockSaved),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() }
        }
      } as any);

      const result = await chatService.getSavedMessages();
      expect(result).toEqual(mockSaved.data.messages);
    });
  });

  describe('request interceptors', () => {
    it('adds auth token to requests when available', async () => {
      const token = 'test-token';
      localStorage.setItem('auth_token', token);

      const mockConfig = {};
      const interceptor = mockedAxios.interceptors.request.use.mock.calls[0][0];
      const result = await interceptor(mockConfig);

      expect(result.headers.Authorization).toBe(`Bearer ${token}`);
    });
  });
});
