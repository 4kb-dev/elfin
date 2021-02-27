/**
 * Returns the HTTP 400 Bad Request response object,
 * with a provided optional message.
 *
 * @param {String} [message=null] Optional message
 * @returns {Response} The HTTP response
 */
export default function badRequest(message = null) {
  return new Response(message, {status: 400, statusText: 'Bad Request'})
}
