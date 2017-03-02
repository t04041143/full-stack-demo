'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  service: {
    baseUrl: "http://127.0.0.1:1099"
  }
};

export default Object.freeze(Object.assign({}, baseConfig, config));
