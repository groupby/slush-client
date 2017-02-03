import { theon } from 'groupby-client-core';

const BASE_PATH = '/api/v1/<%= serviceNameSlug %>';

const api = theon()
  .collection('<%= serviceNameCamel %>')
  .basePath(BASE_PATH);

export default api;
