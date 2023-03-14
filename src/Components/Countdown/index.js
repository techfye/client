import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Countdown.css'
import timeConverter from '../../utils/timeConverter';
const Countdown = ({ countdownTime, setIndex, resetTime, automaticSubmit }) => {
    const totalTime = countdownTime * 1000;
    const [timerTime, setTimerTime] = useState(totalTime);
    const { minutes, seconds } = timeConverter(timerTime);
    const goTologin = () => {
        setIndex(0);
    }
    useEffect(() => {
        const timer = setInterval(() => {
            const newTime = timerTime - 1000;

            if (newTime >= 0) {
                setTimerTime(newTime);
            } else {
                clearInterval(timer);

                Swal.fire({
                    title: `Your Time's Up`,
                    icon: 'info',
                    timer: 5000,
                    //   willClose: () => timeOver(totalTime - timerTime)
                }
                ).then(() => {
                    automaticSubmit();
                    goTologin();
                    resetTime();  
                });
            }
        }, 1000);

        return () => {
            clearInterval(timer);
            //   setTimeTaken(totalTime - timerTime + 1000);
         };

        // eslint-disable-next-line
    }, [timerTime]);

    return (
        <>
            <div className='container'>
                <span className='timer_card'>
                    <span className='countdown'>{minutes} : {seconds}</span>
                </span>
            </div>
        </>
    );
};


export default Countdown;
