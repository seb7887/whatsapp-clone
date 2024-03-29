# Whatsapp Clone

## GraphQL caching

Apollo-Client is a wrap around our GraphQL endpoint which essentially uses HTTP requests (and further on web-sockets, but we will get there), something that we've implemented manually so far. Not only it can be used to fetch data, but it will also cache the result of the query so it can be seamlessly re-used when we request the same data. This means that we will need to setup an Apollo-Client and replace all our `fetch()` calls with `client.query()` call.

## Live updates with GraphQL subscriptions

**GraphQL Subscriptions** is a mechanism that works on _web-sockets_ and live communication; clients can subscribe to it and be notified regards specific changes that happen in the backend. Notifications will be triggered manually by us and can be provided with parameters that provide additional information regards the triggered event.
Connection between the server and client for live updates could be based on HTTP polling or WebSockets
