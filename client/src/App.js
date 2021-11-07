import Now from './Now'
import pugliese from './static/pugliese.jpeg'
import Playlist from './Playlist';
import Next from './Next'
import { useEffect, useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8080/state'
const RUN_EVERY_MS = 5 * 1000

function App() {
  const [ now, setNow ] = useState(0)
  const [ next, setNext ] = useState(0)
  const [ tanda, setTanda ]= useState(0)
  const [ orchestra, setOrchestra ]= useState(0)

  const updatePlayerState = async () => {
    const res = await axios.get(SERVER_URL)
    const { tanda, current_song, current_orchestra, next_tanda } = res.data

    setTanda(tanda)
    setNow(current_song)
    setNext(next_tanda)
    setOrchestra(current_orchestra)
  }

  useEffect(() => {
    const handle = setInterval(updatePlayerState, RUN_EVERY_MS);   

    return () => clearInterval(handle)
  })


  return (
    <div>
        <Now title={now || "Nothing Yet"} orchestra={orchestra || "None"}></Now>
      <main className="main container-fluid">
        <div class="row">
          <div class="orchestra col-sm-3">
              <img src={pugliese} className="rounded"></img>
          </div>
          <div class="songs col-sm-6">
            <Playlist tanda={tanda || []}></Playlist>
          </div>
        </div>
        <Next title={next || "Nothing"}></Next>
      </main>
    </div>
  );
}

export default App;
