import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import moment from 'moment';
import { History } from 'history';
import { List, ListItem } from '@material-ui/core';
import { IChats } from '../../types';

export const getChatsQuery = gql`
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
      }
    }
  }
`;

interface IProps {
  history: History;
}

const ChatList: React.FC<IProps> = ({ history }) => {
  const { data, loading } = useQuery<any>(getChatsQuery);
  let chats: any = null;

  if (!loading) {
    chats = data.chats;
  }

  const navToChat = useCallback(
    (chat: IChats) => {
      history.push(`chats/${chat.id}`);
    },
    [history]
  );

  if (loading) {
    return null;
  }
  return (
    <div className="chat-list">
      <List className="list">
        {chats.map((chat: any) => (
          <ListItem
            key={chat.id}
            className="item"
            onClick={navToChat.bind(null, chat)}
            data-testid="chat"
          >
            <img
              src={chat.picture}
              alt="Profile"
              className="picture"
              data-testid="picture"
            />
            <div className="info">
              <h3 className="info__name" data-testid="name">
                {chat.name}
              </h3>
              {chat.lastMessage && (
                <>
                  <p className="info__content" data-testid="content">
                    {chat.lastMessage.content}
                  </p>
                  <p className="info__date" data-testid="date">
                    {moment(chat.lastMessage.createdAt).format('HH:mm')}
                  </p>
                </>
              )}
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChatList;
