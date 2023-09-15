import { ResolveField, Resolver, Parent, Context } from '@nestjs/graphql';
import { Post } from './app.service';
import { DataloaderService } from './dataloader.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly dataloaderService: DataloaderService) {}

  @ResolveField('author')
  async author(@Parent() parent: Post, @Context() ctx: never) {
    return this.dataloaderService.dataloader(ctx, 'User').load(parent.author);
  }
}
