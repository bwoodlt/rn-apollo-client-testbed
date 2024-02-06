import { ConfigContext, ExpoConfig } from 'expo/config';
import {
  ConfigPlugin,
  withAppBuildGradle,
  withPlugins,
} from 'expo/config-plugins';

export default ({ config }: ConfigContext): ExpoConfig => {
  return withPlugins(
    {
      ...config,
      name: 'rn-apollo-client-testbed',
      slug: 'rn-apollo-client-testbed',
      version: '1.0.49',
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: 'light',
      scheme: 'rn-apollo-client-testbed',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: true,
        bundleIdentifier: 'apollo.prometheus.testbed',
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#FFFFFF',
        },
        package: 'apollo.prometheus.testbed',
      },
      web: {
        favicon: './assets/favicon.png',
      },

      owner: 'bwoodlt',
      jsEngine: 'hermes',
      plugins: [
        [
          'expo-build-properties',
          {
            ios: {
              flipper: true,
            },
          },
        ],
      ],
    },
    [withSourceMapsInDev]
  );
};

const withSourceMapsInDev: ConfigPlugin = (config) =>
  withAppBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      `
project.ext.react = [`,
      `
project.ext.react = [
    hermesFlagsRelease: ["-O", "-output-source-map"],
    hermesFlagsDebug: ["-O", "-output-source-map"],
`
    );
    return config;
  });
