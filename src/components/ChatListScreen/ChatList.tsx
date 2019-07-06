import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { List, ListItem } from '@material-ui/core';
import { IChats } from '../../types';
import { API_URL } from '../../config';

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<any>([]);

  useMemo(async () => {
    const body = await fetch(`${API_URL}/chats`);
    const chats: IChats[] = await body.json();
    setChats(chats);
  }, []);

  return (
    <div className="chat-list">
      <List className="list">
        {chats.map((chat: any) => (
          <ListItem key={chat.id} className="item">
            <img src={chat.picture} alt="Profile" className="picture" />
            <div className="info">
              <h3 className="info__name">{chat.name}</h3>
              {chat.lastMessage && (
                <>
                  <p className="info__content">{chat.lastMessage.content}</p>
                  <p className="info__date">
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
