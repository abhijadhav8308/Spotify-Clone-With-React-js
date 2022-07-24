import React from 'react'
import './ShowPlaylist.css'
import {useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import LikedSongResult from './LikedSongResult'

export default function ShowPlaylist({accessToken, match}){
    const [playlistName, setplaylistName] = useState("")
    const [playlistSongs, setPlaylist] = useState([])  
    const spotifyApi = new SpotifyWebApi({
        clientId: "1334612444874c62a1d3c7eb9abc99ea",
    }) 
    useEffect(()=>{
        if(!accessToken) return  
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getPlaylist(match.params.id)
        .then(function(data) {
            setplaylistName(data.body.name)
            console.log(data.body.name)
            setPlaylist(data.body.tracks.items.map((song) => {
                return{
                    songName: song.track.name,
                    img: song.track.album.images[2].url,  
                    uri: song.track.uri,
                    artistName: song.track.artists[0].name,
                    albumName: song.track.album.name,
                    duration: (song.track.duration_ms /60000).toFixed(2),  
                }
            }))
        }, function(err) {
            console.log('Something went wrong!', err)
        })
    },[accessToken, match.params.id])

    return(
        <>
            <div className="playlist-container">
            <div className="playlist-header">
                <img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" />
                <h1>{playlistName}</h1>
            </div>
            {   
                playlistSongs.map((song,indexNo) => (
                <LikedSongResult song={song} indexNo={indexNo} key={song.uri}/>
            ))}
            </div>
        </>
    )
}