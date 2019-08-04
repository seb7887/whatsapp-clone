import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { History } from 'history';
import React, { useCallback } from 'react';

import * as fragments from '../../graphql/fragments';
import * as queries from '../../graphql/queries';
import {
  ChatsQuery,
  useAddMessageMutation,
  useGetChatQuery
} from '../../graphql/types';
import { IChatQueryResult, IChatsResult } from '../../types';

import ChatNav from './ChatNav';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface IProps {
  chatId: string;
  history: History;
}

type OptionalChatQueryResult = IChatQueryResult | null;

const ChatRoomScreen: React.FC<IProps> = ({ chatId, history }) => {
  const [addMessage] = useAddMessageMutation();
  const { data, loading } = useGetChatQuery({
    variables: { chatId }
  });

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

          if (fullChat === null || fullChat.messages === null) {
            return;
          }
          if (
            fullChat.messages.some(
              (currentMessage: any) => currentMessage.id === addMessage.id
            )
          ) {
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

          let data: ChatsQuery | null;
          try {
            data = client.readQuery({
              query: queries.chats
            });
          } catch (e) {
            return;
          }

          if (!data || !data.chats) {
            return null;
          }
          const chats = data.chats;

          const chatIndex = chats.findIndex((c: any) => {
            if (addMessage === null || addMessage.chat === null) {
              return -1;
            }
          });
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
    [data, chatId, addMessage]
  );

  if (data === undefined) {
    return null;
  }
  const chat = data.chat;

  if (loading || chat === null) {
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
