import React from 'react'
import './Liked.css'
import {useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import LikedSongResult from './LikedSongResult'

export default function Liked({accessToken}){
    const [likedSongs, setLiked] = useState([])  
    const spotifyApi = new SpotifyWebApi({
        clientId: "1334612444874c62a1d3c7eb9abc99ea",
    }) 
    
    useEffect(()=>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMySavedTracks({
            offset: 1
          })
          .then(function(data) {
            setLiked(data.body.items.map((song)=> { 
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
    },[accessToken])

    return(
        <>
            <div className="likedsong-container">
            <div className="liked-header">
                <img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" />
                <h1>Liked Songs</h1>
            </div>
           {   
                likedSongs.map((song,indexNo) => (
                <LikedSongResult song={song} indexNo={indexNo} key={song.uri}/>
            ))} 
            </div>
        </>
    )
}