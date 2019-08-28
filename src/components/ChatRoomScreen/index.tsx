import gql from 'graphql-tag';
import { History } from 'history';
import React, { useCallback } from 'react';

import * as fragments from '../../graphql/fragments';
import { useAddMessageMutation, useGetChatQuery } from '../../graphql/types';
import { writeMessage } from '../../services/cache.service';

import ChatNav from './ChatNav';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

// eslint-disable-next-line
const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${fragments.fullChat}
`;

// eslint-disable-next-line
const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${fragments.message}
`;

interface IChatRoomScreenParams {
  chatId: string;
  history: History;
}

const ChatRoomScreen: React.FC<IChatRoomScreenParams> = ({
  history,
  chatId
}) => {
  const { data, loading } = useGetChatQuery({
    variables: { chatId }
  });

  const [addMessage] = useAddMessageMutation();

  const onSendMessage = useCallback(
    (content: string) => {
      if (data === undefined) {
        return null;
      }
      const chat = data.chat;
      if (chat === null) {
        return null;
      }

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
            chat: {
              __typename: 'Chat',
              id: chatId
            },
            content
          }
        },
        update: (client: any, { data: { addMessage } }: any) => {
          writeMessage(client, addMessage);
        }
      });
    },
    [data, chatId, addMessage]
  );

  if (data === undefined) {
    return null;
  }
  const chat = data.chat;
  const loadingChat = loading;

  if (loadingChat) {
    return null;
  }
  if (chat === null) {
    return null;
  }

  return (
    <div data-testid="chat" className="room">
      <ChatNav chat={chat} history={history} />
      {chat.messages && <MessageList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatRoomScreen;
