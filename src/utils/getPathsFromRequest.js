import split from 'lodash/split'
import compact from 'lodash/compact'

/**
 * For a given request, the method parses and returns an array of paths.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {string[]} An array of path strings
 */
export default function getPathsFromRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  return compact(split(pathname, '/'))
}
