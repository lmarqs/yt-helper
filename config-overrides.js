const { rewireWorkboxGenerate, defaultGenerateConfig } = require('react-app-rewire-workbox');
// const path = require('path');

module.exports = function override(config, env) {
    if (env === "production") {
        const workboxConfig = {
            ...defaultGenerateConfig,
            // navigateFallbackDenylist: defaultGenerateConfig.navigateFallbackBlacklist
        };
        
        // delete workboxConfig.navigateFallbackBlacklist;

        return rewireWorkboxGenerate(workboxConfig)(config, env);
    }

    return config;
};