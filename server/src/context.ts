import { PubSub } from 'apollo-server-express';

import { IUser } from '../../db';

export type MyContext = {
  pubsub: PubSub;
  currentUser: IUser;
};
