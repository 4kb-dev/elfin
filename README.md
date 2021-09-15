# elfin

###### https://weg.one

Super fast and simple URL shortener service using [Cloudflare Worker](https://workers.cloudflare.com/).

#### Features

- Super fast redirects with a simple 6 character redirect key
- Ability to store any `metadata` info along with the url
- Tracking for all page views with ability to track custom events (coming soon)

## Usage

#### Creating new short url: `POST /create`

The endpoint allows creating a new shortened url.

###### Simple Usage
Pass `url` key as the json data or as part of the form data.

```sh
curl \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --request POST \
  --data  '{"url":"https://blog.emad.in/building-a-job-queue-for-a-scalable-application-architecture/"}' \
  https://weg.one/create

# response ->
# {
#   "key": "uZdFLt",
#   "shortUrl": "https://weg.one/uZdFLt"
# }
```

###### Tracking metadata for page views (Coming Soon)

Additionally pass `metadata.tracking` key as the json data or as part of the form data to add the information as part of the tracked page views.

```sh
curl \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --request POST \
  --data  '{"url":"...","metadata":{"tracking":{"userId":"xxx-yyy-zzz","prop1":"val1","prop2":"val2"}}}' \
  https://weg.one/create
```

###### Custom event tracking (Coming Soon)

You may also pass `metadata.tracking.event` key to additionally track a custom event in Segment Analytics.

```sh
curl \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --request POST \
  --data  '{"url":"...","metadata":{"tracking":{"event": "context:action","userId":"xxx-yyy-zzz","prop1":"val1","prop2":"val2"}}}' \
  https://weg.one/create
```

#### Using short url: `GET /xxxxxx`

The create endpoint returns a short key that can be used for creating the redirect url. It also returns the complete `shortUrl` based on the deployed environment which can be used instead of building the url on your own.

```json
{
  "key": "uZdFLt",
  "shortUrl": "https://weg.one/uZdFLt"
}

// GET https://weg.one/uZdFLt
// -> redirects to the original url
```

#### Notes

- The `url` value is required while creating the short url
- If the `metadata` field is provided, it should be a valid plain object
- Coming soon
  - Use `metadata.tracking` to add any tracking related properties
  - Use `metadata.tracking.userId` to track page views / custom events specific to a user, otherwise an `anonymousId` is generated while sending the tracking calls
  - Use `metadata.tracking.event` to trigger a custom tracking event

## Development

Check out [CloudFlare Workers documentation](https://developers.cloudflare.com/workers/) to get started and install/configure the necessary tools.

```shell
npm i
npm run dev

# npm run dev --env staging
```

## Publish

###### Staging

```
npm run publish-staging
```

###### Production

```
npm run publish-production
```

## TODO
- Website for explanation and url creation using [Worker Sites](https://developers.cloudflare.com/workers/platform/sites)
- Sentry for error reporting
- Unit tests

## License
`elfin` is licensed under the [MIT License](https://opensource.org/licenses/MIT)