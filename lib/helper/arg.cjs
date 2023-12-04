const minimist = require('minimist');

/**
 *
 * @param {Object} defaults
 * @returns {*|{_: []}}
 */
module.exports.getArguments = (defaults) =>
{
	const args = minimist(process.argv.slice(2));

	for (const defaultParameter in defaults) {
		if (args[defaultParameter] === void 0) {
			args[defaultParameter] = defaults[defaultParameter];
		}
	}

	return args;
};