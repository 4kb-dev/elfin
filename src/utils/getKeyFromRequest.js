import get from 'lodash/get'
import getRequestBody from './getRequestBody'

/**
 * For a given `request` and `key`, the method returns
 * the value sent either as part of query parameters
 * or the request body.
 *
 * @param {Request} request The incoming HTTP request
 * @param {string} key The key to get from the request
 * @returns {Promise<string>} Promise that resolves with the value
 */
export default async function getKeyFromRequest(request, key) {
  // try getting the value from the request url
  const url = new URL(request.url)
  const val = url.searchParams.get(key)
  if (val !== null) {
    return val
  }

  // try getting the value from the request body
  try {
    const body = await getRequestBody(request)
    const data = JSON.parse(body)
    return get(data, key, null)
  } catch (err) {}

  // key not found
  return null
}
