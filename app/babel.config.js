const path = require('path');

// babel-preset-expo ships nested under node_modules/expo, so resolve it
// explicitly rather than by bare name (it isn't hoisted to the top level).
const expoPreset = require.resolve('babel-preset-expo', {
  paths: [path.join(__dirname, 'node_modules', 'expo'), __dirname],
});

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [expoPreset],
  };
};
