import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class MutationResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation('createPost')
  async posts(@Args('title') title: string, @Args('content') content: string) {
    return this.appService.createPost({ title, content, author: '1' });
  }
}
