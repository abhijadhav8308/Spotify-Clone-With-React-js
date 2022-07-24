import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import './Sidebar.css'
import { MdHome } from "react-icons/md"
import { AiFillHeart } from "react-icons/ai"

export default function Sidebar({accessToken}){
    const [playList, setPlayList] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "1334612444874c62a1d3c7eb9abc99ea",
    }) 

    useEffect(()=>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
       
        spotifyApi.getUserPlaylists('31iopoer2yvkhodscb7gsii52gpy')
        .then(data => {
            setPlayList(data.body.items.map(
                list => {
                    return{
                        playlistName:list.name,
                        playlistLink:list.href,
                        playlistID:list.id
                    }
                }
            ))
        },function(err) {
            console.log('Something went wrong!', err)
        })
    },[accessToken])

    return(
        <div className="sidebar-container">
            <div className="sticky-container">
            <div className="sidebar-logo">
                <img style={{width:"100%"}} src="https://www.pngkey.com/png/full/190-1907978_spotify-logo-png-white-spotify-logo-white-transparent.png"></img>
            </div>
            <Link to="/"><div className="sidebar-option"><MdHome size={"1.5em"} style={{ verticalAlign: "bottom"}}/><span>Home</span></div></Link>
            <Link to="/liked-songs"><div className="sidebar-option"><AiFillHeart size={"1.5em"} style={{ verticalAlign: "bottom"}}/><span>Liked Songs</span></div></Link>
            <hr></hr>
            {
                playList.map(listele => (
                    <Link to={`/playlist/${listele.playlistID}`} key={listele.playlistID}><div className="listName sidebar-option" key={listele.playlistLink}>{listele.playlistName}</div></Link>
                ))                
            }
            </div>
        </div>
    )
}