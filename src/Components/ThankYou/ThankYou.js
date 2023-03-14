import { React, useEffect } from 'react'
import './ThankYou.css'
const ThankYou = (props) => {
    const { setIndex, resetTime } = props;
    const handleClick = () => {
        setIndex(0);
    }

    useEffect(() => {
        resetTime();
    // eslint-disable-next-line
    }, [])

    window.addEventListener('beforeunload', (event) => {
        // localStorage.clear();
        handleClick();
    });

    return (
        <>
            <div className='login_body'>
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className='thankyouBody' >
                <img className='thankyouImg' src='./ThankYou.svg' alt='Thank you Img' />
                </div>
            </div>
        </>
    )
}

export default ThankYou