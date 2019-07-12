import React, { useCallback, useMemo, useState } from 'react';
import { History } from 'history';
import { IChatQueryMessage, IChatQueryResult } from '../../types';
import { API_URL } from '../../config';
import ChatNav from './ChatNav';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const getChatQuery = `
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

interface IProps {
  chatId: string;
  history: History;
}

type OptionalChatQueryResult = IChatQueryResult | null;

const ChatRoomScreen: React.FC<IProps> = ({ chatId, history }) => {
  const [chat, setChat] = useState<OptionalChatQueryResult>(null);

  useMemo(async () => {
    const body = await fetch(`${API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getChatQuery,
        variables: { chatId }
      })
    });
    const {
      data: { chat }
    } = await body.json();
    setChat(chat);
  }, [chatId]);

  const onSendMessage = useCallback(
    (content: string) => {
      if (!chat) {
        return null;
      }

      const message: IChatQueryMessage = {
        id: (chat.messages.length + 10).toString(),
        createdAt: Date.now().toString(),
        content
      };

      setChat({
        ...chat,
        messages: chat.messages.concat(message)
      });
    },
    [chat]
  );

  if (!chat) {
    return null;
  } else {
    const { messages } = chat;
    return (
      <div data-testid="chat" className="room">
        <ChatNav chat={chat} history={history} />
        {messages && <MessageList messages={messages} />}
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    );
  }
};

export default ChatRoomScreen;
