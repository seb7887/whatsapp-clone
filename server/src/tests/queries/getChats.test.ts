import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from '../../schema';

describe('Query.chats', () => {
  it('should fetch all chats', async () => {
    const server = new ApolloServer({ schema });

    const { query } = createTestClient(server as any);

    const res = await query({
      query: gql`
        query GetChats {
          chats {
            id
            name
            picture
            lastMessage {
              id
              content
              createdAt
            }
          }
        }
      `
    });

    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
  });

  it('should fetch specified chat', async () => {
    const server = new ApolloServer({ schema });

    const { query } = createTestClient(server as any);

    const res = await query({
      variables: { chatId: '1' },
      query: gql`
        query GetChat($chatId: ID!) {
          chat(chatId: $chatId) {
            id
            name
            picture
            lastMessage {
              id
              content
              createdAt
            }
          }
        }
      `
    });

    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
  });
});
