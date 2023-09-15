import { Query, Resolver, Args } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class QueryResolver {
  constructor(private readonly appService: AppService) {}

  @Query('me')
  async me() {
    return this.appService.findUserById('1');
  }

  @Query('posts')
  async posts(
    @Args('offset') offset?: number,
    @Args('first') first?: number,
    @Args('filter') filter?: { author?: string },
  ) {
    return this.appService.findPosts({ offset, first, filter });
  }
}
