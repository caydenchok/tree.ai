import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ChatInput } from '../components/tree-chat/ChatInput';
import '@testing-library/jest-dom';

describe('ChatInput', () => {
  const mockHandleSendMessage = jest.fn();
  const mockSetInputValue = jest.fn();
  const mockOnModeChange = jest.fn();
  const mockOnCancel = jest.fn();

  const defaultProps = {
    inputValue: '',
    setInputValue: mockSetInputValue,
    handleSendMessage: mockHandleSendMessage,
    isLoading: false,
    selectedMode: 'default',
    onModeChange: mockOnModeChange,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} />
      </ChakraProvider>
    );

    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} />
      </ChakraProvider>
    );

    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'test message' } });

    expect(mockSetInputValue).toHaveBeenCalled();
  });

  it('handles message sending', async () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} inputValue="test message" />
      </ChakraProvider>
    );

    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockHandleSendMessage).toHaveBeenCalledWith('test message');
    });
  });

  it('prevents sending empty messages', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} inputValue="" />
      </ChakraProvider>
    );

    const sendButton = screen.getByRole('button', { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  it('shows loading state', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} isLoading={true} />
      </ChakraProvider>
    );

    expect(screen.getByRole('button', { name: /cancel message/i })).toBeInTheDocument();
  });

  it('handles mode changes', async () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} />
      </ChakraProvider>
    );

    const modeButton = screen.getByRole('button', { name: /select chat mode/i });
    fireEvent.click(modeButton);

    const creativeMode = await screen.findByText('Creative');
    fireEvent.click(creativeMode);

    expect(mockOnModeChange).toHaveBeenCalledWith('creative');
  });

  it('handles keyboard shortcuts', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} />
      </ChakraProvider>
    );

    fireEvent.keyDown(window, { key: '1', altKey: true });
    expect(mockOnModeChange).toHaveBeenCalledWith('default');

    fireEvent.keyDown(window, { key: '2', altKey: true });
    expect(mockOnModeChange).toHaveBeenCalledWith('creative');
  });

  it('respects maxLength prop', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} maxLength={10} />
      </ChakraProvider>
    );

    const input = screen.getByPlaceholderText('Type your message...');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('shows character count', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} inputValue="test" maxLength={10} />
      </ChakraProvider>
    );

    expect(screen.getByText('4/10')).toBeInTheDocument();
  });

  it('handles cancellation', () => {
    render(
      <ChakraProvider>
        <ChatInput {...defaultProps} isLoading={true} />
      </ChakraProvider>
    );

    const cancelButton = screen.getByRole('button', { name: /cancel message/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
