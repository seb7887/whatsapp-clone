import path from 'path';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefsPath = path.join(__dirname, './typeDefs.graphql');

const typeDefs = importSchema(typeDefsPath);

export default makeExecutableSchema({ resolvers, typeDefs });
