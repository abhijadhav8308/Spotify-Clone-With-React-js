import React from 'react'
import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import Header from './Header'
import Webplayer from './Webplayer'
import Body from './Body'
export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [playingTrack, setPlayingTrack] = useState()
    const [sidebarOption, setSidebarOption] = useState("home")

    function playTrack(track){
        setPlayingTrack(track)
    }

    return(
    <>
    <div className="row" style={{display:"flex"}}>
        <div className="mainDiv" style={{width:"100%"}}>
            <Header accessToken={accessToken} playTrack={playTrack}/>
            <Body accessToken={accessToken} sidebarOption={sidebarOption} playTrack={playTrack}/>
        </div>
    </div>
    <Webplayer accessToken={accessToken} trackUri={playingTrack?.uri}/>
    </>
    )
}