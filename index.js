const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa');

dotenv.config()

const express = require('express');
const http = require('http');
const morgan = require('morgan')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

const app = express()

app.use(morgan('tiny'))
app.use(express.json())

var client = jwksClient({
    jwksUri: process.env.JWKS_URI
});
function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

app.post('/verify', async (req, res) => {
    const { token } = req.body

    try {
        jwt.verify(token, getKey, {}, function (err, decoded) {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(`Successfully verified ${JSON.stringify(decoded)}`)
        });
    } catch (err) {
        console.error(`Error verifying: ${err}`)
        res.status(500).send(err)
    }
})

var server = http.createServer(app);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});