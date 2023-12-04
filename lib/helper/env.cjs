const
    fs = require('fs'),
    yaml = require('js-yaml');

/**
 *
 * @param {string} environment
 * @param {string} path
 */
module.exports.loadEnvironment = (environment, path) =>
{
    const doc = yaml.load(fs.readFileSync(path, 'utf8'));

    if (doc[environment] === void 0) {
        console.error(`No environment "${environment}" found in "${path}".`);
        return false;
    }

    // Always set the environment as the stage
    process.env.STAGE = environment;

    const envConfig = doc[environment];

    for (const envKey in envConfig) {
        process.env[envKey] = envConfig[envKey];
    }

    return true;
};