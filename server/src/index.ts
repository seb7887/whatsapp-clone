import { ApolloServer, gql, PubSub } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import http from 'http';

import { chats, users } from '../../db';

import schema from './schema';

const port = process.env.PORT || 7777;
const origin = process.env.ORIGIN || 'http://localhost:3000';

const app = express();

app.use(cors({ credentials: true, origin }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/chats', (req: Request, res: Response) => {
  res.json(chats);
});

const pubsub = new PubSub();
const server = new ApolloServer({
  schema,
  context: (session: any) => {
    const req: Request = session.connection
      ? session.connection.context.request
      : session.req;

    // It's subscription
    if (session.connection) {
      req.cookies = cookie.parse(req.headers.cookie || '');
    }

    return {
      currentUser: users.find(u => u.id === req.cookies.currentUserId),
      pubsub
    };
  },
  subscriptions: {
    onConnect(params, ws, ctx) {
      return {
        request: ctx.request
      };
    }
  }
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: { credentials: true, origin }
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
