import React from 'react'
import './TrackSearchResult.css'

export default function TrackSearchResult({track, chooseTrack}){

    function handlePlay(){
        chooseTrack(track)
    }

    return(
        <div className="search-result" onClick={handlePlay}>
            <img src={track.albumUrl}></img>
            <div className="track-info">
                <div>{track.title}</div>
                <div className="track-artist">{track.artist}</div>
            </div>
        </div>
    )
}