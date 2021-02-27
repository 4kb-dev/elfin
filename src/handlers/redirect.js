import split from 'lodash/split'
import compact from 'lodash/compact'
import first from 'lodash/first'
import validUrl from 'valid-url'

import {badRequest, notFound} from 'utils/http.utils'

/**
 * Handler for redirecting requests
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} The HTTP response object
 */
export async function handler(request) {
  const websiteKey = first(getPathsFromRequest(request))

  if (!websiteKey) {
    return badRequest('Invalid key')
  }

  const url = await KV.get(websiteKey)

  // @TODO:
  // add better 404 page
  if (!url || !validUrl.isWebUri(url)) {
    return notFound('Page not found!')
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

function getPathsFromRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  return compact(split(pathname, '/'))
}
