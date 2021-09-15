import validUrl from 'valid-url'
import first from 'lodash/first'
import isPlainObject from 'lodash/isPlainObject'

import {
  getValuesFromRequest,
  getPathsFromRequest,
  http,
  storage,
  url as urlUtils,
} from 'utils'

/**
 * Handler for creating shortened url.
 *
 * @TODO: add rate limiting and/or abuse blocking
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} The HTTP response object
 */
export async function handler(request) {
  const {url, metadata = null} = await getValuesFromRequest(request, [
    'url',
    'metadata',
  ])

  if (!url || !validUrl.isWebUri(url)) {
    return http.badRequest('A valid `url` param is required!')
  }

  if (metadata && !isPlainObject(metadata)) {
    return http.badRequest('`metadata` must be a plain object!')
  }

  const key = await storage.setValue(url, metadata)
  const shortUrl = urlUtils.RedirectURL(key)
  const response = JSON.stringify({key, shortUrl})

  return new Response(response, {
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
