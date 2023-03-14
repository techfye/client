import React from 'react'
import './Progress.css'
const Progress = () => {

    // const orgID = window.localStorage.getItem('org')
    // const gameID = window.localStorage.getItem('game_id')

    // const newLink = window.location.origin;
    return (
        <>
            <div className='login_body'>
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className='thankyouBody' >
                    <h3>You have another game in progress!</h3> <br />
                    {/* <h3>Click <a href={`${newLink}/?org=${orgID}&game_id=${gameID}`} >here</a> to go back and finish the game that is already in process.</h3> */}
                </div>
            </div>
        </>
    )
}

export default Progress