import { renderAll, theon } from 'groupby-client-core';
import client from './root';
import SomeAction from './some-action';

client.action(SomeAction.api);

export default renderAll<{ searchandiser: Api } & theon.Request>(client);

export { client };

export interface Constructor {
  (customerId?: string, clientKey?: string): Api;
}

export interface Api extends theon.Request, Constructor {
  someAction: SomeAction.Api;
}
