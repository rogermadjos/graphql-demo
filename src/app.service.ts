import { Injectable } from '@nestjs/common';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import * as R from 'ramda';

export type User = {
  id: string;
  name: string;
  emailAddress: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

@Injectable()
export class AppService {
  private readonly users: User[] = JSON.parse(
    readFileSync(resolve(__dirname, '../users.json'), 'utf8'),
  );

  private readonly posts: Post[] = JSON.parse(
    readFileSync(resolve(__dirname, '../posts.json'), 'utf8'),
  );

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findPosts(params: {
    filter?: { author?: string };
    offset?: number;
    first?: number;
  }): Post[] {
    let posts: (a: Post[]) => Post[] = R.identity;

    if (params.filter?.author) {
      posts = R.compose(
        R.filter((elem: Post) => elem.author === params.filter.author),
        posts,
      );
    }

    if (params.offset) {
      posts = R.compose(R.drop(params.offset), posts);
    }

    if (params.first) {
      posts = <(a: Post[]) => Post[]>R.compose(R.take(params.first), posts);
    }

    return posts(this.posts);
  }

  createPost(params: { title: string; content: string; author: string }) {
    const post: Post = {
      ...params,
      id: (this.posts.length + 1).toString(),
    };

    this.posts.push(post);

    return post;
  }
}
