import { createResponse, getAssetsPath } from "../../managers/response.js";


export async function handler (event)
{
	const assetsPath = getAssetsPath();

	console.log(event);

	const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="robots" content="noindex, nofollow">

	<title>Drift Dock</title>

    <link rel="stylesheet" type="text/css" href="${assetsPath}user/index.css"/>
    
    <script type="importmap">
	{
		"imports": {
			"vue": "${assetsPath}user/js/libs/vue.esm-browser.js",
			"vue-router": "${assetsPath}user/js/libs/vue-router.esm-browser.js",
			"@vue/devtools-api": "${assetsPath}user/js/libs/@vue/devtools-api/index.js",
			"@multiversx/sdk-core": "${assetsPath}user/js/libs/@multiversx/sdk-core/index.js"
		}
	}
	</script>
</head>
<body>
	<div id="app">
		<app-header></app-header>
		<div id="view">
			<router-view></router-view>
		</div>
	</div>
	<script src="${assetsPath}user/js/libs/@multiversx/sdk-core.js"></script>
	<script src="${assetsPath}user/index.js" type="module"></script>
</body>
</html>`;

	return createResponse(200, html, "html");
}