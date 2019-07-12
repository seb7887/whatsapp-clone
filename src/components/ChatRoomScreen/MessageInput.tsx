import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

interface IProps {
  onSendMessage(content: string): any;
}

const MessageInput: React.FC<IProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const onKeyPress = (e: any) => {
    if (e.charCode === 13) {
      submitMessage();
    }
  };

  const onChange = ({ target }: any) => {
    setMessage(target.value);
  };

  const submitMessage = () => {
    if (!message) {
      return;
    }

    setMessage('');

    if (typeof onSendMessage === 'function') {
      onSendMessage(message);
    }
  };

  return (
    <div className="message--input">
      <input
        type="text"
        placeholder="Type a message"
        className="message--input__input"
        onKeyPress={onKeyPress}
        onChange={onChange}
        data-testid="message-input"
      />
      <Button
        variant="contained"
        color="primary"
        className="send-button"
        onClick={submitMessage}
        data-testid="send-button"
      >
        <SendIcon />
      </Button>
    </div>
  );
};

export default MessageInput;
