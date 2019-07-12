import React, { useMemo, useState } from 'react';
import { API_URL } from '../../config';

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
}
interface IChatQueryMessage {
  id: string;
  content: string;
  createdAt: string;
}

interface IChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: IChatQueryMessage[];
}

type OptionalChatQueryResult = IChatQueryResult | null;

const ChatRoomScreen: React.FC<IProps> = ({ chatId }) => {
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

  if (!chat) {
    return null;
  } else {
    const { picture, name, messages } = chat;
    return (
      <div data-testid="chat">
        <img src={picture} alt="Profile" />
        <div>{name}</div>
        <ul>
          {messages.map(message => (
            <li key={message.id}>
              <div>{message.content}</div>
              <div>{message.createdAt}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default ChatRoomScreen;
