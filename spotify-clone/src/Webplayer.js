import React from 'react'
import {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'; 
import './Webplayer.css'

export default function WebPlayer({accessToken, trackUri}){
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true),[trackUri])

    if(!accessToken) return null
    return(
    <>
        <div className="song-player">
        <SpotifyPlayer className="song-player"
        token={accessToken}
        showSaveIcon
        callback={state => {
            if(!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris = { trackUri ? [trackUri] : []}
        />
        </div>
    </>
    )
}