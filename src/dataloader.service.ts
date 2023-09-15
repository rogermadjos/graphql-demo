import { Injectable } from '@nestjs/common';
import { AppService, User } from './app.service';
import * as Dataloader from 'dataloader';
import * as R from 'ramda';

type Context = {
  dataloaders: {
    User: Dataloader<string, User>;
  };
};

@Injectable()
export class DataloaderService {
  constructor(private readonly appService: AppService) {}

  dataloader(ctx: Context, type: 'User'): Dataloader<string, User>;

  dataloader(ctx: Context, type: string): unknown {
    if (!ctx.dataloaders) {
      Object.assign(ctx, { dataloaders: {} });
    }

    if (type === 'User') {
      let dataloader = R.path(['dataloaders', 'User'], ctx);

      if (!dataloader) {
        dataloader = new Dataloader(async (keys: string[]) => {
          return keys.map((key) => this.appService.findUserById(key));
        });

        Object.assign(ctx.dataloaders, { User: dataloader });
      }

      return dataloader;
    }
  }
}
