// Minimal Metro config that extends Expo's defaults. Required by
// `expo doctor` and assumed by the Sentry source-map upload step.
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
