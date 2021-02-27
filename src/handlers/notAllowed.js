/**
 * Default handler for any unsupported method.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Response} The HTTP response object
 */
export function handler(request) {
  return new Response('Invalid Usage!', {
    status: 405,
    statusText: 'Method Not Allowed',
  })
}

export function canHandle(request) {
  return true
}
