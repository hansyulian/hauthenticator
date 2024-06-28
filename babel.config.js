module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        "alias": {
          "@config": "./src/config",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@stores": "./src/stores",
          "@assets": "./src/assets",
          "@utils": "./src/utils",
          "@modules": "./src/modules",
          "@storage": "./src/storage",
          "@hooks": "./src/hooks"
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".d.ts",
        ]
      }],
    ]
  };
};
