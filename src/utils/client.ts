import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { API_URL } from '../config';

const httpUri = `${API_URL}/graphql`;

const httpLink = new HttpLink({
  uri: httpUri
});

const inMemoryCache = new InMemoryCache();

export default new ApolloClient({
  link: httpLink,
  cache: inMemoryCache
});
