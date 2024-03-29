import validUrl from 'valid-url'
import first from 'lodash/first'

import {getPathsFromRequest, storage, http} from 'utils'

/**
 * Handler for redirecting requests.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} The HTTP response object
 */
export async function handler(request) {
  const urlKey = first(getPathsFromRequest(request))

  if (!urlKey) {
    return http.badRequest('Invalid key!')
  }

  const url = await storage.getValue(urlKey)

  // @TODO:
  // add better 404 page
  if (!url || !validUrl.isWebUri(url)) {
    return http.notFound('Page not found!')
  }

  return Response.redirect(url, 301)
}

/**
 * Returns a boolean flag indicating whether the current
 * request can be handled by this handler.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Boolean} Whether this handler can handle the request
 */
export function canHandle(request) {
  const requestMethod = request.method
  const paths = getPathsFromRequest(request)
  return requestMethod === 'GET' && paths.length === 1
}
