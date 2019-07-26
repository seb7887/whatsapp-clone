import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { History } from 'history';
import React, { useCallback } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';

import * as fragments from '../../graphql/fragments';
import * as queries from '../../graphql/queries';
import { IChatQueryResult, IChatsResult } from '../../types';

import ChatNav from './ChatNav';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${fragments.message}
`;

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${fragments.fullChat}
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
          type FullChat = { [key: string]: any };
          let fullChat;
          const chatIdFromStore = defaultDataIdFromObject(chat);

          if (chatIdFromStore === null) {
            return;
          }

          try {
            fullChat = client.readFragment<FullChat>({
              id: chatIdFromStore,
              fragment: fragments.fullChat,
              fragmentName: 'FullChat'
            });
          } catch (e) {
            return;
          }

          if (fullChat === null) {
            return;
          }
          if (fullChat.messages.some((m: any) => m.id === addMessage.id)) {
            return;
          }

          fullChat.messages.push(addMessage);
          fullChat.lastMessage = addMessage;

          client.writeFragment({
            id: chatIdFromStore,
            fragment: fragments.fullChat,
            fragmentName: 'FullChat',
            data: fullChat
          });

          let data;
          try {
            data = client.readQuery<IChatsResult>({
              query: queries.chats
            });
          } catch (e) {
            return;
          }

          if (!data || data === null) {
            return null;
          }
          if (!data.chats || data.chats === undefined) {
            return null;
          }
          const chats = data.chats;

          const chatIndex = chats.findIndex((c: any) => c.id === chatId);
          if (chatIndex === -1) {
            return;
          }
          const chatWhereAdded = chats[chatIndex];

          // The chat will appear at the top of the ChatsList component
          chats.splice(chatIndex, 1);
          chats.unshift(chatWhereAdded);

          client.writeQuery({
            query: queries.chats,
            data: { chats }
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
