import { ApolloServer, gql, PubSub } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import { resetDb, users } from '../../../../db';
import schema from '../../schema';

describe('Mutation.addMessage', () => {
  beforeEach(resetDb);

  it('should add message to specified chat', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({ pubsub: new PubSub(), currentUser: users[0] })
    });
    const { query, mutate } = createTestClient(server as any);

    const addMessageRes = await mutate({
      variables: { chatId: '1', content: 'Hello World' },
      mutation: gql`
        mutation AddMessage($chatId: ID!, $content: String!) {
          addMessage(chatId: $chatId, content: $content) {
            id
            content
          }
        }
      `
    });

    expect(addMessageRes.data).toBeDefined();
    expect(addMessageRes.errors).toBeUndefined();

    const getChatRes = await query({
      variables: { chatId: '1' },
      query: gql`
        query GetChat($chatId: ID!) {
          chat(chatId: $chatId) {
            id
            lastMessage {
              id
              content
            }
          }
        }
      `
    });

    expect(getChatRes.data).toBeDefined();
    expect(getChatRes.errors).toBeUndefined();
  });
});
