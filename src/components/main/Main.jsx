import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {

  const {onSent,recentPromt,prevPrompt,setPrevPrompt,
    setrecentPrompt,
    recentPrompt,
    showResult,
    resultData,
    input,
    setInput,  }=useContext(Context); 

  return (
    <div className='main' >
    <div className="nav">
      <p>Chatbot</p>
      <img src={assets.user_icon} alt="" />
    </div>
      <div className="main-container">
      {!showResult ? 
      <>
        <div className='greet'>
          <p><span>Hello,Dev</span></p>
          <p>How can i help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautifull places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Briefly summerize this concept :urban planning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstrom team boding activites for our eork retreat </p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the redability of the following</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
      
      </> : <div className='result'>
            <div className='result-title'>
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            </div>
      </div> 
      }
      <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a promp here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            This bot may display inscurate info, including about people, so double check its response.Your privacy and chatbot App
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
