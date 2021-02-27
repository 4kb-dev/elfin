/**
 * Returns the HTTP 404 Not Found response object,
 * with a provided optional body.
 *
 * @param {BodyInit} [body=null] Optional message
 * @returns {Response} The HTTP response
 */
export default function notFound(body = null) {
  return new Response(body, {status: 404, statusText: 'Not Found'})
}
