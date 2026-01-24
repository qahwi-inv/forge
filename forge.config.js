const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    extraResources: [
      {
        from: './public',
        to: 'assets'
      }
    ],
    // ↓ Add this block ↓
  osxSign: {}, // optional, but good to have
  osxNotarize: false, // if you don’t notarize
  // ↓ This is the important part ↓
  afterCopy: [
    (buildResult, callback) => {
      // macOS only
      if (buildResult.platform === 'darwin') {
        const plist = require('plist');
        const fs = require('fs');
        const path = require('path');

        const infoPlistPath = path.join(buildResult.appOutDir, 'MyApp.app', 'Contents', 'Info.plist');
        const infoPlist = plist.parse(fs.readFileSync(infoPlistPath, 'utf8'));

        // Set minimum macOS version to 11.0 (Big Sur)
        infoPlist.LSMinimumSystemVersion = '11.0.0';

        fs.writeFileSync(infoPlistPath, plist.build(infoPlist));
      }
      callback();
    }
  ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    // macOS DMG installer (recommended)
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'UDZO', // compressed DMG
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        build: [
          {
            entry: 'src/main.js',
            config: 'vite.main.config.mjs',
            target: 'main',
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs',
            target: 'preload',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',
          },
        ],
      },
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};