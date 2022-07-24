import React from 'react'
import './Box.css'

export default function Box({release}){
    return(
        <div className="box"> 
            <div className="box-image"><img src={release.image} /></div>
            <div className='box-name'>{release.name}</div>
        </div>
    )
}