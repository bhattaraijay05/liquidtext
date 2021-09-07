module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './app/assets',
          '@hooks': './app/hooks',
          '@navigations': './app/navigations',
          '@context': './app/context',
          '@utils': './app/utils',
          '@screens': './app/screens',
          '@helpers': './app/helpers',
          '@constants': './app/constants',
          '@elements': './app/elements',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
