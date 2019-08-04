import { importSchema } from 'graphql-import';
import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import path from 'path';

import resolvers from './resolvers';

const typeDefsPath = path.join(__dirname, './typeDefs.graphql');

const typeDefs = importSchema(typeDefsPath);

export default makeExecutableSchema({
  resolvers: resolvers as IResolvers,
  typeDefs
});
