import {http} from 'utils'
import handlers from './handlers'

/**
 * Checks the given request and executes the appropriate
 * handler based on the provided handler `canHandle` check.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Response | Promise<Response>} The HTTP response object
 */
export default function handleRequest(request) {
  const toExecute = handlers.find(({canHandle}) => canHandle(request))

  if (!toExecute) {
    return http.badRequest('Invalid Configurations!')
  }

  return toExecute.handler(request)
}
