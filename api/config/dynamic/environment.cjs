const { loadEnvironment } = require('../../../lib/helper/env.cjs');

const { getArguments } = require('../../../lib/helper/arg.cjs');

const cliArguments = getArguments({
	stage: "develop",
	region: "eu-west-1"
});

// Load environment
const
	canLoad = loadEnvironment(cliArguments.stage, './serverless.env.yml');
if (!canLoad) {
	console.error("Set-up failed");
	return;
} else {
	console.log(`Environment "${cliArguments.stage}" loaded`);
}

module.exports.build = async ({ options, resolveVariable }) =>
{
	const
		SERVICE = await resolveVariable("self:service"),
		STAGE = await resolveVariable("self:provider.stage"),
		REGION = await resolveVariable("self:provider.region");

	const defaults = {

	};

	const fixed = {SERVICE, STAGE, REGION};

	const environment = await resolveVariable("file(./serverless.env.yml):${self:provider.stage}");

	return Object.assign({}, defaults, environment, fixed);
};