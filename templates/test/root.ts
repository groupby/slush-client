import { expect } from 'chai';
import rootApi from '../src';

const api = rootApi.<%= serviceNameCamel %>;

describe('<%= serviceName %> api', () => {
  it('should have some action', () => {
    expect(api.someAction).to.be.a('function');
  });
});
