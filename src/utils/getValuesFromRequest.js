import get from 'lodash/get'
import set from 'lodash/set'
import reduce from 'lodash/reduce'
import every from 'lodash/every'
import mapValues from 'lodash/mapValues'
import getRequestBody from './getRequestBody'

/**
 * For a given `request` and `keys`, the method returns
 * the values sent either as part of query parameters
 * or the request body.
 *
 * @param {Request} request The incoming HTTP request
 * @param {string[]} keys The key to get from the request
 * @returns {Promise<object>} Promise that resolves with the values
 */
export default async function getValuesFromRequest(request, keys) {
  // try getting the value from the request url
  const url = new URL(request.url)
  const values = reduce(
    keys,
    (obj, key) => set(obj, key, url.searchParams.get(key)),
    {}
  )
  const hasAllValues = every(values, (val) => val !== null)
  if (hasAllValues) return values

  // try getting the values from the request body
  try {
    const body = await getRequestBody(request)
    const data = JSON.parse(body)
    return mapValues(values, (val, key) =>
      val !== null ? val : get(data, key, null)
    )
  } catch (err) {}

  // keys not found
  return {}
}
