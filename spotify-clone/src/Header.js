import React from 'react'
import TrackSearchResult from './TrackSearchResult'
import SpotifyWebApi from 'spotify-web-api-node'
import {useState, useEffect} from 'react'
import './Header.css'


export default function Header({accessToken, playTrack}){
    const [profileName, setProfileName] = useState("")
    const [profilePicture, setProfilePicture] = useState()
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "1334612444874c62a1d3c7eb9abc99ea",
    }) 
    
    useEffect(()=>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        spotifyApi.getMe()
        .then(function(data) {
          setProfileName(data.body.display_name)
          setProfilePicture(data.body.images[0].url)
        }, function(err) {
          console.log('Something went wrong!', err)
        })
    },[accessToken])

    function chooseTrack(track){
        playTrack(track)
        setSearch('')
    }

    useEffect(()=>{
        if(!search) return setSearchResults([])
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.searchTracks(search).then(res=>{
            setSearchResults(res.body.tracks.items.map(track=>{
                const smallestAlbumImg = track.album.images.reduce(
                    (smallest, image ) => {
                        if(image.height < smallest.height) return image
                        return smallest  
                    }, )
                return{
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImg.url
                }
            })
        )})
    },[search, accessToken])

    return(
        <> 
        <div className="header">
            <div></div>
            <input className="search-bar" type="search" onChange={e => setSearch(e.target.value)} placeholder="Search Your Favorite Song"/>
            <div className="header-right">
                <div className="profilePictureWrapper">
                        <img className="profilePicture" src={profilePicture} style={{width: "100%"}}></img>
                </div>
                <p className="profileName">
                {profileName}</p>
            </div>
        </div>  
        {   
            searchResults.map(track => (
            <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
        ))}
        </>
    )
}