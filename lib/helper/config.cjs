const fs = require('fs');

/**
 *
 * @param {string} path
 */
module.exports.loadConfig = (path) =>
{
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}