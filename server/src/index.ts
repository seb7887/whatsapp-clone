import { ApolloServer, gql, PubSub } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import http from 'http';

import { chats } from '../../db';

import schema from './schema';

const port = process.env.PORT || 7777;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/chats', (req: Request, res: Response) => {
  res.json(chats);
});

const pubsub = new PubSub();
const server = new ApolloServer({ schema, context: () => ({ pubsub }) });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

server.applyMiddleware({
  app,
  path: '/graphql'
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
