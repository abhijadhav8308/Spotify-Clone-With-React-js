import React from "react"
import './login.css'

const Auth_URL = "https://accounts.spotify.com/authorize?client_id=1334612444874c62a1d3c7eb9abc99ea&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20user-read-currently-playing%20user-library-read%20user-library-modify%20streaming%20user-read-email%20user-read-private%20user-top-read"

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-div">
                <img className="spotify-logo" alt="spotify-logo" src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo.png"></img>
                <a className="login-btn btn" href={Auth_URL}>Login With Spotify</a>
            </div>
        </div>
    )
}