import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Sidebar from './Sidebar' 
import Home from './Home'
import Liked from './Liked'
import ShowPlaylist from './ShowPlaylist'
import './Body.css'

export default function Body({accessToken, playTrack}){
  return(
    <Router>  
      <div className="body-component">   
        <Sidebar accessToken={accessToken}/>        
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} accessToken={accessToken} playTrack={playTrack}/>}/>
          <Route path="/liked-songs" exact render={(props) => <Liked {...props} accessToken={accessToken} playTrack={playTrack}/>}/>
          <Route path="/playlist/:id" exact render={(props) => <ShowPlaylist {...props} accessToken={accessToken} playTrack={playTrack}/> }/>
        </Switch>
      </div>
    </Router>
  )
}