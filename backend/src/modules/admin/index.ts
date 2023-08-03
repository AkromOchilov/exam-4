import { readFileSync } from 'fs';
import { resolve } from 'path';

import resolvers from './resolvers';
let schema = readFileSync( resolve( 'src', 'modules', 'admin/schema.gql' ), 'utf-8' )

export default {
  resolvers,
  typeDefs: schema
}
