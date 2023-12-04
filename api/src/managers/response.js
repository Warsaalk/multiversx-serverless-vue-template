import { CSP } from "../constants.js";

export const HEADERS = {
    CSP: "Content-Security-Policy",
    HSTS: "Strict-Transport-Security",
    X_FRAME_OPTIONS: "X-Frame-Options",

    LOCATION: "Location",
    CONTENT_TYPE: "Content-Type",
    X_CONTENT_TYPE_OPTION: "X-Content-Type-Options"
};

/**
 *
 * @param {number} code
 * @param {Object=} body
 * @param {string=} type
 * @param {Object=} extraHeaders
 * @returns {Promise<{headers: {}, statusCode: *}>}
 */
export async function createResponse (code, body, type, extraHeaders)
{
    let response = {statusCode: code, headers: {}, multiValueHeaders: {}};

    if ("undefined" === typeof type) {
        type = "json";
    }

    switch (type) {
        case "html":
            response.headers[HEADERS.CONTENT_TYPE] = "text/html";
            break;
        case "redirect":
            response.headers[HEADERS.LOCATION] = body;
            break;
    }

    if ("undefined" !== typeof extraHeaders) {
        addExtraHeaders(response, extraHeaders);
    }

    addDefaultSecurityHeaders(response);

    if (code < 500 && type !== "redirect" && "undefined" !== typeof body) {
        if (type === "json") {
            body = JSON.stringify(body);
        }

        response.body = body;
    }

    return response;
}

/**
 *
 * @param response
 * @param extraHeaders
 */
export function addExtraHeaders (response, extraHeaders)
{
    for (const key in extraHeaders) {
        if (Array.isArray(extraHeaders[key])) {
            response.multiValueHeaders[key] = extraHeaders[key];
        } else {
            response.headers[key] = extraHeaders[key];
        }
    }
}

export function addDefaultSecurityHeaders (response)
{
    const securityHeaders = {
        [HEADERS.HSTS]: "max-age=63072000; includeSubDomains;"
    };

    if (response.headers[HEADERS.X_FRAME_OPTIONS] === void 0) {
        response.headers[HEADERS.X_FRAME_OPTIONS] = "DENY";
    }

    if (response.headers[HEADERS.CSP] === void 0) {
        response.headers[HEADERS.CSP] = `${CSP.DIRECTIVES.FrameAncestors} 'none'`;
    }

    response.headers[HEADERS.X_CONTENT_TYPE_OPTION] = "nosniff";

    addExtraHeaders(response, securityHeaders);
}

/**
 *
 * @returns {string}
 */
export function getAssetsPath ()
{
    if (process.env.ASSETS_DOMAIN === void 0 || process.env.ASSETS_DOMAIN.length === 0) {
        return process.env.ASSETS_PATH;
    }

    return `https://${process.env.ASSETS_DOMAIN}${process.env.ASSETS_PATH}`;
}