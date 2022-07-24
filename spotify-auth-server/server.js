const express = require('express')
const Spotifywebapi = require('spotify-web-api-node')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new Spotifywebapi({
        redirectUri: "http://localhost:3000",
        clientId: "1334612444874c62a1d3c7eb9abc99ea",
        clientSecret: "a2f10b0b11864e4ea1a2c0d8ed6e48d0", 
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,  
        })
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)