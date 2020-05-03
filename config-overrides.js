const { rewireWorkboxGenerate, defaultGenerateConfig } = require("react-app-rewire-workbox");
const path = require("path");

module.exports = {
  webpack(config, env) {
    if (env === "production") {
      const workboxConfig = {
        ...defaultGenerateConfig,
      };
      return rewireWorkboxGenerate(workboxConfig)(config, env);
    }
    return config;
  },
  paths(config) {
    return {
      ...config,
      appSrc: resolve("src", "www"),
      appIndexJs: resolve("src", "www", "index.tsx"),
      appTsConfig: resolve("src", "www", "tsconfig.json"),
      appBuild: resolve("build", "web", "public"),
    };
  },
};

function resolve(...relativePath) {
  return path.resolve(process.cwd(), ...relativePath);
}
