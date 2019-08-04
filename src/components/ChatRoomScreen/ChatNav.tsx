import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { History } from 'history';
import React, { useCallback } from 'react';

interface IProps {
  history: History;
  chat?: {
    picture?: string | null;
    name?: string | null;
  };
}

const ChatNav: React.FC<IProps> = ({ history, chat }) => {
  const navBack = useCallback(() => {
    history.replace('/chats');
  }, [history]);

  return (
    <Toolbar className="chat-nav">
      <Button
        onClick={navBack}
        className="back-button"
        data-testid="back-button"
      >
        <ArrowBackIcon />
      </Button>
      {chat && chat.picture && chat.name && (
        <>
          <img
            src={chat.picture}
            alt="Picture"
            className="chat-nav__picture"
            data-testid="chat-picture"
          />
          <div className="chat-nav__name" data-testid="chat-name">
            {chat.name}
          </div>
        </>
      )}
    </Toolbar>
  );
};

export default ChatNav;
