import 'mocha';
import './root';
import './some-action';

import rootApi from '../src';

rootApi.interceptor((req, res, next) => next('intercept'));
