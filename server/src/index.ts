import express, { Request, Response } from 'express';
4;
import cors from 'cors';
import { chats } from '../../db';

const port = process.env.PORT || 7777;

const app = express();

app.use(cors());

app.get('/chats', (req: Request, res: Response) => {
  res.json(chats);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
