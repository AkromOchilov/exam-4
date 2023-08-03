import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { createWriteStream } from 'fs'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { GraphQLUpload } from 'graphql-upload-ts';
import { resolve } from 'path';
import mongoose from 'mongoose'
import schema from './modules/index'

// let server = new ApolloServer( { schema } );

const app = express()
app.use( express.static( 'uploads' ) )
const httpServer = http.createServer( app );

mongoose
  .connect( 'mongodb://127.0.0.1/exam' )
  .then( ( d ) => console.log( 'db connection' ) )
  .catch( ( e ) => console.log( 'db error ', e ) );



!async function () {
  const server = new ApolloServer( {
    schema,
    csrfPrevention: false,
    plugins: [ApolloServerPluginDrainHttpServer( { httpServer } )],
  } );


  await server.start();

  app.use(
    '/graphql',
    graphqlUploadExpress( { maxFileSize: 10000000, maxFiles: 1 } ),
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware( server, { context: async ( { req } ) => ( { token: req.headers.authorization } ) } ),
  );

  await new Promise<void>( ( resolve ) =>
    httpServer.listen( { port: 4000 }, resolve ),
  );
  console.log( `🚀 Server ready at http://localhost:4000/` );
}()


