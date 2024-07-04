const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      extraNodeModules: {
        ...defaultConfig.resolver.extraNodeModules,
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/screens': path.resolve(__dirname, 'src/screens'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
        '@/assets': path.resolve(__dirname, 'src/assets'),
        '@/types': path.resolve(__dirname, 'src/types'),
        '@/context': path.resolve(__dirname, 'src/context'),
        '@/services': path.resolve(__dirname, 'src/services'),
        '@/navigation': path.resolve(__dirname, 'src/navigation')
      },
    },
    watchFolders: [
      ...defaultConfig.watchFolders,
      path.resolve(__dirname, 'src')
    ],
  };
};
