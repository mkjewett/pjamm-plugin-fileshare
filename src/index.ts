import { registerPlugin } from '@capacitor/core';

import type { PJAMMFileSharePlugin } from './definitions';

const PJAMMFileShare = registerPlugin<PJAMMFileSharePlugin>('PJAMMFileShare', {
  web: () => import('./web').then(m => new m.PJAMMFileShareWeb()),
});

export * from './definitions';
export { PJAMMFileShare };
