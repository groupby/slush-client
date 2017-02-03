import { theon, BaseConstructor, Builder, BUILDER } from 'groupby-client-core';

namespace SomeAction {
  export interface Constructor extends BaseConstructor<Request, Api, RequestBuilder> { }

  export interface Api extends theon.Request, Constructor { }

  export interface Request {
    // TODO: define request format
  }

  export class RequestBuilder extends Builder<Request> {
    // TODO: implement builder
  }

  export const api = theon()
    .action('someAction');

  api[BUILDER] = RequestBuilder;
}

export default SomeAction;
