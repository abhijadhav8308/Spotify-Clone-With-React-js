import React from 'react'
import './Home.css'
import {useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Box from './Box'

export default function Home({accessToken}){

    const [newReleases, setNewReleases] = useState([])  
    const [topTracks, setTopTracks] = useState([])
    const [featuredPlaylist, setFeaturedPlaylist] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "1334612444874c62a1d3c7eb9abc99ea",
    }) 

    useEffect(()=>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        spotifyApi.getMyTopTracks({ limit : 5})
        .then(function(data) {
            let topTracksData = data.body.items
            setTopTracks(
                data.body.items.map((song) => {
                return{
                    uri: song.uri,
                    name: song.name,
                    artist: song.artists[0].name,
                    image: song.album.images[1].url,
                }
            }))
        }, function(err) {
            console.log('Something went wrong!', err)
        })

        spotifyApi.getFeaturedPlaylists({ limit : 5, offset: 1, country: 'IN', locale: 'sv_IN', timestamp:'2022-06-13T09:00:00' })
        .then(function(data) {
            setFeaturedPlaylist(
                data.body.playlists.items.map((song) => {
                return{
                    uri: song.uri,
                    name: song.name,
                    image: song.images[0].url,
                }
            }))
        }, function(err) {
            console.log("Something went wrong!", err)
        })

        spotifyApi.getNewReleases({ limit : 5, offset: 15, country: 'IN', locale: 'sv_IN', })
        .then(function(data) {
            setNewReleases(
                data.body.albums.items.map((song) => {
                return{
                    uri: song.uri,
                    name: song.name,
                    artist: song.artist,
                    image: song.images[1].url,
                }
            }))
            }, function(err) {
            console.log("Something went wrong!", err)
            })
        },[accessToken])

    return(
        <div className="home-container">
            <h2>Top Tracks</h2>
            <div className="Top-tracks">
                {
                    topTracks.map((release) => (
                        <Box release={release} key={release.uri} />
                    ))
                }
            </div>
            <h2>Featured Playlists</h2>
            <div className="Featured-playlists">
                {
                    featuredPlaylist.map((release) => (
                        <Box release={release} key={release.uri} />
                    ))
                }
            </div>
            <h2>New Releases</h2>
            <div className="New-releases">
                {
                    newReleases.map((release) => (
                        <Box release={release} key={release.uri} />
                    ))
                }
            </div>
        </div>
    )
}