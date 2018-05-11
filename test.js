var treeify = require('treeify');

console.log(treeify.asTree({
  'README.md': null,
  'client': {
    api: { 'sample.js' : null },
    assets: {
      'images': { 'icon.png': null }
    },
    components: {
      'big-module': {
        'BigModule.jsx': null,
        'BigModuleContainer.jsx': null,
        'submodule-one': {
          'SubmoduleOne.jsx': null, 
          'SubmoduleOneContainer.jsx': null,
        },
      },
      'common': {
        'SmallCommon.jsx': null,
        'big-common': {
          'BigCommon.jsx': null,
          'BigCommonContainer.jsx': null,
        }
      },
      'small-module': {
        'SmallModule.jsx': null,
        'SmallModuleContainer.jsx': null,
      }
    }, 
  },
  config: {
    'config.json': null,
    'webpack.config.js': null,
  },
  'redux': {
    'createStore.js': null,
    'ducks': {
      'sample.js': null,
    },
    'middlewares': {
      'sentryLogging.js': null,
    }
  },
  'app.js': null,
  'translations': {
    'en.json': null,
  }
}));
