import React from 'react';
import { History } from 'history';
import ChatsNav from './ChatsNav';
import ChatList from './ChatList';

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
