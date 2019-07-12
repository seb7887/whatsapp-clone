import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { IChatQueryMessage } from '../../types';

interface IProps {
  messages: IChatQueryMessage[];
}

const MessageList: React.FC<IProps> = ({ messages }) => {
  const selfRef = useRef(null);

  useEffect(() => {
    if (!selfRef.current) {
      return;
    }

    const selfDOMNode = ReactDOM.findDOMNode(selfRef.current) as HTMLElement;
    selfDOMNode.scrollTop = Number.MAX_SAFE_INTEGER;
  }, [messages.length]);

  return (
    <div className="message--list">
      {messages.map((message: IChatQueryMessage) => (
        <div
          key={message.id}
          className="message--item"
          data-testid="message-item"
        >
          <div className="message--item__content" data-testid="message-content">
            {message.content}
          </div>
          <div className="message--item__timestamp" data-testid="message-date">
            {moment(message.createdAt).format('HH:mm')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
