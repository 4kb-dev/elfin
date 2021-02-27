import validUrl from 'valid-url'
import first from 'lodash/first'

import {getKeyFromRequest, getPathsFromRequest, http, storage} from 'utils'

/**
 * Handler for creating shortened url.
 *
 * @TODO: add rate limiting and/or abuse blocking
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} The HTTP response object
 */
export async function handler(request) {
  const url = await getKeyFromRequest(request, 'url')
  if (!url || !validUrl.isWebUri(url)) {
    return http.badRequest('A valid `url` param is required!')
  }

  const key = await storage.setValue(url)

  return new Response(JSON.stringify({key}), {
    status: 200,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
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
  return (
    requestMethod === 'POST' && paths.length === 1 && first(paths) === 'create'
  )
}
