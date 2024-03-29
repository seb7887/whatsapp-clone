import { List, ListItem } from '@material-ui/core';
import { History } from 'history';
import moment from 'moment';
import React, { useCallback } from 'react';

import * as queries from '../../graphql/queries';
import { useChatsQuery } from '../../graphql/types';
import { IChats } from '../../types';

interface IProps {
  history: History;
}

const ChatList: React.FC<IProps> = ({ history }) => {
  const { data } = useChatsQuery();

  const navToChat = useCallback(
    (chat: IChats) => {
      history.push(`chats/${chat.id}`);
    },
    [history]
  );

  if (data === undefined || data.chats === undefined) {
    return null;
  }

  const { chats } = data;

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
