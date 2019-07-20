import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { History } from 'history';
import { IChatQueryMessage, IChatQueryResult } from '../../types';
import { API_URL } from '../../config';
import ChatNav from './ChatNav';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const getChatQuery = gql`
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
  const client = useApolloClient();
  const { data, loading } = useQuery<any>(getChatQuery, {
    variables: { chatId }
  });
  let chat: any;

  if (!loading) {
    chat = data.chat;
  } else {
    chat = null;
  }

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

      client.writeQuery({
        query: getChatQuery,
        variables: { chatId },
        data: {
          chat: {
            ...chat,
            messages: chat.messages.concat(message)
          }
        }
      });
    },
    [chat, chatId, client]
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
