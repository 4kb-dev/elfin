import handleRequest from './handleRequest'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
