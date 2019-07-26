import {
  cleanup,
  fireEvent,
  getByTestId,
  render,
  wait
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';

import { IChatQueryMessage } from '../../types';

import MessageList from './MessageList';

describe('MessagesList', () => {
  afterEach(cleanup);
  const time = new Date('1 Jan 2019 GMT').toISOString();
  it('renders messages data', () => {
    const messages: IChatQueryMessage[] = [
      {
        id: '1',
        content: 'foo',
        createdAt: time
      },
      {
        id: '2',
        content: 'bar',
        createdAt: time
      }
    ];
    let message1;
    let message2;

    const { container, getAllByTestId, getByTestId } = render(
      <MessageList messages={messages} />
    );
    const match = getAllByTestId('message-item');
    message1 = match[0];
    message2 = match[1];

    expect(message1.textContent).toContain('foo');
    expect(message1.textContent).toContain('21:00');
    expect(message2.textContent).toContain('bar');
    expect(message2.textContent).toContain('21:00');
  });
});
