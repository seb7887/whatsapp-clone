import { ApolloServer, gql } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';
import schema from './schema';
import { chats } from '../../db';

const port = process.env.PORT || 7777;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/chats', (req: Request, res: Response) => {
  res.json(chats);
});

const server = new ApolloServer({ schema });

server.applyMiddleware({
  app,
  path: '/graphql'
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
