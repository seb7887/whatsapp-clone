import { History } from 'history';
import React from 'react';

import ChatList from './ChatList';
import ChatsNav from './ChatsNav';

interface IProps {
  history: History;
}

const ChatListScreen: React.FC<IProps> = ({ history }) => (
  <>
    <ChatsNav />
    <ChatList history={history} />
  </>
);

export default ChatListScreen;
