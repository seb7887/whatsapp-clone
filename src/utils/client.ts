import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { API_URL } from '../config';

const httpUri = `${API_URL}/graphql`;
const wsUri = httpUri.replace(/^https?/, 'ws');

const httpLink = new HttpLink({
  uri: httpUri
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

const inMemoryCache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache: inMemoryCache
});
