import React from 'react'
import './LikedSongResult.css'

export default function LikedSongResult({song, indexNo}){
    return(
        <div className="song-result">
            <div className='indexNo'>{(indexNo)+1}</div>
            <div className="flex-div">
                <img src={song.img}></img>
                <div className="song-info">
                    <div className='song-name'>{song.songName}</div>
                    <div className="song-artist">{song.artistName}</div> 
                </div>
            </div>
            <div className="albumName">{song.albumName}</div>
            <div className="duration">{song.duration}</div>
        </div>
    )
}