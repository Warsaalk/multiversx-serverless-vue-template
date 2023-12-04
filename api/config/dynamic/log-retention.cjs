const { loadEnvironment } = require('../../../lib/helper/env.cjs');

const { getArguments } = require('../../../lib/helper/arg.cjs');

const cliArguments = getArguments({
	stage: "develop",
	region: "eu-west-1"
});

// Load environment
const
	canStart = loadEnvironment(cliArguments.stage, './serverless.env.yml');
if (!canStart) {
	console.error("Set-up failed");
	return;
} else {
	console.log(`Environment "${cliArguments.stage}" loaded`);
}

module.exports.days = async ({ options, resolveConfigurationProperty }) =>
{
	let logRetentionInDays = 1096;

	if (cliArguments.stage !== "production") {
		logRetentionInDays = 30;
	}

	return {
		app: logRetentionInDays,
		admin: logRetentionInDays
	};
}