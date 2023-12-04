import fs from 'fs';

import yaml from 'yaml';

function getCacheTTL (stage) {
	const
		environmentFile = fs.readFileSync('./serverless.env.yml', 'utf8'),
		environment = yaml.parse(environmentFile),
		cacheTTL = parseInt(environment[stage].APP_CACHE_TTL);

	return !isNaN(cacheTTL) ? cacheTTL : 0;
}

export async function app ({ options, resolveConfigurationProperty })
{
	const
		stage = options.stage !== void 0 && options.stage !== null ? options.stage : "develop",
		cacheTTL = getCacheTTL(stage);

	return {
		enabled: cacheTTL > 0,
		clusterSize: "0.5",
		ttlInSeconds: cacheTTL,
		dataEncrypted: true,
		restApiId: "${cf:drift-dock-resources-${self:provider.stage}.apiGatewayRestApiId}",
		perKeyInvalidation: {
			requireAuthorization: true,
			handleUnauthorizedRequests: "IgnoreWithWarning"
		}
	};
}

function indexCacheObject (options, extraCacheParameters)
{
	const
		stage = options.stage !== void 0 ? options.stage : "dev",
		cacheTTL = getCacheTTL(stage);

	const cacheKeyParameters = [
		{name: "request.path.locale"},
		{name: "request.header.Host"},
		{name: "request.querystring.tpl"}
	];

	if (Array.isArray(extraCacheParameters)) {
		for (const extraParameter of extraCacheParameters) {
			cacheKeyParameters.push({name: extraParameter});
		}
	}

	return {
		enabled: cacheTTL > 0,
		cacheKeyParameters
	};
}

export async function index ({ options, resolveConfigurationProperty })
{
	return {
		default: indexCacheObject(options)
	}
}