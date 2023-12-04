import { createResponse } from "../../../managers/response.js";

export async function handler (event)
{
	console.log(event);

	return createResponse(200, {data: true});
}