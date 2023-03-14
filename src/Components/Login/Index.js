import { React, useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = (props) => {
  const { IncPageIndex, gameName, orgName, setGameQuestion, gameId, orgId, handleUser } = props;
  const [username, setUsername] = useState('');
  const [game_id, setGameId] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    if (username === '' || game_id === '')
      toast.error('Please fill all the fields')
    else {
      setLoading(true)
      axios.post(
        'https://metavsyou.com/home/getGameData',
        {
          "game_id": gameId,
          "org": orgId,
          "team_code": game_id,
          "username": username
        }
      ).then(res => {
        if (res.data.code === '200') {
            setGameQuestion(res.data);
            IncPageIndex(1);
            handleUser(username);
          // const gameID = window.parent.localStorage.getItem('game_id');
          // const orgID = window.parent.localStorage.getItem('org');
          // if (gameID !== null && orgID !== null) {
          //   if (gameID !== gameId && orgID !== orgId) {
          //     IncPageIndex(5000)
          //   }
          // }
          // else {
          //   window.parent.localStorage.setItem('username', username);
          //   window.parent.localStorage.setItem('game_id', gameId);
          //   window.parent.localStorage.setItem('org', orgId);
          //   window.parent.localStorage.setItem('gameData', JSON.stringify(res.data));
          //   setGameQuestion(res.data);
          //   unloadData();
          // }
        }
        else {
          toast.error(res.data.message)
        }
      }
      ).catch(err => {
        toast.error('Something went wrong')
      }).finally(() => {
        setLoading(false)
      })
    }
  }


  const generateUsername = () => {
    const letters = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
    let username = '';
    for (let i = 0; i < 3; i++) {
      username += letters[Math.floor(Math.random() * letters.length)];
    }
    const numbers = Date.now();
    username += numbers;
    setUsername(username)
  }

  const onChnage = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'game_id') {
      setGameId(value)
    }
  }

  return (
    <>
      <div className='login_body'>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div className="login-page">
          <div className="avatar">
            <img src="https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_960_720.png" alt="Avatar" />
          </div>
          <div className="form">
            <h2>{orgName}</h2>
            <span>{`( ${gameName} )`}</span>
            <div className='gameName'>
              <input type="text" placeholder="Username" name='username' value={username} onChange={onChnage} />
              <input type="text" placeholder="Team Code" name='game_id' onChange={onChnage} />
              <button onClick={handleClick} >{
                isLoading ? '...' : 'Start Game'
              }</button>
            </div>
            <span className='random_button' onClick={generateUsername} title='Generate Random Username' >
              <i className="uil uil-exchange-alt"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login