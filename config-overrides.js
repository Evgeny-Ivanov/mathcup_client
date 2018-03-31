const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin('transform-do-expressions', config);
  return config;
};
