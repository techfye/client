import { React } from 'react'
import './Quiz.css'
const Question = (props) => {
    const { question, options, questionNo, setSeletedAns, type, videoSrc, ImageUrl } = props;

    const handleChange = (e) => {
        setSeletedAns(e.target.value)
    }
    
    const checkVideoType = (videoSrc) => {
        const videoS = videoSrc.replace('https://metavsyou.com/assets/videos/', '')
        const video = videoS.split('/')[0]
        if (video) {
            return true
        }
        else {
            return false
        }
    }

    if (type === 'Multiple Text') {
        return (
            <>
                <div className="quiz-body text-center">
                    <div className="quiz-body_question card p-2 pt-5">
                        <h2 className='p-3'>{questionNo}. {question}</h2>
                        {checkVideoType(videoSrc) ?
                            <video
                                className="quiz-body_video"
                                src={videoSrc}
                                autoPlay
                                muted
                                loop
                            />
                            : <></>}
                    </div>
                    <div className="selector p-3">
                        <div className="selecotr-item">
                            <input type="radio" id="radio1" name="selector" onChange={handleChange} value="1" className="selector-item_radio" />
                            <label htmlFor="radio1" className="selector-item_label"><span>{`A)`}</span>{options[0]}</label>
                        </div>
                        <div className="selecotr-item">
                            <input type="radio" id="radio2" name="selector" onChange={handleChange} value="2" className="selector-item_radio" />
                            <label htmlFor="radio2" className="selector-item_label"><span>{`B)`}</span>{options[1]}</label>
                        </div>
                        <div className="selecotr-item">
                            <input type="radio" id="radio3" name="selector" onChange={handleChange} value="3" className="selector-item_radio" />
                            <label htmlFor="radio3" className="selector-item_label"><span>{`C)`}</span>{options[2]}</label>
                        </div>
                        <div className="selecotr-item">
                            <input type="radio" id="radio4" name="selector" onChange={handleChange} className="selector-item_radio" value="4" />
                            <label htmlFor="radio4" className="selector-item_label"><span>{`D)`}</span>{options[3]}</label>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (type === "Multiple Text with Images") {
        return (
            <>
                <div className="quiz-body text-center">
                    <div className="quiz-body_question card p-2 pt-5">
                        <h2 className='p-3'>{questionNo}. {question}</h2>
                    </div>
                    <div className="selector p-3">
                        <div className="selecotr-item">
                            <div className='photoText'>
                            {
                                    options[0] === '' ? <></> : <p>{options[0]}</p>
                                }
                                <input type="radio" id="radio1" name="selector" onChange={handleChange} value="1" className="selector-item_radio" />
                                <label htmlFor="radio1" className="selector-item_label"><span className='ImageSpan'>{`A)`}</span><img
                                    src={ImageUrl[0]} className='imageOptions' alt='gameImage'
                                /></label>
                            </div>
                        </div>
                        <div className="selecotr-item">
                            <div className='photoText'>
                            {
                                    options[1] === '' ? <></> : <p>{options[1]}</p>
                                }
                                <input type="radio" id="radio2" name="selector" onChange={handleChange} value="2" className="selector-item_radio" />
                                <label htmlFor="radio2" className="selector-item_label"><span className='ImageSpan'>{`B)`}</span><img
                                    src={ImageUrl[1]} className='imageOptions' alt='gameImage'
                                /></label>
                            </div>
                        </div>
                        <div className='photoText'>
                        {
                                    options[2] === '' ? <></> : <p>{options[2]}</p>
                                }
                            <div className="selecotr-item">
                                <input type="radio" id="radio3" name="selector" onChange={handleChange} value="3" className="selector-item_radio" />
                                <label htmlFor="radio3" className="selector-item_label"><span className='ImageSpan'>{`C)`}</span><img
                                    src={ImageUrl[2]} className='imageOptions' alt='gameImage'
                                /></label>
                            </div>
                        </div>
                        <div className="selecotr-item">
                            <div className='photoText'>
                                {
                                    options[3] === '' ? <></> : <p>{options[3]}</p>
                                }
                                <input type="radio" id="radio4" name="selector" onChange={handleChange} value="4" className="selector-item_radio" />
                                <label htmlFor="radio4" className="selector-item_label"><span className='ImageSpan'>{`D)`}</span><img
                                    src={ImageUrl[3]} className='imageOptions' alt='gameImage'
                                /></label>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (type === "Text Box") {
        return (
            <>
                <div className="quiz-body text-center">
                    <div className="quiz-body_question card p-2 pt-5">
                        <h2 className='p-3'>{questionNo}. {question}</h2>
                    </div>
                    <div className="selecotr-item">
                        <textarea name="selector" onChange={handleChange} className="selector-item_input" placeholder='Type your answere here' />

                    </div>
                </div>
            </>
        )
    } else if (type === "Multiple Images") {
        return (
            <div className="quiz-body text-center">
                <div className="quiz-body_question card p-2 pt-5">
                    <h2 className='p-3'>{questionNo}. {question}</h2>
                </div>
                <div className="selector p-3">
                    <div className="selecotr-item">
                        <input type="radio" id="radio1" name="selector" onChange={handleChange} value="1" className="selector-item_radio" />
                        <label htmlFor="radio1" className="selector-item_label"><span className='ImageSpan'>{`A)`}</span><img
                            src={ImageUrl[0]} className='imageOptions' alt='gameImage'
                        /></label>
                    </div>
                    <div className="selecotr-item">
                        <input type="radio" id="radio2" name="selector" onChange={handleChange} value="2" className="selector-item_radio" />
                        <label htmlFor="radio2" className="selector-item_label"><span className='ImageSpan'>{`B)`}</span><img
                            src={ImageUrl[1]} className='imageOptions' alt='gameImage'
                        /></label>
                    </div>
                    <div className="selecotr-item">
                        <input type="radio" id="radio3" name="selector" onChange={handleChange} value="3" className="selector-item_radio" />
                        <label htmlFor="radio3" className="selector-item_label"><span className='ImageSpan'>{`C)`}</span><img
                            src={ImageUrl[2]} className='imageOptions' alt='gameImage'
                        /></label>
                    </div>
                    <div className="selecotr-item">
                        <input type="radio" id="radio4" name="selector" onChange={handleChange} value="4" className="selector-item_radio" />
                        <label htmlFor="radio4" className="selector-item_label"><span className='ImageSpan'>{`D)`}</span><img
                            src={ImageUrl[3]} className='imageOptions' alt='gameImage'
                        /></label>
                    </div>
                </div>
            </div>
        )
    }



}

export default Question