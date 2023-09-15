import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { resolve } from 'node:path';
import { QueryResolver } from './query.resolver';
import { PostResolver } from './post.resolver';
import { MutationResolver } from './mutation.resolver';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      typePaths: [resolve(__dirname, '../schema.gql')],
      context: ({ res }) => ({
        res,
      }),
    }),
  ],
  providers: [
    AppService,
    DataloaderService,
    QueryResolver,
    MutationResolver,
    PostResolver,
  ],
})
export class AppModule {}
