import './App.css';
import { useEffect, useState } from 'react';
import Page404 from './Components/Page404/Page404';
import Quiz from './Components/Quiz/Index';
import axios from 'axios';
import Loader from './Components/Loader/Loader'
function App() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [isLoading, setLoading] = useState(false);
  const [gameExist, setgameExist] = useState(true);
  const [gameName, setgameName] = useState('');
  const [orgName, setorgName] = useState('');
  if (params.has('org')) {
    var org = params.get('org');
  }
  if (params.has('game_id')) {
    var game_id = params.get('game_id')
  }


  useEffect(() => {
    setLoading(true)
    axios.get(
      `https://metavsyou.com/home/getURL?org=${org}&game_id=${game_id}`
    ).then(res => {
      if (res.data.code === '200') {
        setgameExist(true);
        setgameName(res.data.game_name);
        setorgName(res.data.organization_name);
        document.title = `${res.data.organization_name} - ${res.data.game_name}`;
      }
      else
        setgameExist(false)
    }
    ).catch(err => {
      setgameExist(false)
    }
    ).finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [])


  return (
    <>
      {
        isLoading ? <Loader/> : <>
          {
            gameExist ? <Quiz org={org} game_id={game_id} gameName={gameName} orgName={orgName} /> :
              <Page404 />
          }
        </>
      }
    </>
  );
}

export default App;



