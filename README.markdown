# Sample JWT verification with JWKS

## Requirements

- [Node.js](https://nodejs.org/en/)

## Getting started

1. Install dependencies: `npm install`
2. Launch: `PORT=8080 JWKS_URI= node index.js` where `JWKS_URI` is a uri to a [JWK Set JSON data structure](https://tools.ietf.org/html/rfc7517)

## Usage

Issue a request to the `verify` endpoint:

```
curl --location --request POST 'http://localhost:8080/verify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "JWT goes here"
}'
```
