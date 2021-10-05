import { WebPlugin } from '@capacitor/core';

import type { PJAMMFileSharePlugin } from './definitions';

export class PJAMMFileShareWeb extends WebPlugin implements PJAMMFileSharePlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
