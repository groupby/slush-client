import { expect } from 'chai';
import rootApi from '../src';
import SomeAction from '../src/some-action';

const api = rootApi.<%= serviceNameCamel %>.someAction;

describe('some action', () => {
  it('should have a builder', () => {
    expect(api.Builder).to.be.ok;
    expect(api.Builder).to.eq(SomeAction.RequestBuilder);
  });
});
