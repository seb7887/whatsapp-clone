import React from 'react';
import ChatsNav from './ChatsNav';
import ChatList from './ChatList';

const ChatListScreen: React.FC = () => (
  <>
    <ChatsNav />
    <ChatList />
  </>
);

export default ChatListScreen;
