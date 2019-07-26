import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';

import ChatNav from './ChatNav';

describe('ChatNavbar', () => {
  afterEach(cleanup);
  it('renders chat data', () => {
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: []
    };
    const history = createMemoryHistory();
    {
      const { container, getByTestId } = render(
        <ChatNav chat={chat} history={history} />
      );
      expect(getByTestId('chat-name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('chat-picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
    }
  });
  it('goes back on arrow click', async () => {
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: []
    };
    const history = createMemoryHistory();
    history.push('/chats/1');
    await wait(() => expect(history.location.pathname).toEqual('/chats/1'));
    {
      const { container, getByTestId } = render(
        <ChatNav chat={chat} history={history} />
      );
      fireEvent.click(getByTestId('back-button'));
      await wait(() => expect(history.location.pathname).toEqual('/chats'));
    }
  });
});
