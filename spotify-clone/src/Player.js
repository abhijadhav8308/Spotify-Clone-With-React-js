import React, {useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import SpotifyPlayer from 'react-spotify-web-playback'; 
import './Player.css'
import { MdPlayArrow, MdSkipPrevious, MdSkipNext, MdPause } from "react-icons/md";

const spotifyApi = new SpotifyWebApi({
    clientId: "1334612444874c62a1d3c7eb9abc99ea",
}) 

export default function Player({accessToken}){
    const [playState, setplayState] = useState(false)
    useEffect(()=>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    function changePlayState(){
        playState ? setplayState(false) : setplayState(true)
    }

    useEffect(()=>{
        spotifyApi.play()
        .then(function() {
            console.log('Playback started');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    },[playState])

    return(
        <>
        <div className="song-player">
            <MdSkipPrevious size="lg"/>
            <button onClick={changePlayState}>
                {
                    playState ? <MdPause size="lg"/> :<MdPlayArrow size="lg"/> 
                }   
            </button>
            <MdSkipNext size="lg"/>
        </div>
        </>
    )
}