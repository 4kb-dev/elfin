/**
 * For a given request, the method tries to identify the request
 * and return the parsed request body string.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<string>} Promise that resolves with the request body
 */
export default async function getRequestBody(request) {
  const {headers} = request
  const contentType = headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return JSON.stringify(await request.json())
  }

  if (contentType.includes('form')) {
    const formData = await request.formData()
    const body = {}
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1]
    }
    return JSON.stringify(body)
  }

  if (contentType.includes('application/text')) {
    return await request.text()
  }

  if (contentType.includes('text/html')) {
    return await request.text()
  }

  const myBlob = await request.blob()
  const objectURL = URL.createObjectURL(myBlob)
  return objectURL
}
