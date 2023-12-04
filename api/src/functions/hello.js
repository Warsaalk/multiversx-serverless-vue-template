import { createResponse } from '../managers/response.js';

/**
 * Get the participant
 *
 * @param {Object} event
 * @returns {Promise<{body: string|null, statusCode: number}>}
 */
export async function handler (event)
{
	return createResponse(200, {hello: "world!"});
}