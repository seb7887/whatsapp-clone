import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { History } from 'history';
import { IChatQueryMessage, IChatQueryResult } from '../../types';
import ChatNav from './ChatNav';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      id
      content
      createdAt
    }
  }
`;

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
  const [addMessage] = useMutation(addMessageMutation);
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
      addMessage({
        variables: { chatId, content },
        optimisticResponse: {
          __typename: 'Mutation',
          addMessage: {
            __typename: 'Message',
            id: Math.random()
              .toString(36)
              .substr(2, 9),
            createdAt: new Date(),
            content
          }
        },
        update: (client, { data: { addMessage } }) => {
          client.writeQuery({
            query: getChatQuery,
            variables: { chatId },
            data: {
              chat: {
                ...chat,
                messages: chat.messages.concat(addMessage)
              }
            }
          });
        }
      });
    },
    [chat, chatId, addMessage]
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
