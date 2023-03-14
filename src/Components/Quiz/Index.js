import { React, useState, useEffect } from 'react'
import './Quiz.css'
import Countdown from '../Countdown'
import Question from './Question'
import Login from '../Login/Index'
import ThankYou from '../ThankYou/ThankYou'
import axios from 'axios'
import { toast } from 'react-toastify'
import Progress from '../Progress'
const Quiz = (props) => {

    const { gameName, orgName, org, game_id } = props;

    const [gameData, setgameData] = useState([]);
    const [questions, setQuestions] = useState([])
    const [PageIndex, setPageIndex] = useState(0);
    const [Score, setScore] = useState(0);
    const [Result, setResult] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [SelectedAns, setSeletedAns] = useState('')
    const [Time, setTime] = useState(0);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        if (SelectedAns !== '') {
            setDisabled(false)
        }
    }, [SelectedAns])

    // useEffect(() => {
    //     const gData = JSON.parse(window.parent.localStorage.getItem('gameData'))
    //     const pIndex = parseInt(window.parent.localStorage.getItem('PageIndex'))
    //     const score = parseInt(window.parent.localStorage.getItem('Score'));
    //     const result = window.parent.localStorage.getItem('Result');
    //     const time = window.parent.localStorage.getItem('remainingTime');
    //     const unloadTime = window.parent.localStorage.getItem('unloadTime');
    //     const gameID = window.parent.localStorage.getItem('game_id');
    //     const orgID = window.parent.localStorage.getItem('org');
    //     if (gameID === game_id && orgID === org) {
    //         if (gData) {
    //             setgameData(gData)
    //             setQuestions(gData.questions)
    //         }
    //         if (pIndex) {
    //             setPageIndex(pIndex)
    //         }
    //         if (score) {
    //             setScore(score)
    //         }
    //         if (result) {
    //             setResult(JSON.parse(result))
    //         }
    //         if (time) {
    //             setTime(time)
    //         }
            
    //         if (unloadTime) {
    //             const now = new Date().getTime();
    //             const difference = now - parseInt(unloadTime);
    //             const newTime = time - (difference / 1000)
    //             if (newTime > 0) {
    //                 setTime(newTime)
    //             }
    //             else {
    //                 setPageIndex(0)
    //                 resetTime();
    //             }
    //         }
    //     }
    //     // eslint-disable-next-line
    // }, [])

        
    const submitResult = (data) => {
        axios.post('https://metavsyou.com/home/submitLeaderboard',data
        )
            .then(res => {
                if (res.data.code === '200') {
                    resetTime();
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    if (PageIndex === questions.length + 1) {
        const data = {
            org: org,
            game_id: game_id,
            game_keys_id: gameData.game_keys_id,
            username: userName,
            total_points: Score
        }
        if (data.username !== 'will-larry-admin') {
            submitResult(data);
        }
    }

    const automaticSubmit = () => {
        const data = {
            org: org,
            game_id: game_id,
            game_keys_id: gameData.game_keys_id,
            username: userName,
            total_points: Score
        }
        if (data.username !== 'will-larry-admin') {
            submitResult(data);
        }
    }

    const handleNext = () => {
        
        if (questions[PageIndex - 1].answer_type === 'Multiple Text') {
            if (SelectedAns === questions[PageIndex - 1].correct_option_id) {
                setScore(Score + 100)
            }
        }
        else if (questions[PageIndex - 1].answer_type === 'Text Box') {
            const arr = questions[PageIndex - 1].text_answer
            const arr1 = arr.split(',')
            for (let i = 0; i < arr1.length; i++) {
                arr1[i] = arr1[i].trim();
            }
            if (arr1.includes(SelectedAns)) {
                setScore(Score + 100)
            }
        }
        else if (questions[PageIndex - 1].answer_type === 'Multiple Text with Images') {
            if (SelectedAns === questions[PageIndex - 1].correct_option_id) {
                setScore(Score + 100)
            }
        }
        else if (questions[PageIndex - 1].answer_type === 'Multiple Images') {
            if (SelectedAns === questions[PageIndex - 1].correct_option_id) {
                setScore(Score + 100)
            }
        }
        if (questions[PageIndex - 1].answer_type === 'Text Box') {
            const arr = questions[PageIndex - 1].text_answer
            const arr1 = arr.split(',')

            for (let i = 0; i < arr1.length; i++) {
                arr1[i] = arr1[i].trim();
            }

            setResult([...Result, {
                question: questions[PageIndex - 1].question_text,
                selectedAns: SelectedAns,
                correctAns: arr1
            }])
        }
        else {
            setResult([...Result, {
                question: questions[PageIndex - 1].question_text,
                selectedAns: SelectedAns,
                correctAns: questions[PageIndex - 1].correct_option_id
            }])
        }
        setPageIndex(PageIndex + 1)
        setDisabled(true)
        setSeletedAns('')
        // submit();
        // unloadData();
    }

    

    const setGameQuestion = (data) => {
        setgameData(data)
        setTime(parseInt(data.time_limit) * 60)
        setQuestions(data.questions)
    }

    const setIndex = (val) => {
        setPageIndex(val)
    }
    const resetTime = () => {
        // window.parent.localStorage.clear();
        setTime(Time);
    }

    const handleUser = (value) => {
        setUserName(value)
    }

    // const unloadData = () => {
    //     if (PageIndex !== 0 && PageIndex <= questions.length) {
    //         window.parent.localStorage.setItem('PageIndex', PageIndex)
    //         window.parent.localStorage.setItem('Score', Score)
    //         window.parent.localStorage.setItem('Result', JSON.stringify(Result))
    //         const remainingTime = document.querySelector('.countdown').innerHTML;
    //         const remainingTimeInSeconds = parseInt(remainingTime.split(':')[0]) * 60 + parseInt(remainingTime.split(':')[1]);
    //         window.parent.localStorage.setItem('remainingTime', remainingTimeInSeconds)
    //         window.parent.localStorage.setItem('unloadTime', Date.now());
    //         window.parent.localStorage.setItem('gameData', JSON.stringify(gameData))
    //     }
    // }

    const onLogin = () => {
        setPageIndex(PageIndex + 1)
        // window.parent.localStorage.setItem('PageIndex', PageIndex + 1)
        // window.parent.localStorage.setItem('unloadTime', Date.now());
    }


    window.parent.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        // unloadData();
    });

    return (
        <>
            {PageIndex === 0 ? <Login IncPageIndex={setIndex} gameName={gameName} orgName={orgName} setGameQuestion={setGameQuestion} orgId={org} gameId={game_id} unloadData={onLogin} handleUser={handleUser} /> : <></>}
            {PageIndex > 0 && PageIndex <= questions.length ?
                <div className="container quiz-container">
                    <div className='quiz-header'>
                        {
                            PageIndex !== questions.length + 1 ? <div className=" text-center">
                                <Countdown countdownTime={Time} setIndex={setIndex} automaticSubmit={automaticSubmit} resetTime={resetTime} />
                            </div> : <></>
                        }
                        {
                            questions.map((question, index) => {
                                return (
                                    <div key={index}>
                                        {
                                            PageIndex === index + 1 ? <Question questionNo={index + 1} totalQuestions={questions.length} question={question.question_text} options={[question.option_1_text, question.option_2_text, question.option_3_text, question.option_4_text]} type={question.answer_type} ImageUrl={
                                                [`https://metavsyou.com/assets/images/${question.image_1}`, `https://metavsyou.com/assets/images/${question.image_2}`, `https://metavsyou.com/assets/images/${question.image_3}`, `https://metavsyou.com/assets/images/${question.image_4}`]} correctAns={question.correct_option_id} setSeletedAns={setSeletedAns} videoSrc={`https://metavsyou.com/assets/videos/${question.question_video}`
                                                } /> : <></>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        PageIndex !== questions.length + 1 ?
                            <div className="quiz-footer text-center">
                                <button disabled={disabled} onClick={() => { handleNext() }} className="btn btn-primary next_button">Next</button>
                            </div> :
                            <></>
                    }

                </div>
                : <></>
            }

            {
                PageIndex === questions.length + 1 ? <>
                    <ThankYou setIndex={setIndex} resetTime={resetTime} />
                </> : <></>

            }
            {
                PageIndex === 5000 ? <Progress gameID={game_id} orgID={org} /> : <></>
            }
        </>
    )
}

export default Quiz