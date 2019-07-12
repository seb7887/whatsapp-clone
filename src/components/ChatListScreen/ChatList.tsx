import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { List, ListItem } from '@material-ui/core';
import { IChats } from '../../types';
import { API_URL } from '../../config';

const getChatsQuery = `
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

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<any>([]);

  useMemo(async () => {
    const body = await fetch(`${API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: getChatsQuery })
    });
    const {
      data: { chats }
    } = await body.json();
    setChats(chats);
  }, []);

  return (
    <div className="chat-list">
      <List className="list">
        {chats.map((chat: any) => (
          <ListItem key={chat.id} className="item">
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
