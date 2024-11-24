[Go to Postman homepage](/)

Product

[Pricing](https://www.postman.com/pricing/) [Enterprise](https://www.postman.com/postman-enterprise/)

Resources and Support

[Public API Network](https://www.postman.com/explore)

Search Postman

[Sign In](https://identity.getpostman.com/login?continue=https%3A%2F%2Fwww.postman.com%2Fnotionhq%2Fnotion-s-api-workspace%2Fdocumentation%2Fy28pjg6%2Fnotion-api) [Sign Up for Free](https://identity.getpostman.com/signup?continue=https%3A%2F%2Fwww.postman.com%2Fnotionhq%2Fnotion-s-api-workspace%2Fdocumentation%2Fy28pjg6%2Fnotion-api&utm_source=postman&utm_medium=app_web&utm_content=navbar&utm_term=sign_up)

99+

![](https://res.cloudinary.com/postman/image/upload/t_user_profile_300/v1/user/default-9)

![](https://res.cloudinary.com/postman/image/upload/t_user_profile_300/v1/user/default-8)

[Sign In](https://identity.getpostman.com/login?continue=https%3A%2F%2Fwww.postman.com%2Fnotionhq%2Fnotion-s-api-workspace%2Fdocumentation%2Fy28pjg6%2Fnotion-api) [Sign Up for Free](https://identity.getpostman.com/signup?continue=https%3A%2F%2Fwww.postman.com%2Fnotionhq%2Fnotion-s-api-workspace%2Fdocumentation%2Fy28pjg6%2Fnotion-api&utm_source=postman&utm_medium=app_web&utm_content=navbar&utm_term=sign_up)

Notion API

No environment

Notion API Documentation

Fork

63.9k

View Collection

Publish

Version

CURRENT

Language

cURL

# Notion API Documentation

Hello and welcome!

To make use of this API collection collection as it's written, please duplicate [this database template](https://www.notion.so/8e2c2b769e1d47d287b9ed3035d607ae?v=dc1b92875fb94f10834ba8d36549bd2a).

Under the `Variables` tab, add your environment variables to start making requests. You will need to [create an integration](https://www.notion.so/my-integrations) to retrieve an API token. You will also need additional values, such as a database ID and page ID, which can be found in your Notion workspace or from the database template mentioned above.

For our full documentation, including sample integrations and guides, visit [developers.notion.com](https://developers.notion.com/) ﻿.

Please note: Pages that are parented by a database _must_ have the same properties as the parent database. If you are not using the database template provided, the request `body` for the page endpoints included in this collection should be updated to match the properties in the parent database being used. See documentation for [Creating a page](https://developers.notion.com/reference/post-page) for more information.

To learn more about creating an access token, see our [official documentation](https://developers.notion.com/reference/create-a-token) and read our [Authorization](https://developers.notion.com/docs/authorization#step-3-send-the-code-in-a-post-request-to-the-notion-api) guide.

Need more help? Join our [developer community on Slack](https://join.slack.com/t/notiondevs/shared_invite/zt-20b5996xv-DzJdLiympy6jP0GGzu3AMg) ﻿.

Authorization Bearer Token

Token

## Users

All actions in a Notion workspace are associated to a [user](https://developers.notion.com/reference/user), whether it be a bot via a [Notion integration](https://developers.notion.com/docs/getting-started) or a person interacting with Notion’s UI.

These endpoints allow developers to interact with users programmatically by [listing all users](https://developers.notion.com/reference/get-user), [retrieving information about your integration’s bot](https://developers.notion.com/reference/get-self), or [retrieving a specific user](https://developers.notion.com/reference/get-user) in your Notion workspace.

To learn more, read [Notion’s official documentation](https://developers.notion.com/reference/user) for endpoints related to users.

Authorization Bearer Token

This folder is using an authorization helper from collection Notion API

### GET[Retrieve a user](https://www.postman.com/notionhq/notion-s-api-workspace/request/lp18v3f/retrieve-a-user)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/lp18v3f/retrieve-a-user)

https://api.notion.com/v1/users/:id

Retrieve a user object using the ID specified in the request path.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Example

200 Success - Retrieve a user

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/users/:id' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (24)

json

```json highlighted-code__code
{
  "object": "user",
  "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a",
  "name": "Aman Gupta",
  "avatar_url": null,
  "type": "person",
  "person": {
    "email": "XXXXXXXXXXX"
  }
}
```

Date

Thu, 24 Feb 2022 21:47:15 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=fea88c33-653a-46dd-aa1e-df7d0abad5e9; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 21:47:15 GMT; Secure

Set-Cookie

notion_experiment_device_id=1eac67e9-88ff-419d-b36e-cb9da86be0a0; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 21:47:15 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 21:47:15 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"9b-qoibMBKquYk09T0oogqvLGu9qu4"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2be42d784c97c3-SJC

Content-Encoding

gzip

### GET[List all users](https://www.postman.com/notionhq/notion-s-api-workspace/request/857sd35/list-all-users)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/857sd35/list-all-users)

https://api.notion.com/v1/users

Returns a paginated list of user objects for a workspace

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Example

200 Success - List all users

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/users' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "list",
    "results": [\
        {\
            "object": "user",\
            "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a",\
            "name": "Aman Gupta",\
            "avatar_url": null,\
            "type": "person",\
            "person": {\
                "email": "XXXXXXXXXX"\
            }\
        },\
        {\
            "object": "user",\
            "id": "92a680bb-6970-4726-952b-4f4c03bff617",\
            "name": "Leotastic",\
            "avatar_url": null,\
            "type": "bot",\
            "bot": {\
                "owner": {\
                    "type": "workspace",\
                    "workspace": true\
                }\
            }\
        }\
    ],
    "next_cursor": null,
    "has_more": false
}
```

Date

Thu, 24 Feb 2022 21:48:25 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=283b76c0-6019-4ef7-93cf-1b0b30ae6052; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 21:48:25 GMT; Secure

Set-Cookie

notion_experiment_device_id=6ca49142-a886-4652-a7b8-0a5a0639ed27; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 21:48:25 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 21:48:25 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"6e4-sni6uhyjO+1Rwt4GEaScNm+SLr4"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2be5e27e9797c3-SJC

### GET[Retrieve your token’s bot user](https://www.postman.com/notionhq/notion-s-api-workspace/request/puu2r8x/retrieve-your-tokens-bot-user)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/puu2r8x/retrieve-your-tokens-bot-user)

https://api.notion.com/v1/users/me

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Example

200 Success - Retrieve bot's user info

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/users/me' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
  "object": "user",
  "id": "92a680bb-6970-4726-952b-4f4c03bff617",
  "name": "Leotastic",
  "avatar_url": null,
  "type": "bot",
  "bot": {
    "owner": {
      "type": "workspace",
      "workspace": true
    }
  }
}
```

Date

Thu, 24 Feb 2022 22:56:24 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=eb807879-a7fa-42d6-8d5f-4b83ef355dc7; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:56:24 GMT; Secure

Set-Cookie

notion_experiment_device_id=62526058-6602-4885-801f-c12678c23a80; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:56:24 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:56:24 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"a5-8nKyiCE+m0Dwog4u0m9EY+DyENY"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2c497a6f659452-SJC

Content-Encoding

gzip

## Databases

Databases represent collections of Notion pages that can be [sorted](https://developers.notion.com/reference/post-database-query-sort) and [queried](https://developers.notion.com/reference/post-database-query). Each database will have a schema (or properties) that represent the columns in the database table. Notion offers several types of properties, as described in the [official documentation](https://developers.notion.com/reference/property-object).

These database-related endpoints allow developers to work with databases programmatically by [creating](https://developers.notion.com/reference/create-a-database), [retrieving](https://developers.notion.com/reference/retrieve-a-database), and [updating](https://developers.notion.com/reference/update-a-database) them.

To learn more, read [Notion’s official documentation](https://developers.notion.com/reference/database) for endpoints related to databases. We also recommend reading the official Notion guide for [working with databases](https://developers.notion.com/docs/working-with-page-content).

Authorization Bearer Token

This folder is using an authorization helper from collection Notion API

### GET[Retrieve a database](https://www.postman.com/notionhq/notion-s-api-workspace/request/fed4cg0/retrieve-a-database)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/fed4cg0/retrieve-a-database)

https://api.notion.com/v1/databases/:id

Retrieves a database object using the ID specified in the request path.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Example

200 Success - Retrieve a Database

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/databases/:id' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (23)

View More

json

```json highlighted-code__code
{
    "object": "database",
    "id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae",
    "cover": null,
    "icon": null,
    "created_time": "2021-04-27T20:38:00.000Z",
    "created_by": {
        "object": "user",
        "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"
    },
    "last_edited_by": {
        "object": "user",
        "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"
    },
    "last_edited_time": "2022-02-24T22:14:00.000Z",
    "title": [\
        {\
            "type": "text",\
            "text": {\
                "content": "Ever Better Reading List Title",\
                "link": null\
            },\
            "annotations": {\
                "bold": false,\
                "italic": false,\
                "strikethrough": false,\
                "underline": false,\
                "code": false,\
                "color": "default"\
            },\
            "plain_text": "Ever Better Reading List Title",\
            "href": null\
        }\
    ],
    "properties": {
        "Score /5": {
            "id": ")Y7%22",
            "name": "Score /5",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "b7307e35-c80a-4cb5-bb6b-6054523b394a",\
                        "name": "⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "9b1e1349-8e24-40ba-bbca-84a61296bc81",\
                        "name": "⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "66d3d050-086c-4a91-8c56-d55dc67e7789",\
                        "name": "⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "d3782c76-0396-467f-928e-46bf0c9d5fba",\
                        "name": "⭐️",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Type": {
            "id": "%2F7eo",
            "name": "Type",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    },\
                    {\
                        "id": "4ac85597-5db1-4e0a-9c02-445575c38f76",\
                        "name": "TV Series",\
                        "color": "default"\
                    },\
                    {\
                        "id": "2991748a-5745-4c3b-9c9b-2d6846a6fa1f",\
                        "name": "Film",\
                        "color": "default"\
                    },\
                    {\
                        "id": "82f3bace-be25-410d-87fe-561c9c22492f",\
                        "name": "Podcast",\
                        "color": "default"\
                    },\
                    {\
                        "id": "861f1076-1cc4-429a-a781-54947d727a4a",\
                        "name": "Academic Journal",\
                        "color": "default"\
                    },\
                    {\
                        "id": "9cc30548-59d6-4cd3-94bc-d234081525c4",\
                        "name": "Essay Resource",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Publisher": {
            "id": "%3E%24Pb",
            "name": "Publisher",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    },\
                    {\
                        "id": "1b9b0c0c-17b0-4292-ad12-1364a51849de",\
                        "name": "Netflix",\
                        "color": "blue"\
                    },\
                    {\
                        "id": "f3533637-278f-4501-b394-d9753bf3c101",\
                        "name": "Indie",\
                        "color": "brown"\
                    },\
                    {\
                        "id": "e70d713c-4be4-4b40-a44d-fb413c8b9d7e",\
                        "name": "Bon Appetit",\
                        "color": "yellow"\
                    },\
                    {\
                        "id": "9c2bd667-0a10-4be4-a044-35a537a14ab9",\
                        "name": "Franklin Institute",\
                        "color": "pink"\
                    },\
                    {\
                        "id": "6849b5f0-e641-4ec5-83cb-1ffe23011060",\
                        "name": "Springer",\
                        "color": "orange"\
                    },\
                    {\
                        "id": "6a5bff63-a72d-4464-a5d0-1a601af2adf6",\
                        "name": "Emerald Group",\
                        "color": "gray"\
                    },\
                    {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                ]
            }
        },
        "Summary": {
            "id": "%3F%5C25",
            "name": "Summary",
            "type": "rich_text",
            "rich_text": {}
        },
        "Publishing/Release Date": {
            "id": "%3Fex%2B",
            "name": "Publishing/Release Date",
            "type": "date",
            "date": {}
        },
        "Link": {
            "id": "VVMi",
            "name": "Link",
            "type": "url",
            "url": {}
        },
        "Read": {
            "id": "_MWJ",
            "name": "Read",
            "type": "checkbox",
            "checkbox": {}
        },
        "Status": {
            "id": "%60zz5",
            "name": "Status",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    },\
                    {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    },\
                    {\
                        "id": "59aa9043-07b4-4bf4-8734-3164b13af44a",\
                        "name": "Finished",\
                        "color": "blue"\
                    },\
                    {\
                        "id": "f961978d-02eb-4998-933a-33c2ec378564",\
                        "name": "Listening",\
                        "color": "red"\
                    },\
                    {\
                        "id": "1d450853-b27a-45e2-979f-448aa1bd35de",\
                        "name": "Watching",\
                        "color": "red"\
                    }\
                ]
            }
        },
        "Author": {
            "id": "qNw_",
            "name": "Author",
            "type": "multi_select",
            "multi_select": {
                "options": [\
                    {\
                        "id": "15592971-7b30-43d5-9406-2eb69b13fcae",\
                        "name": "Spencer Greenberg",\
                        "color": "default"\
                    },\
                    {\
                        "id": "b80a988e-dccf-4f74-b764-6ca0e49ed1b8",\
                        "name": "Seth Stephens-Davidowitz",\
                        "color": "default"\
                    },\
                    {\
                        "id": "0e71ee06-199d-46a4-834c-01084c8f76cb",\
                        "name": "Andrew Russell",\
                        "color": "default"\
                    },\
                    {\
                        "id": "5807ec38-4879-4455-9f30-5352e90e8b79",\
                        "name": "Lee Vinsel",\
                        "color": "default"\
                    },\
                    {\
                        "id": "4cf10a64-f3da-449c-8e04-ce6e338bbdbd",\
                        "name": "Megan Greenwell",\
                        "color": "default"\
                    },\
                    {\
                        "id": "833e2c78-35ed-4601-badc-50c323341d76",\
                        "name": "Kara Swisher",\
                        "color": "default"\
                    },\
                    {\
                        "id": "82e594e2-b1c5-4271-ac19-1a723a94a533",\
                        "name": "Paul Romer",\
                        "color": "default"\
                    },\
                    {\
                        "id": "ae3a2cbe-1fc9-4376-be35-331628b34623",\
                        "name": "Karen Swallow Prior",\
                        "color": "default"\
                    },\
                    {\
                        "id": "da068e78-dfe2-4434-9fd7-b7450b3e5830",\
                        "name": "Judith Shulevitz",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Name": {
            "id": "title",
            "name": "Name",
            "type": "title",
            "title": {}
        }
    },
    "parent": {
        "type": "page_id",
        "page_id": "c4d39556-6364-46a1-8a61-ebbb668f7445"
    },
    "url": "https://www.notion.so/8e2c2b769e1d47d287b9ed3035d607ae",
    "archived": false
}
```

Date

Wed, 02 Mar 2022 05:19:28 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=4ea6cddf-635b-4117-9f1a-6a9385a43763; Domain=www.notion.so; Path=/; Expires=Thu, 02 Mar 2023 05:19:28 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Thu, 03 Mar 2022 05:19:28 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"110f-R5+JLAgaiYySC0RHfDR5I4HPYWU"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e57ad7a19c482ab-IAD

### POST[Query a database](https://www.postman.com/notionhq/notion-s-api-workspace/request/8niy1t1/query-a-database)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/8niy1t1/query-a-database)

https://api.notion.com/v1/databases/:id/query

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Authorization

Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns

Content-Type

application/json

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

View More

json

```json highlighted-code__code
{
    "filter": {
        "property": "Status",
        "select": {
            "equals": "Reading"
        }
    },
    "sorts": [\
        {\
        "property": "Name",\
        "direction": "ascending"\
        }\
    ]
}
```

Example

200 Success - Query a Database (OR)

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/databases/:id/query' \
--header 'Authorization: Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "filter": {
        "or": [\
            {\
                "property": "Status",\
                "select": {\
                    "equals": "Reading"\
                }\
            },\
            {\
                "property": "Publisher",\
                "select": {\
                    "equals": "NYT"\
                }\
            }\
        ]
    },
    "sorts": [\
        {\
            "property": "Score /5",\
            "direction": "ascending"\
        }\
    ]
}'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "list",
    "results": [\
        {\
            "object": "page",\
            "id": "a1712d54-53e4-4893-a69d-4d581cd2c845",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-05-12T06:07:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "b7307e35-c80a-4cb5-bb6b-6054523b394a",\
                        "name": "⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2018-10-21",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": true\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "833e2c78-35ed-4601-badc-50c323341d76",\
                            "name": "Kara Swisher",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Who Will Teach Silicon Valley to Be Ethical? ",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Who Will Teach Silicon Valley to Be Ethical? ",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/Who-Will-Teach-Silicon-Valley-to-Be-Ethical-a1712d5453e44893a69d4d581cd2c845"\
        },\
        {\
            "object": "page",\
            "id": "557ef501-bfdb-4586-918e-4434f31bca8c",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-04-27T20:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "66d3d050-086c-4a91-8c56-d55dc67e7789",\
                        "name": "⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "9cc30548-59d6-4cd3-94bc-d234081525c4",\
                        "name": "Essay Resource",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2016-10-03",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.theatlantic.com/entertainment/archive/2016/03/how-jane-eyre-created-the-modern-self/460461/"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "ae3a2cbe-1fc9-4376-be35-331628b34623",\
                            "name": "Karen Swallow Prior",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Jane Eyre",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": true,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Jane Eyre",\
                            "href": null\
                        },\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": " and the Invention of Self",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": " and the Invention of Self",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/Jane-Eyre-and-the-Invention-of-Self-557ef501bfdb4586918e4434f31bca8c"\
        },\
        {\
            "object": "page",\
            "id": "7ea694fa-93bb-43ba-b342-90a7706e55aa",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-04-27T20:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": null\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Putting a levy on targeted ad revenue would give Facebook and Google a real incentive to change their dangerous business models.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Putting a levy on targeted ad revenue would give Facebook and Google a real incentive to change their dangerous business models.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2019-10-06",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2019/05/06/opinion/tax-facebook-google.html"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "82e594e2-b1c5-4271-ac19-1a723a94a533",\
                            "name": "Paul Romer",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "A Tax That Could Fix Big Tech ",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "A Tax That Could Fix Big Tech ",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/A-Tax-That-Could-Fix-Big-Tech-7ea694fa93bb43bab34290a7706e55aa"\
        }\
    ],
    "next_cursor": null,
    "has_more": false
}
```

Date

Thu, 24 Feb 2022 22:00:15 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=e65d073e-cb03-48ab-b310-992f3978f62e; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:00:14 GMT; Secure

Set-Cookie

notion_experiment_device_id=1c169f34-d6a0-4450-b0f0-ee7fda61dfb0; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:00:14 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:00:14 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"1a63-+QDV6pM/Vjm4RPaNIt/bBmTxafA"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2bf734ee3a97c3-SJC

### POST[Sort a database](https://www.postman.com/notionhq/notion-s-api-workspace/request/ert0z5p/sort-a-database)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/ert0z5p/sort-a-database)

https://api.notion.com/v1/databases/:id/query

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Authorization

Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns

Content-Type

application/json

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

json

```json highlighted-code__code
{
    "sorts": [\
        {\
        "property": "Name",\
        "direction": "ascending"\
        }\
    ]
}
```

Example

200 Success - Query a Database (OR)

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/databases/:id/query' \
--header 'Authorization: Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "filter": {
        "or": [\
            {\
                "property": "Status",\
                "select": {\
                    "equals": "Reading"\
                }\
            },\
            {\
                "property": "Publisher",\
                "select": {\
                    "equals": "NYT"\
                }\
            }\
        ]
    },
    "sorts": [\
        {\
            "property": "Score /5",\
            "direction": "ascending"\
        }\
    ]
}'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "list",
    "results": [\
        {\
            "object": "page",\
            "id": "a1712d54-53e4-4893-a69d-4d581cd2c845",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-05-12T06:07:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "b7307e35-c80a-4cb5-bb6b-6054523b394a",\
                        "name": "⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2018-10-21",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": true\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "833e2c78-35ed-4601-badc-50c323341d76",\
                            "name": "Kara Swisher",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Who Will Teach Silicon Valley to Be Ethical? ",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Who Will Teach Silicon Valley to Be Ethical? ",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/Who-Will-Teach-Silicon-Valley-to-Be-Ethical-a1712d5453e44893a69d4d581cd2c845"\
        },\
        {\
            "object": "page",\
            "id": "557ef501-bfdb-4586-918e-4434f31bca8c",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-04-27T20:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "66d3d050-086c-4a91-8c56-d55dc67e7789",\
                        "name": "⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "9cc30548-59d6-4cd3-94bc-d234081525c4",\
                        "name": "Essay Resource",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2016-10-03",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.theatlantic.com/entertainment/archive/2016/03/how-jane-eyre-created-the-modern-self/460461/"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "ae3a2cbe-1fc9-4376-be35-331628b34623",\
                            "name": "Karen Swallow Prior",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Jane Eyre",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": true,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Jane Eyre",\
                            "href": null\
                        },\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": " and the Invention of Self",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": " and the Invention of Self",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/Jane-Eyre-and-the-Invention-of-Self-557ef501bfdb4586918e4434f31bca8c"\
        },\
        {\
            "object": "page",\
            "id": "7ea694fa-93bb-43ba-b342-90a7706e55aa",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-04-27T20:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": null\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Putting a levy on targeted ad revenue would give Facebook and Google a real incentive to change their dangerous business models.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Putting a levy on targeted ad revenue would give Facebook and Google a real incentive to change their dangerous business models.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2019-10-06",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2019/05/06/opinion/tax-facebook-google.html"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "82e594e2-b1c5-4271-ac19-1a723a94a533",\
                            "name": "Paul Romer",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "A Tax That Could Fix Big Tech ",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "A Tax That Could Fix Big Tech ",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/A-Tax-That-Could-Fix-Big-Tech-7ea694fa93bb43bab34290a7706e55aa"\
        }\
    ],
    "next_cursor": null,
    "has_more": false
}
```

Date

Thu, 24 Feb 2022 22:00:15 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=e65d073e-cb03-48ab-b310-992f3978f62e; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:00:14 GMT; Secure

Set-Cookie

notion_experiment_device_id=1c169f34-d6a0-4450-b0f0-ee7fda61dfb0; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:00:14 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:00:14 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"1a63-+QDV6pM/Vjm4RPaNIt/bBmTxafA"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2bf734ee3a97c3-SJC

### POST[Filter a database](https://www.postman.com/notionhq/notion-s-api-workspace/request/nb8s6fg/filter-a-database)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/nb8s6fg/filter-a-database)

https://api.notion.com/v1/databases/:id/query

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Authorization

Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns

Content-Type

application/json

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

json

```json highlighted-code__code
{
  "filter": {
    "property": "Status",
    "select": {
      "equals": "Reading"
    }
  }
}
```

Example

200 Success - Query a Database (OR)

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/databases/:id/query' \
--header 'Authorization: Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "filter": {
        "or": [\
            {\
                "property": "Status",\
                "select": {\
                    "equals": "Reading"\
                }\
            },\
            {\
                "property": "Publisher",\
                "select": {\
                    "equals": "NYT"\
                }\
            }\
        ]
    },
    "sorts": [\
        {\
            "property": "Score /5",\
            "direction": "ascending"\
        }\
    ]
}'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "list",
    "results": [\
        {\
            "object": "page",\
            "id": "a1712d54-53e4-4893-a69d-4d581cd2c845",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-05-12T06:07:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "b7307e35-c80a-4cb5-bb6b-6054523b394a",\
                        "name": "⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2018-10-21",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": true\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "833e2c78-35ed-4601-badc-50c323341d76",\
                            "name": "Kara Swisher",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Who Will Teach Silicon Valley to Be Ethical? ",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Who Will Teach Silicon Valley to Be Ethical? ",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/Who-Will-Teach-Silicon-Valley-to-Be-Ethical-a1712d5453e44893a69d4d581cd2c845"\
        },\
        {\
            "object": "page",\
            "id": "557ef501-bfdb-4586-918e-4434f31bca8c",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-04-27T20:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "66d3d050-086c-4a91-8c56-d55dc67e7789",\
                        "name": "⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "9cc30548-59d6-4cd3-94bc-d234081525c4",\
                        "name": "Essay Resource",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2016-10-03",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.theatlantic.com/entertainment/archive/2016/03/how-jane-eyre-created-the-modern-self/460461/"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "ae3a2cbe-1fc9-4376-be35-331628b34623",\
                            "name": "Karen Swallow Prior",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Jane Eyre",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": true,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Jane Eyre",\
                            "href": null\
                        },\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": " and the Invention of Self",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": " and the Invention of Self",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/Jane-Eyre-and-the-Invention-of-Self-557ef501bfdb4586918e4434f31bca8c"\
        },\
        {\
            "object": "page",\
            "id": "7ea694fa-93bb-43ba-b342-90a7706e55aa",\
            "created_time": "2021-04-27T20:38:00.000Z",\
            "last_edited_time": "2021-04-27T20:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": null\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Putting a levy on targeted ad revenue would give Facebook and Google a real incentive to change their dangerous business models.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Putting a levy on targeted ad revenue would give Facebook and Google a real incentive to change their dangerous business models.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2019-10-06",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2019/05/06/opinion/tax-facebook-google.html"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": [\
                        {\
                            "id": "82e594e2-b1c5-4271-ac19-1a723a94a533",\
                            "name": "Paul Romer",\
                            "color": "default"\
                        }\
                    ]\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "A Tax That Could Fix Big Tech ",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "A Tax That Could Fix Big Tech ",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/A-Tax-That-Could-Fix-Big-Tech-7ea694fa93bb43bab34290a7706e55aa"\
        }\
    ],
    "next_cursor": null,
    "has_more": false
}
```

Date

Thu, 24 Feb 2022 22:00:15 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=e65d073e-cb03-48ab-b310-992f3978f62e; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:00:14 GMT; Secure

Set-Cookie

notion_experiment_device_id=1c169f34-d6a0-4450-b0f0-ee7fda61dfb0; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:00:14 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:00:14 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"1a63-+QDV6pM/Vjm4RPaNIt/bBmTxafA"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2bf734ee3a97c3-SJC

### POST[Create a database](https://www.postman.com/notionhq/notion-s-api-workspace/request/gucygi6/create-a-database)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/gucygi6/create-a-database)

https://api.notion.com/v1/databases/

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Content-Type

application/json

Notion-Version

2022-02-22

Bodyraw (json)

View More

json

```json highlighted-code__code
{
    "parent": {
        "type": "page_id",
        "page_id": ""
    },
    "title": [\
        {\
            "type": "text",\
            "text": {\
                "content": "Grocery List",\
                "link": null\
            }\
        }\
    ],
    "properties": {
        "Name": {
            "title": {}
        },
        "Description": {
            "rich_text": {}
        },
        "In stock": {
            "checkbox": {}
        },
        "Food group": {
            "select": {
                "options": [\
                    {\
                        "name": "🥦Vegetable",\
                        "color": "green"\
                    },\
                    {\
                        "name": "🍎Fruit",\
                        "color": "red"\
                    },\
                    {\
                        "name": "💪Protein",\
                        "color": "yellow"\
                    }\
                ]
            }
        },
        "Price": {
            "number": {
                "format": "dollar"
            }
        },
        "Last ordered": {
            "date": {}
        },
        "Store availability": {
            "type": "multi_select",
            "multi_select": {
                "options": [\
                    {\
                        "name": "Duc Loi Market",\
                        "color": "blue"\
                    },\
                    {\
                        "name": "Rainbow Grocery",\
                        "color": "gray"\
                    },\
                    {\
                        "name": "Nijiya Market",\
                        "color": "purple"\
                    },\
                    {\
                        "name": "Gus's Community Market",\
                        "color": "yellow"\
                    }\
                ]
            }
        },
        "+1": {
            "people": {}
        },
        "Photo": {
            "files": {}
        }
    }
}
```

Example

200 Success - Create a database

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/databases/' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "parent": {
        "type": "page_id",
        "page_id": ""
    },
    "title": [\
        {\
            "type": "text",\
            "text": {\
                "content": "Grocery List",\
                "link": null\
            }\
        }\
    ],
    "properties": {
        "Name": {
            "title": {}
        },
        "Description": {
            "rich_text": {}
        },
        "In stock": {
            "checkbox": {}
        },
        "Food group": {
            "select": {
                "options": [\
                    {\
                        "name": "🥦Vegetable",\
                        "color": "green"\
                    },\
                    {\
                        "name": "🍎Fruit",\
                        "color": "red"\
                    },\
                    {\
                        "name": "💪Protein",\
                        "color": "yellow"\
                    }\
                ]
            }
        },
        "Price": {
            "number": {
                "format": "dollar"
            }
        },
        "Last ordered": {
            "date": {}
        },
        "Store availability": {
            "type": "multi_select",
            "multi_select": {
                "options": [\
                    {\
                        "name": "Duc Loi Market",\
                        "color": "blue"\
                    },\
                    {\
                        "name": "Rainbow Grocery",\
                        "color": "gray"\
                    },\
                    {\
                        "name": "Nijiya Market",\
                        "color": "purple"\
                    },\
                    {\
                        "name": "Gus'\''s Community Market",\
                        "color": "yellow"\
                    }\
                ]
            }
        },
        "+1": {
            "people": {}
        },
        "Photo": {
            "files": {}
        }
    }
}'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "database",
    "id": "23cde96c-0ad8-41d8-bfa2-b477c63dd52a",
    "cover": null,
    "icon": null,
    "created_time": "2022-02-24T22:06:00.000Z",
    "created_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "last_edited_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "last_edited_time": "2022-02-24T22:06:00.000Z",
    "title": [\
        {\
            "type": "text",\
            "text": {\
                "content": "Grocery List",\
                "link": null\
            },\
            "annotations": {\
                "bold": false,\
                "italic": false,\
                "strikethrough": false,\
                "underline": false,\
                "code": false,\
                "color": "default"\
            },\
            "plain_text": "Grocery List",\
            "href": null\
        }\
    ],
    "properties": {
        "Description": {
            "id": "%3EWW~",
            "name": "Description",
            "type": "rich_text",
            "rich_text": {}
        },
        "Last ordered": {
            "id": "O%5C%3BK",
            "name": "Last ordered",
            "type": "date",
            "date": {}
        },
        "In stock": {
            "id": "Pya%5C",
            "name": "In stock",
            "type": "checkbox",
            "checkbox": {}
        },
        "+1": {
            "id": "%5CSky",
            "name": "+1",
            "type": "people",
            "people": {}
        },
        "Photo": {
            "id": "dSrT",
            "name": "Photo",
            "type": "files",
            "files": {}
        },
        "Store availability": {
            "id": "jRd%3E",
            "name": "Store availability",
            "type": "multi_select",
            "multi_select": {
                "options": [\
                    {\
                        "id": "8e6441ee-8f17-4833-a2fe-68af5dced24f",\
                        "name": "Duc Loi Market",\
                        "color": "blue"\
                    },\
                    {\
                        "id": "64a9da77-9805-461f-9773-1e176fdbd203",\
                        "name": "Rainbow Grocery",\
                        "color": "gray"\
                    },\
                    {\
                        "id": "012d0436-66a1-4613-a1bd-314b1d1d059b",\
                        "name": "Nijiya Market",\
                        "color": "purple"\
                    },\
                    {\
                        "id": "63ab31f9-8cbd-4d02-8688-752376f455ea",\
                        "name": "Gus's Community Market",\
                        "color": "yellow"\
                    }\
                ]
            }
        },
        "Food group": {
            "id": "q%5DO%5B",
            "name": "Food group",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "392af858-f42f-43ea-a171-7c0ca5c0a683",\
                        "name": "🥦Vegetable",\
                        "color": "green"\
                    },\
                    {\
                        "id": "df461a24-14c6-494a-8c61-55775fedbdcd",\
                        "name": "🍎Fruit",\
                        "color": "red"\
                    },\
                    {\
                        "id": "0ff22aaa-348e-4194-83c2-67a76dfb10fc",\
                        "name": "💪Protein",\
                        "color": "yellow"\
                    }\
                ]
            }
        },
        "Price": {
            "id": "t%60jj",
            "name": "Price",
            "type": "number",
            "number": {
                "format": "dollar"
            }
        },
        "Name": {
            "id": "title",
            "name": "Name",
            "type": "title",
            "title": {}
        }
    },
    "parent": {
        "type": "page_id",
        "page_id": "c4d39556-6364-46a1-8a61-ebbb668f7445"
    },
    "url": "https://www.notion.so/23cde96c0ad841d8bfa2b477c63dd52a",
    "archived": false
}
```

Date

Thu, 24 Feb 2022 22:06:41 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=14f6ff9c-cdc0-456c-a5f6-1d20542431ba; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:06:41 GMT; Secure

Set-Cookie

notion_experiment_device_id=aa455f44-e211-4a95-8346-1da4c9711950; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:06:41 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:06:41 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"800-juUK1tb1m7Mr+tDAal5QWEVyRL8"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2c00a2bff697c3-SJC

### PATCH[Update a database](https://www.postman.com/notionhq/notion-s-api-workspace/request/l3gvnpr/update-a-database)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/l3gvnpr/update-a-database)

https://api.notion.com/v1/databases/:id

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

View More

json

```json highlighted-code__code
{
    "title": [\
        {\
            "text": {\
                "content": "Ever Better Reading List Title"\
            }\
        }\
    ],
    "properties":{
        "Wine Pairing": { "rich_text": {} }
    }
}
```

Example

200 Success - Update a Database

Request

View More

cURL

```curl highlighted-code__code
curl --location --request PATCH 'https://api.notion.com/v1/databases/:id' \
--header 'Notion-Header: 2022-02-22' \
--data '{
    "title": [\
        {\
            "text": {\
                "content": "Ever Better Reading List Title"\
            }\
        }\
    ],
    "properties":{
        "Wine Pairing": { "rich_text": {} }
    }
}'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "database",
    "id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae",
    "cover": null,
    "icon": null,
    "created_time": "2021-04-27T20:38:00.000Z",
    "created_by": {
        "object": "user",
        "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"
    },
    "last_edited_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "last_edited_time": "2022-02-24T22:08:00.000Z",
    "title": [\
        {\
            "type": "text",\
            "text": {\
                "content": "Ever Better Reading List Title",\
                "link": null\
            },\
            "annotations": {\
                "bold": false,\
                "italic": false,\
                "strikethrough": false,\
                "underline": false,\
                "code": false,\
                "color": "default"\
            },\
            "plain_text": "Ever Better Reading List Title",\
            "href": null\
        }\
    ],
    "properties": {
        "Score /5": {
            "id": ")Y7\"",
            "name": "Score /5",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "b7307e35-c80a-4cb5-bb6b-6054523b394a",\
                        "name": "⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "9b1e1349-8e24-40ba-bbca-84a61296bc81",\
                        "name": "⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "66d3d050-086c-4a91-8c56-d55dc67e7789",\
                        "name": "⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "d3782c76-0396-467f-928e-46bf0c9d5fba",\
                        "name": "⭐️",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Type": {
            "id": "/7eo",
            "name": "Type",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    },\
                    {\
                        "id": "4ac85597-5db1-4e0a-9c02-445575c38f76",\
                        "name": "TV Series",\
                        "color": "default"\
                    },\
                    {\
                        "id": "2991748a-5745-4c3b-9c9b-2d6846a6fa1f",\
                        "name": "Film",\
                        "color": "default"\
                    },\
                    {\
                        "id": "82f3bace-be25-410d-87fe-561c9c22492f",\
                        "name": "Podcast",\
                        "color": "default"\
                    },\
                    {\
                        "id": "861f1076-1cc4-429a-a781-54947d727a4a",\
                        "name": "Academic Journal",\
                        "color": "default"\
                    },\
                    {\
                        "id": "9cc30548-59d6-4cd3-94bc-d234081525c4",\
                        "name": "Essay Resource",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Publisher": {
            "id": ">$Pb",
            "name": "Publisher",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    },\
                    {\
                        "id": "1b9b0c0c-17b0-4292-ad12-1364a51849de",\
                        "name": "Netflix",\
                        "color": "blue"\
                    },\
                    {\
                        "id": "f3533637-278f-4501-b394-d9753bf3c101",\
                        "name": "Indie",\
                        "color": "brown"\
                    },\
                    {\
                        "id": "e70d713c-4be4-4b40-a44d-fb413c8b9d7e",\
                        "name": "Bon Appetit",\
                        "color": "yellow"\
                    },\
                    {\
                        "id": "9c2bd667-0a10-4be4-a044-35a537a14ab9",\
                        "name": "Franklin Institute",\
                        "color": "pink"\
                    },\
                    {\
                        "id": "6849b5f0-e641-4ec5-83cb-1ffe23011060",\
                        "name": "Springer",\
                        "color": "orange"\
                    },\
                    {\
                        "id": "6a5bff63-a72d-4464-a5d0-1a601af2adf6",\
                        "name": "Emerald Group",\
                        "color": "gray"\
                    },\
                    {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                ]
            }
        },
        "Summary": {
            "id": "?\\25",
            "name": "Summary",
            "type": "rich_text",
            "rich_text": {}
        },
        "Publishing/Release Date": {
            "id": "?ex+",
            "name": "Publishing/Release Date",
            "type": "date",
            "date": {}
        },
        "Link": {
            "id": "VVMi",
            "name": "Link",
            "type": "url",
            "url": {}
        },
        "Wine Pairing": {
            "id": "Y=H]",
            "name": "Wine Pairing",
            "type": "rich_text",
            "rich_text": {}
        },
        "Read": {
            "id": "_MWJ",
            "name": "Read",
            "type": "checkbox",
            "checkbox": {}
        },
        "Status": {
            "id": "`zz5",
            "name": "Status",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    },\
                    {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    },\
                    {\
                        "id": "59aa9043-07b4-4bf4-8734-3164b13af44a",\
                        "name": "Finished",\
                        "color": "blue"\
                    },\
                    {\
                        "id": "f961978d-02eb-4998-933a-33c2ec378564",\
                        "name": "Listening",\
                        "color": "red"\
                    },\
                    {\
                        "id": "1d450853-b27a-45e2-979f-448aa1bd35de",\
                        "name": "Watching",\
                        "color": "red"\
                    }\
                ]
            }
        },
        "Author": {
            "id": "qNw_",
            "name": "Author",
            "type": "multi_select",
            "multi_select": {
                "options": [\
                    {\
                        "id": "15592971-7b30-43d5-9406-2eb69b13fcae",\
                        "name": "Spencer Greenberg",\
                        "color": "default"\
                    },\
                    {\
                        "id": "b80a988e-dccf-4f74-b764-6ca0e49ed1b8",\
                        "name": "Seth Stephens-Davidowitz",\
                        "color": "default"\
                    },\
                    {\
                        "id": "0e71ee06-199d-46a4-834c-01084c8f76cb",\
                        "name": "Andrew Russell",\
                        "color": "default"\
                    },\
                    {\
                        "id": "5807ec38-4879-4455-9f30-5352e90e8b79",\
                        "name": "Lee Vinsel",\
                        "color": "default"\
                    },\
                    {\
                        "id": "4cf10a64-f3da-449c-8e04-ce6e338bbdbd",\
                        "name": "Megan Greenwell",\
                        "color": "default"\
                    },\
                    {\
                        "id": "833e2c78-35ed-4601-badc-50c323341d76",\
                        "name": "Kara Swisher",\
                        "color": "default"\
                    },\
                    {\
                        "id": "82e594e2-b1c5-4271-ac19-1a723a94a533",\
                        "name": "Paul Romer",\
                        "color": "default"\
                    },\
                    {\
                        "id": "ae3a2cbe-1fc9-4376-be35-331628b34623",\
                        "name": "Karen Swallow Prior",\
                        "color": "default"\
                    },\
                    {\
                        "id": "da068e78-dfe2-4434-9fd7-b7450b3e5830",\
                        "name": "Judith Shulevitz",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Name": {
            "id": "title",
            "name": "Name",
            "type": "title",
            "title": {}
        }
    },
    "parent": {
        "type": "page_id",
        "page_id": "c4d39556-6364-46a1-8a61-ebbb668f7445"
    },
    "url": "https://www.notion.so/8e2c2b769e1d47d287b9ed3035d607ae",
    "archived": false
}
```

Date

Thu, 24 Feb 2022 22:08:21 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=45f031ff-3dda-4126-bf67-dff36270f4bf; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:08:21 GMT; Secure

Set-Cookie

notion_experiment_device_id=3af3b548-86af-4c3f-a925-ca45299451bc; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:08:21 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:08:21 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"1154-yKzD7frwaV985/9YIfi9OFRzhEo"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2c03133bd697c3-SJC

### PATCH[Update database properties](https://www.postman.com/notionhq/notion-s-api-workspace/request/xe5wk2i/update-database-properties)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/xe5wk2i/update-database-properties)

https://api.notion.com/v1/databases/:id

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

json

```json highlighted-code__code
{
  "properties": {
    "Wine Pairing": {
      "name": "New Property Name"
    }
  }
}
```

Example

200 Success - Update a Database

Request

View More

cURL

```curl highlighted-code__code
curl --location --request PATCH 'https://api.notion.com/v1/databases/:id' \
--header 'Notion-Header: 2022-02-22' \
--data '{
    "title": [\
        {\
            "text": {\
                "content": "Ever Better Reading List Title"\
            }\
        }\
    ],
    "properties":{
        "Wine Pairing": { "rich_text": {} }
    }
}'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "database",
    "id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae",
    "cover": null,
    "icon": null,
    "created_time": "2021-04-27T20:38:00.000Z",
    "created_by": {
        "object": "user",
        "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"
    },
    "last_edited_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "last_edited_time": "2022-02-24T22:08:00.000Z",
    "title": [\
        {\
            "type": "text",\
            "text": {\
                "content": "Ever Better Reading List Title",\
                "link": null\
            },\
            "annotations": {\
                "bold": false,\
                "italic": false,\
                "strikethrough": false,\
                "underline": false,\
                "code": false,\
                "color": "default"\
            },\
            "plain_text": "Ever Better Reading List Title",\
            "href": null\
        }\
    ],
    "properties": {
        "Score /5": {
            "id": ")Y7\"",
            "name": "Score /5",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "b7307e35-c80a-4cb5-bb6b-6054523b394a",\
                        "name": "⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "9b1e1349-8e24-40ba-bbca-84a61296bc81",\
                        "name": "⭐️⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "66d3d050-086c-4a91-8c56-d55dc67e7789",\
                        "name": "⭐️⭐️",\
                        "color": "default"\
                    },\
                    {\
                        "id": "d3782c76-0396-467f-928e-46bf0c9d5fba",\
                        "name": "⭐️",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Type": {
            "id": "/7eo",
            "name": "Type",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    },\
                    {\
                        "id": "4ac85597-5db1-4e0a-9c02-445575c38f76",\
                        "name": "TV Series",\
                        "color": "default"\
                    },\
                    {\
                        "id": "2991748a-5745-4c3b-9c9b-2d6846a6fa1f",\
                        "name": "Film",\
                        "color": "default"\
                    },\
                    {\
                        "id": "82f3bace-be25-410d-87fe-561c9c22492f",\
                        "name": "Podcast",\
                        "color": "default"\
                    },\
                    {\
                        "id": "861f1076-1cc4-429a-a781-54947d727a4a",\
                        "name": "Academic Journal",\
                        "color": "default"\
                    },\
                    {\
                        "id": "9cc30548-59d6-4cd3-94bc-d234081525c4",\
                        "name": "Essay Resource",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Publisher": {
            "id": ">$Pb",
            "name": "Publisher",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",\
                        "name": "NYT",\
                        "color": "default"\
                    },\
                    {\
                        "id": "1b9b0c0c-17b0-4292-ad12-1364a51849de",\
                        "name": "Netflix",\
                        "color": "blue"\
                    },\
                    {\
                        "id": "f3533637-278f-4501-b394-d9753bf3c101",\
                        "name": "Indie",\
                        "color": "brown"\
                    },\
                    {\
                        "id": "e70d713c-4be4-4b40-a44d-fb413c8b9d7e",\
                        "name": "Bon Appetit",\
                        "color": "yellow"\
                    },\
                    {\
                        "id": "9c2bd667-0a10-4be4-a044-35a537a14ab9",\
                        "name": "Franklin Institute",\
                        "color": "pink"\
                    },\
                    {\
                        "id": "6849b5f0-e641-4ec5-83cb-1ffe23011060",\
                        "name": "Springer",\
                        "color": "orange"\
                    },\
                    {\
                        "id": "6a5bff63-a72d-4464-a5d0-1a601af2adf6",\
                        "name": "Emerald Group",\
                        "color": "gray"\
                    },\
                    {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                ]
            }
        },
        "Summary": {
            "id": "?\\25",
            "name": "Summary",
            "type": "rich_text",
            "rich_text": {}
        },
        "Publishing/Release Date": {
            "id": "?ex+",
            "name": "Publishing/Release Date",
            "type": "date",
            "date": {}
        },
        "Link": {
            "id": "VVMi",
            "name": "Link",
            "type": "url",
            "url": {}
        },
        "Wine Pairing": {
            "id": "Y=H]",
            "name": "Wine Pairing",
            "type": "rich_text",
            "rich_text": {}
        },
        "Read": {
            "id": "_MWJ",
            "name": "Read",
            "type": "checkbox",
            "checkbox": {}
        },
        "Status": {
            "id": "`zz5",
            "name": "Status",
            "type": "select",
            "select": {
                "options": [\
                    {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    },\
                    {\
                        "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",\
                        "name": "Reading",\
                        "color": "red"\
                    },\
                    {\
                        "id": "59aa9043-07b4-4bf4-8734-3164b13af44a",\
                        "name": "Finished",\
                        "color": "blue"\
                    },\
                    {\
                        "id": "f961978d-02eb-4998-933a-33c2ec378564",\
                        "name": "Listening",\
                        "color": "red"\
                    },\
                    {\
                        "id": "1d450853-b27a-45e2-979f-448aa1bd35de",\
                        "name": "Watching",\
                        "color": "red"\
                    }\
                ]
            }
        },
        "Author": {
            "id": "qNw_",
            "name": "Author",
            "type": "multi_select",
            "multi_select": {
                "options": [\
                    {\
                        "id": "15592971-7b30-43d5-9406-2eb69b13fcae",\
                        "name": "Spencer Greenberg",\
                        "color": "default"\
                    },\
                    {\
                        "id": "b80a988e-dccf-4f74-b764-6ca0e49ed1b8",\
                        "name": "Seth Stephens-Davidowitz",\
                        "color": "default"\
                    },\
                    {\
                        "id": "0e71ee06-199d-46a4-834c-01084c8f76cb",\
                        "name": "Andrew Russell",\
                        "color": "default"\
                    },\
                    {\
                        "id": "5807ec38-4879-4455-9f30-5352e90e8b79",\
                        "name": "Lee Vinsel",\
                        "color": "default"\
                    },\
                    {\
                        "id": "4cf10a64-f3da-449c-8e04-ce6e338bbdbd",\
                        "name": "Megan Greenwell",\
                        "color": "default"\
                    },\
                    {\
                        "id": "833e2c78-35ed-4601-badc-50c323341d76",\
                        "name": "Kara Swisher",\
                        "color": "default"\
                    },\
                    {\
                        "id": "82e594e2-b1c5-4271-ac19-1a723a94a533",\
                        "name": "Paul Romer",\
                        "color": "default"\
                    },\
                    {\
                        "id": "ae3a2cbe-1fc9-4376-be35-331628b34623",\
                        "name": "Karen Swallow Prior",\
                        "color": "default"\
                    },\
                    {\
                        "id": "da068e78-dfe2-4434-9fd7-b7450b3e5830",\
                        "name": "Judith Shulevitz",\
                        "color": "default"\
                    }\
                ]
            }
        },
        "Name": {
            "id": "title",
            "name": "Name",
            "type": "title",
            "title": {}
        }
    },
    "parent": {
        "type": "page_id",
        "page_id": "c4d39556-6364-46a1-8a61-ebbb668f7445"
    },
    "url": "https://www.notion.so/8e2c2b769e1d47d287b9ed3035d607ae",
    "archived": false
}
```

Date

Thu, 24 Feb 2022 22:08:21 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=45f031ff-3dda-4126-bf67-dff36270f4bf; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:08:21 GMT; Secure

Set-Cookie

notion_experiment_device_id=3af3b548-86af-4c3f-a925-ca45299451bc; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:08:21 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:08:21 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"1154-yKzD7frwaV985/9YIfi9OFRzhEo"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2c03133bd697c3-SJC

## Pages

Pages represent documents in Notion workspaces that can be created in a workspace directly or organized within in a Notion database.

These page-related endpoints allow developers to work with pages programmatically by [creating](https://developers.notion.com/reference/post-page), [retrieving](https://developers.notion.com/reference/retrieve-a-page), [updating](https://developers.notion.com/reference/patch-page), and [archiving](https://developers.notion.com/reference/archive-a-page) them.

To learn more, read [Notion’s official documentation](https://developers.notion.com/reference/page) for endpoints related to pages. We also recommend reading the official Notion guide for [working with page content](https://developers.notion.com/docs/working-with-page-content).

Authorization Bearer Token

This folder is using an authorization helper from collection Notion API

### POST[Create a page](https://www.postman.com/notionhq/notion-s-api-workspace/request/d3btswo/create-a-page)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/d3btswo/create-a-page)

https://api.notion.com/v1/pages/

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Content-Type

application/json

Notion-Version

2022-02-22

Bodyraw (json)

View More

json

```json highlighted-code__code
{
    "parent": {
        "database_id": ""
    },
    "properties": {
        "Type": {
            "select": {
                "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",
                "name": "Article",
                "color": "default"
            }
        },
        "Score /5": {
            "select": {
                "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",
                "name": "⭐️⭐️⭐️⭐️⭐️",
                "color": "default"
            }
        },
        "Name": {
            "title": [\
                {\
                    "text": {\
                        "content": "New Media Article"\
                    }\
                }\
            ]
        },
        "Status": {
            "select": {
                "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",
                "name": "Ready to Start",
                "color": "yellow"
            }
        },
        "Publisher": {
            "select": {
                "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",
                "name": "The Atlantic",
                "color": "red"
            }
        },
        "Publishing/Release Date": {
            "date": {
                "start": "2020-12-08T12:00:00Z",
                "end": null
            }
        },
        "Link": {
            "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"
        },
        "Summary": {
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                    "href": null\
                }\
            ]
        },
        "Read": {
            "checkbox": false
        }
    }
}
```

Example

200 Success - Create a Page

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/pages/' \
--header 'Authorization: Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "parent": {
        "database_id": ""
    },
    "properties": {
        "Type": {
            "select": {
                "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",
                "name": "Article",
                "color": "default"
            }
        },
        "Score /5": {
            "select": {
                "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",
                "name": "⭐️⭐️⭐️⭐️⭐️",
                "color": "default"
            }
        },
        "Name": {
            "title": [\
                {\
                    "text": {\
                        "content": "New Media Article"\
                    }\
                }\
            ]
        },
        "Status": {
            "select": {
                "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",
                "name": "Ready to Start",
                "color": "yellow"
            }
        },
        "Publisher": {
            "select": {
                "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",
                "name": "The Atlantic",
                "color": "red"
            }
        },
        "Publishing/Release Date": {
            "date": {
                "start": "2020-12-08T12:00:00Z",
                "end": null
            }
        },
        "Link": {
            "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"
        },
        "Summary": {
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                    "href": null\
                }\
            ]
        },
        "Read": {
            "checkbox": false
        }
    }
}'
```

200 OK

Response

- Body
- Headers (23)

View More

json

```json highlighted-code__code
{
    "object": "page",
    "id": "f3a1f364-6ca1-41d2-8986-552ae37c1bdf",
    "created_time": "2022-03-02T05:24:00.000Z",
    "last_edited_time": "2022-03-02T05:24:00.000Z",
    "created_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "last_edited_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "cover": null,
    "icon": null,
    "parent": {
        "type": "database_id",
        "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"
    },
    "archived": false,
    "properties": {
        "Score /5": {
            "id": ")Y7%22",
            "type": "select",
            "select": {
                "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",
                "name": "⭐️⭐️⭐️⭐️⭐️",
                "color": "default"
            }
        },
        "Type": {
            "id": "%2F7eo",
            "type": "select",
            "select": {
                "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",
                "name": "Article",
                "color": "default"
            }
        },
        "Publisher": {
            "id": "%3E%24Pb",
            "type": "select",
            "select": {
                "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",
                "name": "The Atlantic",
                "color": "red"
            }
        },
        "Summary": {
            "id": "%3F%5C25",
            "type": "rich_text",
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                    "href": null\
                }\
            ]
        },
        "Publishing/Release Date": {
            "id": "%3Fex%2B",
            "type": "date",
            "date": {
                "start": "2020-12-08T12:00:00.000+00:00",
                "end": null,
                "time_zone": null
            }
        },
        "Link": {
            "id": "VVMi",
            "type": "url",
            "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"
        },
        "Read": {
            "id": "_MWJ",
            "type": "checkbox",
            "checkbox": false
        },
        "Status": {
            "id": "%60zz5",
            "type": "select",
            "select": {
                "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",
                "name": "Ready to Start",
                "color": "yellow"
            }
        },
        "Author": {
            "id": "qNw_",
            "type": "multi_select",
            "multi_select": []
        },
        "Name": {
            "id": "title",
            "type": "title",
            "title": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "New Media Article",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "New Media Article",\
                    "href": null\
                }\
            ]
        }
    },
    "url": "https://www.notion.so/New-Media-Article-f3a1f3646ca141d28986552ae37c1bdf"
}
```

Date

Wed, 02 Mar 2022 05:24:12 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=79384a5e-4c99-4e6a-8d53-afbc7149c1da; Domain=www.notion.so; Path=/; Expires=Thu, 02 Mar 2023 05:24:07 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Thu, 03 Mar 2022 05:24:07 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"8a3-Iu9RiTdka3wFzKVnnkh97CbH+l4"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e57b44639065a7b-IAD

### POST[Create a page with content](https://www.postman.com/notionhq/notion-s-api-workspace/request/9tueymr/create-a-page-with-content)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/9tueymr/create-a-page-with-content)

https://api.notion.com/v1/pages/

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Authorization

Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns

Content-Type

application/json

Notion-Version

2022-02-22

Bodyraw (json)

View More

json

```json highlighted-code__code
{
    "parent": {
        "database_id": ""
    },
    "properties": {
        "Type": {
            "select": {
                "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",
                "name": "Article",
                "color": "default"
            }
        },
        "Score /5": {
            "select": {
                "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",
                "name": "⭐️⭐️⭐️⭐️⭐️",
                "color": "default"
            }
        },
        "Name": {
            "title": [\
                {\
                    "text": {\
                        "content": "New Media Article"\
                    }\
                }\
            ]
        },
        "Status": {
            "select": {
                "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",
                "name": "Ready to Start",
                "color": "yellow"
            }
        },
        "Publisher": {
            "select": {
                "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",
                "name": "The Atlantic",
                "color": "red"
            }
        },
        "Publishing/Release Date": {
            "date": {
                "start": "2020-12-08T12:00:00Z",
                "end": null
            }
        },
        "Link": {
            "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"
        },
        "Summary": {
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                    "href": null\
                }\
            ]
        },
        "Read": {
            "checkbox": false
        }
    },
    "children": [\
        {\
            "object": "block",\
            "type": "heading_2",\
            "heading_2": {\
                "rich_text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Lacinato kale"\
                        }\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "type": "paragraph",\
            "paragraph": {\
                "rich_text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",\
                            "link": {\
                                "url": "https://en.wikipedia.org/wiki/Lacinato_kale"\
                            }\
                        }\
                    }\
                ]\
            }\
        }\
    ]
}
```

Example

200 Success - Create a Page with Content

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/pages/' \
--header 'Authorization: Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "parent": {
        "database_id": ""
    },
    "properties": {
        "Type": {
            "select": {
                "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",
                "name": "Article",
                "color": "default"
            }
        },
        "Score /5": {
            "select": {
                "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",
                "name": "⭐️⭐️⭐️⭐️⭐️",
                "color": "default"
            }
        },
        "Name": {
            "title": [\
                {\
                    "text": {\
                        "content": "New Media Article"\
                    }\
                }\
            ]
        },
        "Status": {
            "select": {
                "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",
                "name": "Ready to Start",
                "color": "yellow"
            }
        },
        "Publisher": {
            "select": {
                "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",
                "name": "The Atlantic",
                "color": "red"
            }
        },
        "Publishing/Release Date": {
            "date": {
                "start": "2020-12-08T12:00:00Z",
                "end": null
            }
        },
        "Link": {
            "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"
        },
        "Summary": {
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                    "href": null\
                }\
            ]
        },
        "Read": {
            "checkbox": false
        }
    },
    "children": [\
        {\
            "object": "block",\
            "type": "heading_2",\
            "heading_2": {\
                "rich_text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Lacinato kale"\
                        }\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",\
                            "link": {\
                                "url": "https://en.wikipedia.org/wiki/Lacinato_kale"\
                            }\
                        }\
                    }\
                ]\
            }\
        }\
    ]
}'
```

200 OK

Response

- Body
- Headers (23)

View More

json

```json highlighted-code__code
{
    "object": "page",
    "id": "672b014a-2626-4ada-9211-fb3613d07ae2",
    "created_time": "2022-03-02T05:24:00.000Z",
    "last_edited_time": "2022-03-02T05:24:00.000Z",
    "created_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "last_edited_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "cover": null,
    "icon": null,
    "parent": {
        "type": "database_id",
        "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"
    },
    "archived": false,
    "properties": {
        "Score /5": {
            "id": ")Y7%22",
            "type": "select",
            "select": {
                "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",
                "name": "⭐️⭐️⭐️⭐️⭐️",
                "color": "default"
            }
        },
        "Type": {
            "id": "%2F7eo",
            "type": "select",
            "select": {
                "id": "672b014a-2626-4ada-9211-fb3613d07ae2",
                "name": "Article",
                "color": "default"
            }
        },
        "Publisher": {
            "id": "%3E%24Pb",
            "type": "select",
            "select": {
                "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",
                "name": "The Atlantic",
                "color": "red"
            }
        },
        "Summary": {
            "id": "%3F%5C25",
            "type": "rich_text",
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                    "href": null\
                }\
            ]
        },
        "Publishing/Release Date": {
            "id": "%3Fex%2B",
            "type": "date",
            "date": {
                "start": "2020-12-08T12:00:00.000+00:00",
                "end": null,
                "time_zone": null
            }
        },
        "Link": {
            "id": "VVMi",
            "type": "url",
            "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"
        },
        "Read": {
            "id": "_MWJ",
            "type": "checkbox",
            "checkbox": false
        },
        "Status": {
            "id": "%60zz5",
            "type": "select",
            "select": {
                "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",
                "name": "Ready to Start",
                "color": "yellow"
            }
        },
        "Author": {
            "id": "qNw_",
            "type": "multi_select",
            "multi_select": []
        },
        "Name": {
            "id": "title",
            "type": "title",
            "title": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "New Media Article",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "New Media Article",\
                    "href": null\
                }\
            ]
        }
    },
    "url": "https://www.notion.so/New-Media-Article-672b014a26264ada9211fb3613d07ae2"
}
```

Date

Wed, 02 Mar 2022 05:24:58 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=6498f46f-cb2b-4bbf-98a5-1bc1c36fd4a7; Domain=www.notion.so; Path=/; Expires=Thu, 02 Mar 2023 05:24:58 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Thu, 03 Mar 2022 05:24:58 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"8a3-gcmRViEt7UpvGwWtJJn236x6UKc"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e57b587edb0594a-IAD

### GET[Retrieve a page](https://www.postman.com/notionhq/notion-s-api-workspace/request/avg1jer/retrieve-a-page)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/avg1jer/retrieve-a-page)

https://api.notion.com/v1/pages/:id

Retrieves a Page object using the ID in the request path. This endpoint exposes page properties, not page content.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Example

200 Success - Retrieve a Page

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/pages/:id' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (23)

View More

json

```json highlighted-code__code
{
    "object": "page",
    "id": "c4d39556-6364-46a1-8a61-ebbb668f7445",
    "created_time": "2021-04-27T20:38:00.000Z",
    "last_edited_time": "2022-03-02T05:22:00.000Z",
    "created_by": {
        "object": "user",
        "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"
    },
    "last_edited_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "cover": null,
    "icon": {
        "type": "emoji",
        "emoji": "📕"
    },
    "parent": {
        "type": "page_id",
        "page_id": "c1218692-102d-4b47-ab38-c21900b3557b"
    },
    "archived": false,
    "properties": {
        "title": {
            "id": "title",
            "type": "title",
            "title": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Reading List",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Reading List",\
                    "href": null\
                }\
            ]
        }
    },
    "url": "https://www.notion.so/Reading-List-c4d39556636446a18a61ebbb668f7445"
}
```

Date

Wed, 02 Mar 2022 05:25:32 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=f4a95d87-3bfa-4644-8de4-2ed41f6410da; Domain=www.notion.so; Path=/; Expires=Thu, 02 Mar 2023 05:25:32 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Thu, 03 Mar 2022 05:25:32 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"325-KCHYnqvQMvtdpRRceV9twM7idU8"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e57b658a8f97fb2-IAD

Content-Encoding

gzip

### PATCH[Update page properties](https://www.postman.com/notionhq/notion-s-api-workspace/request/uejpm8o/update-page-properties)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/uejpm8o/update-page-properties)

https://api.notion.com/v1/pages/:id

Updates a page by setting the values of any properties specified in the JSON body of the request. Properties not updated via parameters will remain unchanged.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Content-Type

application/json

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

json

```json highlighted-code__code
{
  "properties": {
    "Status": {
      "select": {
        "name": "Reading"
      }
    }
  }
}
```

Example

200 Success - Update Page properties

Request

cURL

```curl highlighted-code__code
curl --location --request PATCH 'https://api.notion.com/v1/pages/:id' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "Status": {
        "select": {
            "name": "Reading"
        }
    }
}'
```

200 OK

Response

- Body
- Headers (23)

View More

json

```json highlighted-code__code
{
    "object": "page",
    "id": "a1712d54-53e4-4893-a69d-4d581cd2c845",
    "created_time": "2021-04-27T20:38:19.437Z",
    "last_edited_time": "2021-04-28T23:12:53.160Z",
    "parent": {
        "type": "database_id",
        "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"
    },
    "archived": false,
    "properties": {
        "Score /5": {
            "id": ")Y7\"",
            "type": "select",
            "select": {
                "id": "b7307e35-c80a-4cb5-bb6b-6054523b394a",
                "name": "⭐️⭐️⭐️⭐️",
                "color": "default"
            }
        },
        "Type": {
            "id": "/7eo",
            "type": "select",
            "select": {
                "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",
                "name": "Article",
                "color": "default"
            }
        },
        "Publisher": {
            "id": ">$Pb",
            "type": "select",
            "select": {
                "id": "c5ee409a-f307-4176-99ee-6e424fa89afa",
                "name": "NYT",
                "color": "default"
            }
        },
        "Summary": {
            "id": "?\\25",
            "type": "rich_text",
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                    "href": null\
                }\
            ]
        },
        "Publishing/Release Date": {
            "id": "?ex+",
            "type": "date",
            "date": {
                "start": "2018-10-21",
                "end": null
            }
        },
        "Link": {
            "id": "VVMi",
            "type": "url",
            "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"
        },
        "Read": {
            "id": "_MWJ",
            "type": "checkbox",
            "checkbox": true
        },
        "Status": {
            "id": "`zz5",
            "type": "select",
            "select": {
                "id": "5925ba22-0126-4b58-90c7-b8bbb2c3c895",
                "name": "Reading",
                "color": "red"
            }
        },
        "Author": {
            "id": "qNw_",
            "type": "multi_select",
            "multi_select": [\
                {\
                    "id": "833e2c78-35ed-4601-badc-50c323341d76",\
                    "name": "Kara Swisher",\
                    "color": "default"\
                }\
            ]
        },
        "Name": {
            "id": "title",
            "type": "title",
            "title": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Who Will Teach Silicon Valley to Be Ethical? ",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Who Will Teach Silicon Valley to Be Ethical? ",\
                    "href": null\
                }\
            ]
        }
    }
}
```

Date

Wed, 12 May 2021 06:04:55 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

Set-Cookie

notion_browser_id=64874c87-50ce-4a41-af6f-3ecf1626325e; Domain=www.notion.so; Path=/; Expires=Sat, 18 Jan 2053 07:51:35 GMT; Secure

ETag

W/"7d8-jG4gaWNQPTIf72vp10FvF9p/N3Q"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

cf-request-id

0a00c6b50400000231ecbbc000000001

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

64e173ce6ca20231-SJC

### PATCH[Archive a page](https://www.postman.com/notionhq/notion-s-api-workspace/request/rd1oubo/archive-a-page)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/rd1oubo/archive-a-page)

https://api.notion.com/v1/pages/:id

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

json

```json highlighted-code__code
{
  "archived": true
}
```

Example

200 Success - Delete a page

Request

cURL

```curl highlighted-code__code
curl --location --request DELETE 'https://api.notion.com/v1/blocks/:id' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
  "object": "block",
  "id": "2646ac0d-df90-4bab-bb4e-75e3cb972ed1",
  "created_time": "2022-02-24T22:14:00.000Z",
  "last_edited_time": "2022-02-24T22:15:00.000Z",
  "created_by": {
    "object": "user",
    "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"
  },
  "last_edited_by": {
    "object": "user",
    "id": "92a680bb-6970-4726-952b-4f4c03bff617"
  },
  "has_children": false,
  "archived": true,
  "type": "child_page",
  "child_page": {
    "title": ""
  }
}
```

Date

Thu, 24 Feb 2022 22:15:15 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=a57dd6b8-d39f-4982-a392-8b414443bb1e; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:15:15 GMT; Secure

Set-Cookie

notion_experiment_device_id=2cdb7cc3-4a1a-466c-9e37-2c1439349c36; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:15:15 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:15:15 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"183-KR1/QI68/l2Jn+MwQsjthIPU2oM"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2c0d2f4884255c-SJC

Content-Encoding

gzip

### GET[Retrieve a page property item](https://www.postman.com/notionhq/notion-s-api-workspace/request/zrp90r5/retrieve-a-page-property-item)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/zrp90r5/retrieve-a-page-property-item)

https://api.notion.com/v1/pages/:page\_id/properties/:property\_id

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

page_id

property_id

Example

200 Success - Retrieve a Page Property Item

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/pages/672b014a26264ada9211fb3613d07ae2/properties/)Y7%22'
```

200 OK

Response

- Body
- Headers (23)

json

```json highlighted-code__code
{
  "object": "property_item",
  "type": "select",
  "select": {
    "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",
    "name": "⭐️⭐️⭐️⭐️⭐️",
    "color": "default"
  }
}
```

Date

Wed, 02 Mar 2022 05:31:24 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=b52020af-77f5-4a1a-b45c-db6de78345b8; Domain=www.notion.so; Path=/; Expires=Thu, 02 Mar 2023 05:31:24 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Thu, 03 Mar 2022 05:31:24 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"9b-jhhW07EAsEXZSfnBY3CcGFH2Moo"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e57bef43f860627-IAD

Content-Encoding

gzip

## Blocks

A block represents a piece of content in a Notion workspace. All Notion pages are composed of a series of blocks. Blocks can vary in type, including (but not limited to) headers, styled text, images, tables, and more. To see a complete list of block types, refer to Notion’s [official documentation](https://developers.notion.com/reference/page-property-values#type-objects).

These block-related endpoints allow developers to work with blocks programmatically by [creating](https://developers.notion.com/reference/patch-block-children), [retrieving](https://developers.notion.com/reference/retrieve-a-block), [updating](https://developers.notion.com/reference/update-a-block), and [deleting](https://developers.notion.com/reference/delete-a-block) them from Notion pages.

To learn more, read [Notion’s official documentation](https://developers.notion.com/reference/block) for endpoints related to blocks. We also recommend reading the official Notion guides for [working with page content](https://developers.notion.com/docs/working-with-page-content) (a.k.a. blocks) and [working with files and media](https://developers.notion.com/docs/working-with-files-and-media).

Authorization Bearer Token

This folder is using an authorization helper from collection Notion API

### GET[Retrieve block children](https://www.postman.com/notionhq/notion-s-api-workspace/request/ecufqzd/retrieve-block-children)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/ecufqzd/retrieve-block-children)

https://api.notion.com/v1/blocks/:id/children?page\_size=100

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Query Params

page_size

100

Path Variables

id

Example

200 Success - Retrieve block children

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/blocks/:id/children?page_size=100' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (23)

View More

json

```json highlighted-code__code
{
    "object": "list",
    "results": [\
        {\
            "object": "block",\
            "id": "48c1ffb5-2789-4025-937b-2c35eaaaab3f",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "unsupported",\
            "unsupported": {}\
        },\
        {\
            "object": "block",\
            "id": "e381a0a3-4efb-4ba9-aa93-45b70fa9ce7f",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "I think we can all agree that Silicon Valley needs more adult supervision right about now.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "I think we can all agree that Silicon Valley needs more adult supervision right about now.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "ce5f79ac-8145-44ab-be3b-8ad143d6f8a7",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Is the solution for its companies to hire a chief ethics officer?",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Is the solution for its companies to hire a chief ethics officer?",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "0387b374-7847-4ddc-bc53-6b0813ce4ed4",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "While some tech companies like Google have top compliance officers and others turn to legal teams to police themselves, no big tech companies that I know of have yet taken this step. But a lot of them seem to be talking about it, and I’ve discussed the idea with several chief executives recently. Why? Because slowly, then all at once, it feels like too many digital leaders have lost their minds.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "While some tech companies like Google have top compliance officers and others turn to legal teams to police themselves, no big tech companies that I know of have yet taken this step. But a lot of them seem to be talking about it, and I’ve discussed the idea with several chief executives recently. Why? Because slowly, then all at once, it feels like too many digital leaders have lost their minds.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "da035311-5af3-48bc-8279-d28d9f4ef2e2",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "It’s probably no surprise, considering the complex problems the tech industry faces. As one ethical quandary after another has hit its profoundly ill-prepared executives, their once-pristine reputations have fallen like palm trees in a hurricane. These last two weeks alone show how tech is stumbling to react to big world issues armed with only bubble world skills:",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "It’s probably no surprise, considering the complex problems the tech industry faces. As one ethical quandary after another has hit its profoundly ill-prepared executives, their once-pristine reputations have fallen like palm trees in a hurricane. These last two weeks alone show how tech is stumbling to react to big world issues armed with only bubble world skills:",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "63a60fca-4a11-43eb-8773-c5f0164a3117",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "As a journalist is beheaded and dismembered at the direction of Saudi Arabian leaders (allegedly, but the killers did bring a bone saw), Silicon Valley is swimming in oceans of money from the kingdom’s Public Investment Fund. Saudi funding includes hundreds of millions for Magic Leap, and huge investments in hot public companies like Tesla. Most significantly: Saudis have invested about $45 billion in SoftBank’s giant Vision Fund, which has in turn doused the tech landscape — $4.4 billion to WeWork, $250 million to Slack, and $300 million to the dog-walking app Wag. In total Uber has gotten almost $14 billion, either through direct investments from the Public Investment Fund or through the Saudis’ funding of the Vision Fund. A billion here, a billion there and it all adds up.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "As a journalist is beheaded and dismembered at the direction of Saudi Arabian leaders (allegedly, but the killers did bring a bone saw), Silicon Valley is swimming in oceans of money from the kingdom’s Public Investment Fund. Saudi funding includes hundreds of millions for Magic Leap, and huge investments in hot public companies like Tesla. Most significantly: Saudis have invested about $45 billion in SoftBank’s giant Vision Fund, which has in turn doused the tech landscape — $4.4 billion to WeWork, $250 million to Slack, and $300 million to the dog-walking app Wag. In total Uber has gotten almost $14 billion, either through direct investments from the Public Investment Fund or through the Saudis’ funding of the Vision Fund. A billion here, a billion there and it all adds up.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "8c58c8f1-86ae-4a14-b6b9-74f5fa579620",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "[",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "[",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Kara Swisher answered your questions about her column ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Kara Swisher answered your questions about her column ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "on Twitter",\
                            "link": {\
                                "url": "https://twitter.com/karaswisher/status/1054842303922298880"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "on Twitter",\
                        "href": "https://twitter.com/karaswisher/status/1054842303922298880"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": ".",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": ".",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "]",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "]",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "875d3aff-086b-45da-9ed1-bc3ddb185229",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Facebook introduced a new home video device called Portal, and promised that what could be seen as a surveillance tool would not share data for the sake of ad targeting. Soon after, as ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Facebook introduced a new home video device called Portal, and promised that what could be seen as a surveillance tool would not share data for the sake of ad targeting. Soon after, as ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "reported by Recode",\
                            "link": {\
                                "url": "https://www.recode.net/2018/10/16/17966102/facebook-portal-ad-targeting-data-collection"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "reported by Recode",\
                        "href": "https://www.recode.net/2018/10/16/17966102/facebook-portal-ad-targeting-data-collection"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": ", Facebook admitted that “data about who you call and data about which apps you use on Portal ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": ", Facebook admitted that “data about who you call and data about which apps you use on Portal ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "can",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "can",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": " be used to target you with ads on other Facebook-owned properties.” Oh. Um. That’s awkward.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": " be used to target you with ads on other Facebook-owned properties.” Oh. Um. That’s awkward.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "306ab0fb-6daa-4c5b-b1f7-f51a5f92b6ff",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "After agreeing to pay $20 million to the Securities and Exchange Commission for an ill-advised tweet about possible funding (from the Saudis, by the way), the Tesla co-founder Elon Musk proceeded to troll the regulatory agency on, you got it, Twitter. And even though the ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "After agreeing to pay $20 million to the Securities and Exchange Commission for an ill-advised tweet about possible funding (from the Saudis, by the way), the Tesla co-founder Elon Musk proceeded to troll the regulatory agency on, you got it, Twitter. And even though the ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "settlement called for some kind of control of his communications",\
                            "link": {\
                                "url": "https://www.sec.gov/news/press-release/2018-226"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "settlement called for some kind of control of his communications",\
                        "href": "https://www.sec.gov/news/press-release/2018-226"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": ", it appears that Mr. Musk will continue tweeting until someone steals his phone.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": ", it appears that Mr. Musk will continue tweeting until someone steals his phone.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "122b1457-4129-4513-abaa-7cce7d66e4a1",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Finally, Google took six months to make public that user data on its social network, Google Plus, ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Finally, Google took six months to make public that user data on its social network, Google Plus, ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "had been exposed",\
                            "link": {\
                                "url": "https://www.nytimes.com/2018/10/08/technology/google-plus-security-disclosure.html?module=inline"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "had been exposed",\
                        "href": "https://www.nytimes.com/2018/10/08/technology/google-plus-security-disclosure.html?module=inline"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": " and that profiles of up to 500,000 users may have been compromised. While the service failed long ago, because it was pretty much designed by antisocial people, this lack of concern for privacy was profound.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": " and that profiles of up to 500,000 users may have been compromised. While the service failed long ago, because it was pretty much designed by antisocial people, this lack of concern for privacy was profound.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "4d4af599-556f-4d8b-af8e-4d01ebe2aa27",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Grappling with what to say and do about the disasters they themselves create is only the beginning. Then there are the broader issues that the denizens of Silicon Valley expect their employers to have a stance on: immigration, income inequality, artificial intelligence, automation, transgender rights, climate change, privacy, data rights and whether tech companies should be helping the government do controversial things. It’s an ethical swamp out there.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Grappling with what to say and do about the disasters they themselves create is only the beginning. Then there are the broader issues that the denizens of Silicon Valley expect their employers to have a stance on: immigration, income inequality, artificial intelligence, automation, transgender rights, climate change, privacy, data rights and whether tech companies should be helping the government do controversial things. It’s an ethical swamp out there.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "f5775df5-59eb-4533-a2cb-e150412ec4f6",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "That’s why, in a recent interview, Marc Benioff, the co-chief executive and a founder of Salesforce, told me he was in the process of hiring a chief ethical officer to help anticipate and address any thorny conundrums it might encounter as a business — like the decision it had to make a few months back about whether it should stop providing recruitment software for Customs and Border Protection because of the government’s policy of separating immigrant families at the border.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "That’s why, in a recent interview, Marc Benioff, the co-chief executive and a founder of Salesforce, told me he was in the process of hiring a chief ethical officer to help anticipate and address any thorny conundrums it might encounter as a business — like the decision it had to make a few months back about whether it should stop providing recruitment software for Customs and Border Protection because of the government’s policy of separating immigrant families at the border.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "31405c6e-7ece-4667-8c4d-36c9d79a0bfa",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Amid much criticism, Mr. Benioff decided to keep the contract, but said he would focus more on social and political issues.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Amid much criticism, Mr. Benioff decided to keep the contract, but said he would focus more on social and political issues.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "a2ab7e8a-d521-401d-89ae-9eb27efb9990",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "At a recent company event, he elaborated: “We can have a structured conversation not just with our own employees myopically, but by bringing in the key advisers, supporters and pundits and philosophers and everybody necessary to ask the question if what we are doing today is ethical and humane.”",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "At a recent company event, he elaborated: “We can have a structured conversation not just with our own employees myopically, but by bringing in the key advisers, supporters and pundits and philosophers and everybody necessary to ask the question if what we are doing today is ethical and humane.”",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "a4498e1e-8b85-48d7-802a-db447ca7d1ac",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "23andMe has also toyed with the idea of hiring a chief ethics officer. In an interview I did this week with its chief executive, Anne Wojcicki, she said the genetics company had even interviewed candidates, but that many of them wanted to remain in academia to be freer to ponder these issues. She acknowledged that the collection of DNA data is rife with ethical considerations, but said, “I think it has to be our management and leaders who have to add this to our skill set, rather than just hire one person to determine this.”",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "23andMe has also toyed with the idea of hiring a chief ethics officer. In an interview I did this week with its chief executive, Anne Wojcicki, she said the genetics company had even interviewed candidates, but that many of them wanted to remain in academia to be freer to ponder these issues. She acknowledged that the collection of DNA data is rife with ethical considerations, but said, “I think it has to be our management and leaders who have to add this to our skill set, rather than just hire one person to determine this.”",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "cbf7e7e0-5552-4b3f-b09e-9dcca120931c",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "When asked about the idea of a single source of wisdom on ethics, some point out that legal or diversity/inclusion departments are designed for that purpose and that the ethics should really come from the top — the chief executive.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "When asked about the idea of a single source of wisdom on ethics, some point out that legal or diversity/inclusion departments are designed for that purpose and that the ethics should really come from the top — the chief executive.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "d24b2887-0f1f-4e91-99c1-c295bed8ad65",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Also of concern is the possibility that a single person would not get listened to or, worse, get steamrollered. And, if the person was bad at the job, of course, it could drag the whole thing down.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Also of concern is the possibility that a single person would not get listened to or, worse, get steamrollered. And, if the person was bad at the job, of course, it could drag the whole thing down.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "78c55f65-c8b8-4364-a369-c40699968e90",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Others are more worried that the move would be nothing but window dressing. One consultant who focuses on ethics, but did not want to be named, told me: “We haven’t even defined ethics, so what even is ethical use, especially for Silicon Valley companies that are babies in this game?”",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Others are more worried that the move would be nothing but window dressing. One consultant who focuses on ethics, but did not want to be named, told me: “We haven’t even defined ethics, so what even is ethical use, especially for Silicon Valley companies that are babies in this game?”",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "0b492111-1586-4a73-8848-04f0c391aadc",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "How can an industry that, unlike other business sectors, persistently promotes itself as doing good, learn to do that in reality? Do you want to not do harm, or do you want to do good? These are two totally different things.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "How can an industry that, unlike other business sectors, persistently promotes itself as doing good, learn to do that in reality? Do you want to not do harm, or do you want to do good? These are two totally different things.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "302f8229-2404-460b-8c3c-e7058b4365e5",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "And how do you put an official ethical system in place without it seeming like you’re telling everyone how to behave? Who gets to decide those rules anyway, setting a moral path for the industry and — considering tech companies’ enormous power — the world.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "And how do you put an official ethical system in place without it seeming like you’re telling everyone how to behave? Who gets to decide those rules anyway, setting a moral path for the industry and — considering tech companies’ enormous power — the world.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "8f9bc91c-5662-4b3f-a110-809f46b79f49",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Like I said, adult supervision. Or maybe, better still, Silicon Valley itself has to grow up.",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": false,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Like I said, adult supervision. Or maybe, better still, Silicon Valley itself has to grow up.",\
                        "href": null\
                    }\
                ]\
            }\
        },\
        {\
            "object": "block",\
            "id": "7bea1831-a25c-4b3e-8c9b-b37de814f948",\
            "created_time": "2021-04-27T20:38:19.437Z",\
            "last_edited_time": "2021-04-27T20:38:19.437Z",\
            "has_children": false,\
            "type": "paragraph",\
            "paragraph": {\
                "text": [\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Follow The New York Times Opinion section on ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Follow The New York Times Opinion section on ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Facebook",\
                            "link": {\
                                "url": "https://www.facebook.com/nytopinion"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Facebook",\
                        "href": "https://www.facebook.com/nytopinion"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": ", ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": ", ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Twitter (@NYTopinion)",\
                            "link": {\
                                "url": "http://twitter.com/NYTOpinion"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Twitter (@NYTopinion)",\
                        "href": "http://twitter.com/NYTOpinion"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": " and ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": " and ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Instagram",\
                            "link": {\
                                "url": "https://www.instagram.com/nytopinion/"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Instagram",\
                        "href": "https://www.instagram.com/nytopinion/"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": ", and sign up for the ",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": ", and sign up for the ",\
                        "href": null\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": "Opinion Today newsletter",\
                            "link": {\
                                "url": "http://www.nytimes.com/newsletters/opiniontoday/"\
                            }\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": "Opinion Today newsletter",\
                        "href": "http://www.nytimes.com/newsletters/opiniontoday/"\
                    },\
                    {\
                        "type": "text",\
                        "text": {\
                            "content": ".",\
                            "link": null\
                        },\
                        "annotations": {\
                            "bold": false,\
                            "italic": true,\
                            "strikethrough": false,\
                            "underline": false,\
                            "code": false,\
                            "color": "default"\
                        },\
                        "plain_text": ".",\
                        "href": null\
                    }\
                ]\
            }\
        }\
    ],
    "next_cursor": null,
    "has_more": false
}
```

Date

Wed, 28 Apr 2021 23:53:00 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com/v3 https://embed.typeform.com https://admin.typeform.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com/v3 https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com/v3 https://embed.typeform.com https://admin.typeform.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com/v3 https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com/v3 https://embed.typeform.com https://admin.typeform.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com/v3 https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

Set-Cookie

notion_browser_id=a1b1f1dd-7731-4a2b-b968-10b475e3b526; Domain=www.notion.so; Path=/; Expires=Sun, 05 Jan 2053 01:39:40 GMT; Secure

ETag

W/"65f3-d0AArGizyGsk597xfjWN7976xCc"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

cf-request-id

09bc7f8a2a00006dc41a11e000000001

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

647435237cce6dc4-SJC

### PATCH[Append block children](https://www.postman.com/notionhq/notion-s-api-workspace/request/wqzp20p/append-block-children)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/wqzp20p/append-block-children)

https://api.notion.com/v1/blocks/:id/children

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Authorization

Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns

Content-Type

application/json

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

View More

json

```json highlighted-code__code
{
	"children": [\
		{\
			"object": "block",\
			"type": "heading_2",\
			"heading_2": {\
				"rich_text": [{ "type": "text", "text": { "content": "Lacinato kale" } }]\
			}\
		},\
		{\
			"object": "block",\
			"type": "paragraph",\
			"paragraph": {\
				"rich_text": [\
					{\
						"type": "text",\
						"text": {\
							"content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",\
							"link": { "url": "https://en.wikipedia.org/wiki/Lacinato_kale" }\
						}\
					}\
				]\
			}\
		}\
	]
}
```

Example

200 Success - Append block children

Request

View More

cURL

```curl highlighted-code__code
curl --location --request PATCH 'https://api.notion.com/v1/blocks/:id/children' \
--header 'Authorization: Bearer secret_t1CdN9S8yicG5eWLUOfhcWaOscVnFXns' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
	"children": [\
		{\
			"object": "block",\
			"type": "heading_2",\
			"heading_2": {\
				"text": [{ "type": "text", "text": { "content": "Lacinato kale" } }]\
			}\
		},\
		{\
			"object": "block",\
			"type": "paragraph",\
			"paragraph": {\
				"text": [\
					{\
						"type": "text",\
						"text": {\
							"content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",\
							"link": { "url": "https://en.wikipedia.org/wiki/Lacinato_kale" }\
						}\
					}\
				]\
			}\
		}\
	]
}'
```

200 OK

Response

- Body
- Headers (23)

json

```json highlighted-code__code
{
  "object": "block",
  "id": "a1712d54-53e4-4893-a69d-4d581cd2c845",
  "created_time": "2021-04-27T20:38:19.437Z",
  "last_edited_time": "2021-05-12T06:07:37.724Z",
  "has_children": true,
  "type": "child_page",
  "child_page": {
    "title": "Who Will Teach Silicon Valley to Be Ethical? "
  }
}
```

Date

Wed, 12 May 2021 06:07:37 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://api.segment.io https://api.pgncs.notion.so https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

Set-Cookie

notion_browser_id=0724819e-ad9a-4b7f-b50e-e5c75d6763dd; Domain=www.notion.so; Path=/; Expires=Sat, 18 Jan 2053 07:54:17 GMT; Secure

ETag

W/"105-p1Ka6kLp+wkCMX+oZhcjZAtwEtc"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

cf-request-id

0a00c92e8d00000231bf82c000000001

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

64e177c41a820231-SJC

Content-Encoding

gzip

### PATCH[Update a block](https://www.postman.com/notionhq/notion-s-api-workspace/request/azkl7uy/update-a-block)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/azkl7uy/update-a-block)

https://api.notion.com/v1/blocks/:id

This endpoint allows you to update block content. [See Full Documentation](https://developers.notion.com/reference/update-a-block)

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Bodyraw (json)

json

```json highlighted-code__code
{
    "paragraph": {
        "rich_text": [{\
            "type": "text",\
            "text": { "content": "hello to you"}\
        }]
    }
}
```

Example

200 Success - Update a block

Request

cURL

```curl highlighted-code__code
curl --location --request PATCH 'https://api.notion.com/v1/blocks/:id' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "paragraph": {
        "text": [{\
            "type": "text",\
            "text": { "content": "hello to you"}\
        }]
    }
}'
```

200 OK

Response

- Body
- Headers (22)

View More

json

```json highlighted-code__code
{
    "object": "block",
    "id": "4868767d-9029-4b9d-a41b-652ef4c9c7b9",
    "created_time": "2021-08-06T17:46:00.000Z",
    "last_edited_time": "2021-08-12T00:12:00.000Z",
    "has_children": false,
    "type": "paragraph",
    "paragraph": {
        "text": [\
            {\
                "type": "text",\
                "text": {\
                    "content": "hello to you",\
                    "link": null\
                },\
                "annotations": {\
                    "bold": false,\
                    "italic": false,\
                    "strikethrough": false,\
                    "underline": false,\
                    "code": false,\
                    "color": "default"\
                },\
                "plain_text": "hello to you",\
                "href": null\
            }\
        ]
    }
}
```

Date

Thu, 12 Aug 2021 00:12:49 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com https://client-registry.mutinycdn.com https://client.mutinycdn.com/ https://user-data.mutinycdn.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io https://user-data.mutinycdn.com https://api-v2.mutinyhq.io https://api.statuspage.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com https://client-registry.mutinycdn.com https://client.mutinycdn.com/ https://user-data.mutinycdn.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io https://user-data.mutinycdn.com https://api-v2.mutinyhq.io https://api.statuspage.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com https://client-registry.mutinycdn.com https://client.mutinycdn.com/ https://user-data.mutinycdn.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io https://user-data.mutinycdn.com https://api-v2.mutinyhq.io https://api.statuspage.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

Set-Cookie

notion_browser_id=72dd4057-624e-4aa3-80c6-ab911ed059b7; Domain=www.notion.so; Path=/; Expires=Sun, 20 Apr 2053 01:59:29 GMT; Secure

ETag

W/"1ae-RFHXdRIvpQZuh0kRKb9XuWbFwzo"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

67d57e86ea672544-SJC

Content-Encoding

gzip

### GET[Retrieve a block](https://www.postman.com/notionhq/notion-s-api-workspace/request/iusrfam/retrieve-a-block)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/iusrfam/retrieve-a-block)

https://api.notion.com/v1/blocks/:id

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Example

200 Success - Retrieve a block

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/blocks/:id' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (22)

View More

json

```json highlighted-code__code
{
    "object": "block",
    "id": "4868767d-9029-4b9d-a41b-652ef4c9c7b9",
    "created_time": "2021-08-06T17:46:00.000Z",
    "last_edited_time": "2021-08-12T00:12:00.000Z",
    "has_children": false,
    "type": "paragraph",
    "paragraph": {
        "text": [\
            {\
                "type": "text",\
                "text": {\
                    "content": "hello to you",\
                    "link": null\
                },\
                "annotations": {\
                    "bold": false,\
                    "italic": false,\
                    "strikethrough": false,\
                    "underline": false,\
                    "code": false,\
                    "color": "default"\
                },\
                "plain_text": "hello to you",\
                "href": null\
            }\
        ]
    }
}
```

Date

Thu, 12 Aug 2021 00:14:42 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com https://client-registry.mutinycdn.com https://client.mutinycdn.com/ https://user-data.mutinycdn.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io https://user-data.mutinycdn.com https://api-v2.mutinyhq.io https://api.statuspage.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com https://client-registry.mutinycdn.com https://client.mutinycdn.com/ https://user-data.mutinycdn.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io https://user-data.mutinycdn.com https://api-v2.mutinyhq.io https://api.statuspage.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://api.amplitude.com https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://platform.twitter.com https://cdn.syndication.twimg.com https://www.googletagmanager.com https://x.clearbitjs.com https://client-registry.mutinycdn.com https://client.mutinycdn.com/ https://user-data.mutinycdn.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://api.amplitude.com https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://api.unsplash.com https://boards-api.greenhouse.io https://user-data.mutinycdn.com https://api-v2.mutinyhq.io https://api.statuspage.io; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

Set-Cookie

notion_browser_id=e557ec39-01fc-4a4e-84a1-0a6b1ab4a579; Domain=www.notion.so; Path=/; Expires=Sun, 20 Apr 2053 02:01:22 GMT; Secure

ETag

W/"1ae-RFHXdRIvpQZuh0kRKb9XuWbFwzo"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

67d58148ef562544-SJC

Content-Encoding

gzip

### DELETE[Delete a block](https://www.postman.com/notionhq/notion-s-api-workspace/request/70yxnrh/delete-a-block)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/70yxnrh/delete-a-block)

https://api.notion.com/v1/blocks/:id

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Path Variables

id

Example

200 Success - Delete a block

Request

cURL

```curl highlighted-code__code
curl --location --request DELETE 'https://api.notion.com/v1/blocks/:id' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "block",
    "id": "4868767d-9029-4b9d-a41b-652ef4c9c7b9",
    "created_time": "2021-08-06T17:46:00.000Z",
    "last_edited_time": "2022-02-24T22:26:00.000Z",
    "created_by": {
        "object": "user",
        "id": "6794760a-1f15-45cd-9c65-0dfe42f5135a"
    },
    "last_edited_by": {
        "object": "user",
        "id": "92a680bb-6970-4726-952b-4f4c03bff617"
    },
    "has_children": false,
    "archived": true,
    "type": "paragraph",
    "paragraph": {
        "text": [\
            {\
                "type": "text",\
                "text": {\
                    "content": "hello to you",\
                    "link": null\
                },\
                "annotations": {\
                    "bold": false,\
                    "italic": false,\
                    "strikethrough": false,\
                    "underline": false,\
                    "code": false,\
                    "color": "default"\
                },\
                "plain_text": "hello to you",\
                "href": null\
            }\
        ]
    }
}
```

Date

Thu, 24 Feb 2022 22:26:40 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=aa7fa731-b5ed-4e45-abdd-adb4223f12ce; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:26:36 GMT; Secure

Set-Cookie

notion_experiment_device_id=f70a2b27-ed37-4387-93fe-494c9a385a83; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:26:36 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:26:36 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"258-nR8cSrr3A4mS1zWlKjaHASxX/tQ"

Vary

Accept-Encoding

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2c1dcfdbf0255c-SJC

Content-Encoding

gzip

## Search

Search all pages and databases shared with your Notion integration. To learn more, read Notion’s [official documentation](https://developers.notion.com/reference/post-search) for the Public API endpoints.

Authorization Bearer Token

This folder is using an authorization helper from collection Notion API

### POST[Search](https://www.postman.com/notionhq/notion-s-api-workspace/request/9dym5y9/search)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/9dym5y9/search)

https://api.notion.com/v1/search

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Content-Type

application/json

Notion-Version

2022-02-22

Bodyraw (json)

json

```json highlighted-code__code
{
  "query": "Media Article",
  "sort": {
    "direction": "ascending",
    "timestamp": "last_edited_time"
  }
}
```

Example

200 Success - Search

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/search' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "query": "Media Article",
    "sort": {
        "direction": "ascending",
        "timestamp": "last_edited_time"
    }
}'
```

200 OK

Response

- Body
- Headers (24)

View More

json

```json highlighted-code__code
{
    "object": "list",
    "results": [\
        {\
            "object": "page",\
            "id": "ae1905c3-b77b-475b-b98f-7596c242137f",\
            "created_time": "2021-05-21T16:41:00.000Z",\
            "last_edited_time": "2021-05-21T16:41:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "8e2c2b76-9e1d-47d2-87b9-ed3035d607ae"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": true,\
                                "italic": true,\
                                "strikethrough": true,\
                                "underline": true,\
                                "code": true,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-ae1905c3b77b475bb98f7596c242137f"\
        },\
        {\
            "object": "page",\
            "id": "8f16061d-4b77-4dbc-bf04-e8b0b4319b5a",\
            "created_time": "2021-05-21T16:42:00.000Z",\
            "last_edited_time": "2021-05-21T16:42:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "7a94f22f-59ae-484d-90ac-4aeddd667641"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": true,\
                                "italic": true,\
                                "strikethrough": true,\
                                "underline": true,\
                                "code": true,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "date": {\
                    "id": "Lpwp",\
                    "type": "date",\
                    "date": null\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Wine Pairing": {\
                    "id": "WO%40Z",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-8f16061d4b774dbcbf04e8b0b4319b5a"\
        },\
        {\
            "object": "page",\
            "id": "dc2a9117-163d-4075-907e-604b2f04c504",\
            "created_time": "2021-06-15T17:23:00.000Z",\
            "last_edited_time": "2021-06-15T17:23:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "7a94f22f-59ae-484d-90ac-4aeddd667641"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "date": {\
                    "id": "Lpwp",\
                    "type": "date",\
                    "date": null\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Wine Pairing": {\
                    "id": "WO%40Z",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-dc2a9117163d4075907e604b2f04c504"\
        },\
        {\
            "object": "page",\
            "id": "c443c084-4637-4df2-ba37-b3c8a7e3d062",\
            "created_time": "2021-06-15T17:23:00.000Z",\
            "last_edited_time": "2021-06-15T17:23:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "7a94f22f-59ae-484d-90ac-4aeddd667641"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "date": {\
                    "id": "Lpwp",\
                    "type": "date",\
                    "date": null\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Wine Pairing": {\
                    "id": "WO%40Z",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-c443c08446374df2ba37b3c8a7e3d062"\
        },\
        {\
            "object": "page",\
            "id": "0ac85319-05c5-4b5b-b812-7ea0f6476ea0",\
            "created_time": "2021-06-15T17:23:00.000Z",\
            "last_edited_time": "2021-06-15T17:23:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "7a94f22f-59ae-484d-90ac-4aeddd667641"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "date": {\
                    "id": "Lpwp",\
                    "type": "date",\
                    "date": null\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Wine Pairing": {\
                    "id": "WO%40Z",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-0ac8531905c54b5bb8127ea0f6476ea0"\
        },\
        {\
            "object": "page",\
            "id": "794fc25a-7f59-419d-a6e5-d9f0b516ecc7",\
            "created_time": "2021-06-15T17:24:00.000Z",\
            "last_edited_time": "2021-06-15T17:24:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "7a94f22f-59ae-484d-90ac-4aeddd667641"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "date": {\
                    "id": "Lpwp",\
                    "type": "date",\
                    "date": null\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Wine Pairing": {\
                    "id": "WO%40Z",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "8c4a056e-6709-4dd1-ba58-d34d9480855a",\
                        "name": "Ready to Start",\
                        "color": "yellow"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-794fc25a7f59419da6e5d9f0b516ecc7"\
        },\
        {\
            "object": "page",\
            "id": "41ad30b7-98e7-4c55-bf21-7ac7f09c2fd5",\
            "created_time": "2021-06-15T17:24:00.000Z",\
            "last_edited_time": "2021-06-15T17:24:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "7a94f22f-59ae-484d-90ac-4aeddd667641"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "date": {\
                    "id": "Lpwp",\
                    "type": "date",\
                    "date": null\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Wine Pairing": {\
                    "id": "WO%40Z",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "b598e780-263b-4b02-862c-9bf7a91859ac",\
                        "name": "New Option",\
                        "color": "orange"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-41ad30b798e74c55bf217ac7f09c2fd5"\
        },\
        {\
            "object": "page",\
            "id": "6a313bae-fdd3-4617-9bd6-5b132f23be35",\
            "created_time": "2021-06-15T17:24:00.000Z",\
            "last_edited_time": "2021-06-15T17:24:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "last_edited_by": {\
                "object": "user",\
                "id": "92a680bb-6970-4726-952b-4f4c03bff617"\
            },\
            "cover": null,\
            "icon": null,\
            "parent": {\
                "type": "database_id",\
                "database_id": "7a94f22f-59ae-484d-90ac-4aeddd667641"\
            },\
            "archived": false,\
            "properties": {\
                "Score /5": {\
                    "id": ")Y7%22",\
                    "type": "select",\
                    "select": {\
                        "id": "5c944de7-3f4b-4567-b3a1-fa2c71c540b6",\
                        "name": "⭐️⭐️⭐️⭐️⭐️",\
                        "color": "default"\
                    }\
                },\
                "Type": {\
                    "id": "%2F7eo",\
                    "type": "select",\
                    "select": {\
                        "id": "f96d0d0a-5564-4a20-ab15-5f040d49759e",\
                        "name": "Article",\
                        "color": "default"\
                    }\
                },\
                "Publisher": {\
                    "id": "%3E%24Pb",\
                    "type": "select",\
                    "select": {\
                        "id": "01f82d08-aa1f-4884-a4e0-3bc32f909ec4",\
                        "name": "The Atlantic",\
                        "color": "red"\
                    }\
                },\
                "Summary": {\
                    "id": "%3F%5C25",\
                    "type": "rich_text",\
                    "rich_text": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "Some think chief ethics officers could help technology companies navigate political and social questions.",\
                            "href": null\
                        }\
                    ]\
                },\
                "Publishing/Release Date": {\
                    "id": "%3Fex%2B",\
                    "type": "date",\
                    "date": {\
                        "start": "2020-12-08T12:00:00.000+00:00",\
                        "end": null,\
                        "time_zone": null\
                    }\
                },\
                "date": {\
                    "id": "Lpwp",\
                    "type": "date",\
                    "date": null\
                },\
                "Link": {\
                    "id": "VVMi",\
                    "type": "url",\
                    "url": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html"\
                },\
                "Wine Pairing": {\
                    "id": "WO%40Z",\
                    "type": "rich_text",\
                    "rich_text": []\
                },\
                "Read": {\
                    "id": "_MWJ",\
                    "type": "checkbox",\
                    "checkbox": false\
                },\
                "Status": {\
                    "id": "%60zz5",\
                    "type": "select",\
                    "select": {\
                        "id": "ad038109-97d3-4b5d-a93a-3b88229b1b58",\
                        "name": "New Option 3",\
                        "color": "purple"\
                    }\
                },\
                "Author": {\
                    "id": "qNw_",\
                    "type": "multi_select",\
                    "multi_select": []\
                },\
                "Name": {\
                    "id": "title",\
                    "type": "title",\
                    "title": [\
                        {\
                            "type": "text",\
                            "text": {\
                                "content": "New Media Article",\
                                "link": null\
                            },\
                            "annotations": {\
                                "bold": false,\
                                "italic": false,\
                                "strikethrough": false,\
                                "underline": false,\
                                "code": false,\
                                "color": "default"\
                            },\
                            "plain_text": "New Media Article",\
                            "href": null\
                        }\
                    ]\
                }\
            },\
            "url": "https://www.notion.so/New-Media-Article-6a313baefdd346179bd65b132f23be35"\
        }\
    ],
    "next_cursor": null,
    "has_more": false
}
```

Date

Thu, 24 Feb 2022 22:20:55 GMT

Content-Type

application/json; charset=utf-8

Transfer-Encoding

chunked

Connection

keep-alive

Set-Cookie

notion_browser_id=a5228fa0-e43e-487d-af88-dc0c968354f1; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:20:55 GMT; Secure

Set-Cookie

notion_experiment_device_id=e427dc17-f16a-4d3f-98e9-9e56d2f638f7; Domain=www.notion.so; Path=/; Expires=Fri, 24 Feb 2023 22:20:55 GMT; Secure

Set-Cookie

notion_check_cookie_consent=false; Domain=www.notion.so; Path=/; Expires=Fri, 25 Feb 2022 22:20:55 GMT; Secure

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-XSS-Protection

1; mode=block

Referrer-Policy

same-origin

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

X-WebKit-CSP

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com; connect-src 'self' https://msgstore.www.notion.so wss://msgstore.www.notion.so ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-production-snapshots-2.s3.us-west-2.amazonaws.com https: http: https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io wss://nexus-websocket-a.intercom.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com; font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com; img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com; frame-src https: http:; media-src https: http:

ETag

W/"4861-NbPEy8LGXcEcgaoZaIeasLCwwWU"

Vary

Accept-Encoding

Content-Encoding

gzip

CF-Cache-Status

DYNAMIC

Expect-CT

max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"

Server

cloudflare

CF-RAY

6e2c157ceda9255c-SJC

## Comments

[Comments](https://developers.notion.com/reference/comment-object) can be added to a page or inline (i.e., to blocks).
These comment-related endpoints allow developers to work with comments programmatically by [creating](https://developers.notion.com/reference/create-a-comment) and [retrieving](https://developers.notion.com/reference/retrieve-a-block) them.

To learn more, read [Notion’s official documentation](https://developers.notion.com/reference/comment-object) for endpoints related to comments. We also recommend reading the official Notion guide for [working with comments](https://developers.notion.com/docs/working-with-comments).

Authorization Bearer Token

This folder is using an authorization helper from collection Notion API

### GET[Retrieve comments](https://www.postman.com/notionhq/notion-s-api-workspace/request/evddw43/retrieve-comments)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/evddw43/retrieve-comments)

https://api.notion.com/v1/comments?block\_id=&page\_size=100

Retrieve a user object using the ID specified in the request path.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Notion-Version

2022-02-22

Query Params

block_id

page_size

100

Example

200 Success - Retrieve a comment

Request

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/comments?block_id=' \
--header 'Notion-Version: 2022-02-22'
```

200 OK

Response

- Body
- Headers (16)

View More

json

```json highlighted-code__code
{
    "object": "list",
    "results": [\
        {\
            "object": "comment",\
            "id": "ed4c62f2-c0ad-4081-b6b8-dad025637741",\
            "parent": {\
                "type": "block_id",\
                "block_id": "5d4ca33c-d6b7-4675-93d9-84b70af45d1c"\
            },\
            "discussion_id": "ce18f8c6-ef2a-427f-b416-43531fc7c117",\
            "created_time": "2022-07-15T21:38:00.000Z",\
            "last_edited_time": "2022-07-15T21:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "952f41bb-da96-4d36-9c2e-74924eee8ef1"\
            },\
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "Please cite your source",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "Please cite your source",\
                    "href": null\
                }\
            ]\
        },\
        {\
            "object": "comment",\
            "id": "8949cb38-aee6-4c62-ba96-6ef7df9b4cf2",\
            "parent": {\
                "type": "block_id",\
                "block_id": "5d4ca33c-d6b7-4675-93d9-84b70af45d1c"\
            },\
            "discussion_id": "e63f446f-a84a-4cab-8f5a-b9e7779ecb67",\
            "created_time": "2022-07-15T21:38:00.000Z",\
            "last_edited_time": "2022-07-15T21:38:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "952f41bb-da96-4d36-9c2e-74924eee8ef1"\
            },\
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "What other nutrients does kale have?",\
                        "link": null\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "What other nutrients does kale have?",\
                    "href": null\
                }\
            ]\
        },\
        {\
            "object": "comment",\
            "id": "6cd52483-6d55-4f8a-a724-4adb1c17ed43",\
            "parent": {\
                "type": "block_id",\
                "block_id": "5d4ca33c-d6b7-4675-93d9-84b70af45d1c"\
            },\
            "discussion_id": "ce18f8c6-ef2a-427f-b416-43531fc7c117",\
            "created_time": "2022-07-18T21:48:00.000Z",\
            "last_edited_time": "2022-07-18T21:48:00.000Z",\
            "created_by": {\
                "object": "user",\
                "id": "e450a39e-9051-4d36-bc4e-8581611fc592"\
            },\
            "rich_text": [\
                {\
                    "type": "text",\
                    "text": {\
                        "content": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale",\
                        "link": {\
                            "url": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale"\
                        }\
                    },\
                    "annotations": {\
                        "bold": false,\
                        "italic": false,\
                        "strikethrough": false,\
                        "underline": false,\
                        "code": false,\
                        "color": "default"\
                    },\
                    "plain_text": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale",\
                    "href": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale"\
                }\
            ]\
        }\
    ],
    "next_cursor": null,
    "has_more": false,
    "type": "comment",
    "comment": {}
}
```

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://www.google.com https://www.gstatic.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://static.zdassets.com https://api.smooch.io https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://api-v2.mutinyhq.io https://client-registry.mutinycdn.com https://client.mutinycdn.com https://user-data.mutinycdn.com http://localhost:3003 http://0.0.0.0:3003;connect-src 'self' http://localhost:3001 ws://localhost:3001 ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-local-snapshots-2.s3.us-west-2.amazonaws.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so http://localhost:3000 https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io https://uploads.intercomcdn.com wss://nexus-websocket-a.intercom.io https://ekr.zdassets.com https://ekr.zendesk.com https://makenotion.zendesk.com https://api.smooch.io wss://api.smooch.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://www.googleadservices.com https://googleads.g.doubleclick.net https://region1.google-analytics.com https://region1.analytics.google.com https://www.google-analytics.com https://api-v2.mutinyhq.io https://client-registry.mutinycdn.com https://client.mutinycdn.com https://user-data.mutinycdn.com https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com https://statsigapi.net http://localhost:3003 ws://localhost:3003 ws://\*.pages.local.notion.co:3003 http://0.0.0.0:3003 ws://0.0.0.0:3003;font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com http://localhost:3003 http://0.0.0.0:3003;img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com https://region1.google-analytics.com https://region1.analytics.google.com http://localhost:3003 http://0.0.0.0:3003;style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com http://localhost:3003 http://0.0.0.0:3003;frame-src https: http:;media-src https: http:

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-Permitted-Cross-Domain-Policies

none

Referrer-Policy

same-origin

X-XSS-Protection

0

Content-Type

application/json; charset=utf-8

Content-Length

704

ETag

W/"2c0-mVXaT7TnMaE5ytatx672v7KLMB0"

Vary

Accept-Encoding

Date

Fri, 15 Jul 2022 16:58:23 GMT

Connection

keep-alive

Keep-Alive

timeout=5

### POST[Add comment to page](https://www.postman.com/notionhq/notion-s-api-workspace/request/8vku7jk/add-comment-to-page)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/8vku7jk/add-comment-to-page)

https://api.notion.com/v1/comments

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Content-Type

application/json

Notion-Version

2022-02-22

Bodyraw (json)

View More

json

```json highlighted-code__code
{
	"parent": {
		"page_id": ""
	},
	"rich_text": [\
		{\
			"text": {\
				"content": "Hello world"\
			}\
		}\
	]
}
```

Example

200 Success - Add comment to page

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/comments' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
	"parent": {
		"page_id": "5c6a28216bb14a7eb6e1c50111515c3d"
	},
	"rich_text": [\
		{\
			"text": {\
				"content": "hello hello"\
			}\
		},\
		{\
			"mention": {\
				"user": {\
					"object": "user",\
					"id": "952f41bb-da96-4d36-9c2e-74924eee8ef1"\
				}\
			}\
		}\
	]
}'
```

200 OK

Response

- Body
- Headers (16)

View More

json

```json highlighted-code__code
{
    "object": "comment",
    "id": "be20daa4-31ed-45a2-9591-24f3dc3a61c2",
    "parent": {
        "type": "page_id",
        "page_id": "5c6a2821-6bb1-4a7e-b6e1-c50111515c3d"
    },
    "discussion_id": "cf4df352-6cc8-433c-9296-7f3550bfe421",
    "created_time": "2022-07-18T21:50:00.000Z",
    "last_edited_time": "2022-07-18T21:50:00.000Z",
    "created_by": {
        "object": "user",
        "id": "e450a39e-9051-4d36-bc4e-8581611fc592"
    },
    "rich_text": [\
        {\
            "type": "text",\
            "text": {\
                "content": "Hello world",\
                "link": null\
            },\
            "annotations": {\
                "bold": false,\
                "italic": false,\
                "strikethrough": false,\
                "underline": false,\
                "code": false,\
                "color": "default"\
            },\
            "plain_text": "Hello world",\
            "href": null\
        }\
    ]
}
```

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://www.google.com https://www.gstatic.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://static.zdassets.com https://api.smooch.io https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://api-v2.mutinyhq.io https://client-registry.mutinycdn.com https://client.mutinycdn.com https://user-data.mutinycdn.com http://localhost:3003 http://0.0.0.0:3003;connect-src 'self' http://localhost:3001 ws://localhost:3001 ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-local-snapshots-2.s3.us-west-2.amazonaws.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so http://localhost:3000 https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io https://uploads.intercomcdn.com wss://nexus-websocket-a.intercom.io https://ekr.zdassets.com https://ekr.zendesk.com https://makenotion.zendesk.com https://api.smooch.io wss://api.smooch.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://www.googleadservices.com https://googleads.g.doubleclick.net https://region1.google-analytics.com https://region1.analytics.google.com https://www.google-analytics.com https://api-v2.mutinyhq.io https://client-registry.mutinycdn.com https://client.mutinycdn.com https://user-data.mutinycdn.com https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com https://statsigapi.net http://localhost:3003 ws://localhost:3003 ws://\*.pages.local.notion.co:3003 http://0.0.0.0:3003 ws://0.0.0.0:3003;font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com http://localhost:3003 http://0.0.0.0:3003;img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com https://region1.google-analytics.com https://region1.analytics.google.com http://localhost:3003 http://0.0.0.0:3003;style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com http://localhost:3003 http://0.0.0.0:3003;frame-src https: http:;media-src https: http:

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-Permitted-Cross-Domain-Policies

none

Referrer-Policy

same-origin

X-XSS-Protection

0

Content-Type

application/json; charset=utf-8

Content-Length

940

ETag

W/"3ac-FxFX1g8QlNhF6Pt6zjnEfIMlXcs"

Vary

Accept-Encoding

Date

Fri, 15 Jul 2022 20:21:42 GMT

Connection

keep-alive

Keep-Alive

timeout=5

### POST[Add comment to discussion](https://www.postman.com/notionhq/notion-s-api-workspace/request/lm7vmhf/add-comment-to-discussion)

[Open request](https://www.postman.com/notionhq/notion-s-api-workspace/request/lm7vmhf/add-comment-to-discussion)

https://api.notion.com/v1/comments

This request doesn't have a description.

Authorization Bearer Token

This request is using an authorization helper from collection Notion API

Request Headers

Content-Type

application/json

Notion-Version

2022-02-22

Bodyraw (json)

View More

json

```json highlighted-code__code
{
    "discussion_id": "",
    "rich_text": [\
        {\
            "text": {\
                "content": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale",\
                "link": {\
                    "type": "url",\
                    "url": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale"\
                }\
            }\
        }\
    ]
}
```

Example

200 Success - Add comment to page

Request

View More

cURL

```curl highlighted-code__code
curl --location 'https://api.notion.com/v1/comments' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
	"parent": {
		"page_id": "5c6a28216bb14a7eb6e1c50111515c3d"
	},
	"rich_text": [\
		{\
			"text": {\
				"content": "hello hello"\
			}\
		},\
		{\
			"mention": {\
				"user": {\
					"object": "user",\
					"id": "952f41bb-da96-4d36-9c2e-74924eee8ef1"\
				}\
			}\
		}\
	]
}'
```

200 OK

Response

- Body
- Headers (16)

View More

json

```json highlighted-code__code
{
    "object": "comment",
    "id": "6cd52483-6d55-4f8a-a724-4adb1c17ed43",
    "parent": {
        "type": "block_id",
        "block_id": "5d4ca33c-d6b7-4675-93d9-84b70af45d1c"
    },
    "discussion_id": "ce18f8c6-ef2a-427f-b416-43531fc7c117",
    "created_time": "2022-07-18T21:48:00.000Z",
    "last_edited_time": "2022-07-18T21:48:00.000Z",
    "created_by": {
        "object": "user",
        "id": "e450a39e-9051-4d36-bc4e-8581611fc592"
    },
    "rich_text": [\
        {\
            "type": "text",\
            "text": {\
                "content": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale",\
                "link": {\
                    "url": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale"\
                }\
            },\
            "annotations": {\
                "bold": false,\
                "italic": false,\
                "strikethrough": false,\
                "underline": false,\
                "code": false,\
                "color": "default"\
            },\
            "plain_text": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale",\
            "href": "https://www.healthline.com/nutrition/10-proven-benefits-of-kale"\
        }\
    ]
}
```

Content-Security-Policy

script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gist.github.com https://apis.google.com https://www.google.com https://www.gstatic.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so https://widget.intercom.io https://js.intercomcdn.com https://static.zdassets.com https://api.smooch.io https://logs-01.loggly.com https://cdn.segment.com https://analytics.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://embed.typeform.com https://admin.typeform.com https://public.profitwell.com js.sentry-cdn.com https://js.chilipiper.com https://platform.twitter.com https://cdn.syndication.twimg.com www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://api-v2.mutinyhq.io https://client-registry.mutinycdn.com https://client.mutinycdn.com https://user-data.mutinycdn.com http://localhost:3003 http://0.0.0.0:3003;connect-src 'self' http://localhost:3001 ws://localhost:3001 ws://localhost:\* ws://127.0.0.1:\* https://notion-emojis.s3-us-west-2.amazonaws.com https://s3-us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com https://notion-local-snapshots-2.s3.us-west-2.amazonaws.com https://cdn.amplitude.com https://api.amplitude.com https://hkfxbbdzib.notion.so http://localhost:3000 https://api.embed.ly https://js.intercomcdn.com https://api-iam.intercom.io https://uploads.intercomcdn.com wss://nexus-websocket-a.intercom.io https://ekr.zdassets.com https://ekr.zendesk.com https://makenotion.zendesk.com https://api.smooch.io wss://api.smooch.io https://logs-01.loggly.com https://cdn.segment.com https://api.segment.io https://analytics.pgncs.notion.so https://api.pgncs.notion.so https://o324374.ingest.sentry.io https://checkout.stripe.com https://js.stripe.com https://cdn.contentful.com https://preview.contentful.com https://images.ctfassets.net https://www2.profitwell.com https://tracking.chilipiper.com https://api.chilipiper.com https://api.unsplash.com https://boards-api.greenhouse.io https://www.googleadservices.com https://googleads.g.doubleclick.net https://region1.google-analytics.com https://region1.analytics.google.com https://www.google-analytics.com https://api-v2.mutinyhq.io https://client-registry.mutinycdn.com https://client.mutinycdn.com https://user-data.mutinycdn.com https://api.statuspage.io https://pgncd.notion.so https://api.statsig.com https://statsigapi.net http://localhost:3003 ws://localhost:3003 ws://\*.pages.local.notion.co:3003 http://0.0.0.0:3003 ws://0.0.0.0:3003;font-src 'self' data: https://cdnjs.cloudflare.com https://js.intercomcdn.com http://localhost:3003 http://0.0.0.0:3003;img-src 'self' data: blob: https: https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com https://region1.google-analytics.com https://region1.analytics.google.com http://localhost:3003 http://0.0.0.0:3003;style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://github.githubassets.com https://js.chilipiper.com https://platform.twitter.com https://ton.twimg.com http://localhost:3003 http://0.0.0.0:3003;frame-src https: http:;media-src https: http:

X-DNS-Prefetch-Control

off

X-Frame-Options

SAMEORIGIN

Strict-Transport-Security

max-age=5184000; includeSubDomains

X-Download-Options

noopen

X-Content-Type-Options

nosniff

X-Permitted-Cross-Domain-Policies

none

Referrer-Policy

same-origin

X-XSS-Protection

0

Content-Type

application/json; charset=utf-8

Content-Length

940

ETag

W/"3ac-FxFX1g8QlNhF6Pt6zjnEfIMlXcs"

Vary

Accept-Encoding

Date

Fri, 15 Jul 2022 20:21:42 GMT

Connection

keep-alive

Keep-Alive

timeout=5

###### Creator

[![Notion](https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629871571/team/5e4b440c0964a0f4eeffc6ce3f8b3b2869ef1fa52badc957844bf302ae91b103)\\
Notion](https://www.postman.com/notionhq)

JUMP TO

Introduction

[Users](https://www.postman.com/notionhq/notion-s-api-workspace/documentation/y28pjg6/notion-api?entity=folder-15568543-320e5339-63de-4018-a669-403f9731c82d)

[Databases](https://www.postman.com/notionhq/notion-s-api-workspace/documentation/y28pjg6/notion-api?entity=folder-15568543-43d03869-da82-4b12-a742-9aaf0c53da59)

[Pages](https://www.postman.com/notionhq/notion-s-api-workspace/documentation/y28pjg6/notion-api?entity=folder-15568543-8b1b3a4a-f2ac-4b1f-93a5-52fdeab7ec94)

[Blocks](https://www.postman.com/notionhq/notion-s-api-workspace/documentation/y28pjg6/notion-api?entity=folder-15568543-970ea25e-94a2-4473-8d57-03c9047d9767)

[Search](https://www.postman.com/notionhq/notion-s-api-workspace/documentation/y28pjg6/notion-api?entity=folder-15568543-f37de40c-5066-4acc-9594-3def9110bbad)

[Comments](https://www.postman.com/notionhq/notion-s-api-workspace/documentation/y28pjg6/notion-api?entity=folder-15568543-fcd21222-554e-47dc-9568-43799b74d106)

Online

Console

#### Getting Started

[What is Postman?](https://www.postman.com/product/what-is-postman/)[Customer Stories](https://www.postman.com/customers/)[Download Postman](https://www.postman.com/downloads/)

#### API Platform

[Collaborate in Workspaces](https://www.postman.com/product/workspaces/)[Organize with Collections](https://www.postman.com/collection/)[Explore the API Client](https://www.postman.com/product/api-client/)[Build Postman Flows](https://www.postman.com/product/flows/)[Work smarter with Postbot](https://www.postman.com/product/postbot/)[Browse API Tools](https://www.postman.com/product/tools/)

#### Enterprise Solutions

[Enterprise Essentials](https://www.postman.com/solutions/enterprise-essentials/)[API Test Automation](https://www.postman.com/solutions/api-test-automation/)[Internal API Management](https://www.postman.com/solutions/internal-api-management/)

#### Learning

[Learning Center Docs](https://learning.postman.com/docs/introduction/overview/)[Postman Academy](https://academy.postman.com/)[White Papers](https://www.postman.com/whitepaper/)[Breaking Changes Show](https://www.postman.com/events/breaking-changes/)[Templates](https://www.postman.com/templates/)[Tutorials](https://quickstarts.postman.com/)[Webinars](https://www.postman.com/events/intergalactic/)[State of the API Report](https://www.postman.com/state-of-api/)[Guide to API-First](https://www.postman.com/api-first/)

#### Community and Events

[POST/CON](https://www.postman.com/postcon/)[Blog](https://blog.postman.com/)[Community](https://www.postman.com/community/)[Student Program](https://www.postman.com/company/student-program/)[Events](https://www.postman.com/events/)[Postman Swag](https://store.getpostman.com/)

#### Support

[Support Center](https://www.postman.com/support/)[Reseller Support](https://www.postman.com/support/resellers-support/)[Postman Status](https://status.postman.com/)[Release Notes](https://www.postman.com/downloads/release-notes/)[Contact Us](https://www.postman.com/company/contact-us/)

- Body
- Headers (23)

- Body
- Headers (23)

- Body
- Headers (24)

- Body
- Headers (16)

- Body
- Headers (22)

- Body
- Headers (16)

- Body
- Headers (24)

- Body
- Headers (24)

- Body
- Headers (24)

- Body
- Headers (23)

- Body
- Headers (24)

- Body
- Headers (24)

- Body
- Headers (24)

- Body
- Headers (24)

- Body
- Headers (23)

- Body
- Headers (16)

- Body
- Headers (24)

- Body
- Headers (24)

- Body
- Headers (23)

- Body
- Headers (23)

- Body
- Headers (24)

- Body
- Headers (22)

- Body
- Headers (23)

- Body
- Headers (24)

- Body
- Headers (23)
