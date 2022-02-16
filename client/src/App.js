import Now from './Now'
import Ribbon from './Ribbon';
import Next from './Next'
import { useEffect } from 'react';

const SERVER_URL = 'http://localhost:8080/state'
const RUN_EVERY_MS = 5 * 1000

const state = {
  paused: false,
  isCortina: false,
  announcement: false,//"This is an announcement",
  now: {
    genre: "tango", // tango / vals / milonga / cortina
    name: "La Yumba",
    artist: "Pugliese",
  },
  songX: 1,
  songY: 4,
  next: {
      genre: "Tango",
      artist: "Pugliese",
  }
}

function App({ theme }) {

  // TODO: Handle className change according to theme
  //['announcement', "afterCumparsita"]

    if (state.paused) {
      return (
        <div id='overlay'>
          <div id="playerStoppedPaused" className={theme}></div>
        </div>
      )
    }
    if (state.isCortina) {
      return (
        <div id='overlay'>
          <div id="cortina" className={theme}>
            <div id="upNext">Up&nbsp;&nbsp;next...</div>
            <div id="cortinaNextTandaGenre"></div>
            <div id="cortinaNextTandaArtist"></div>
          </div>
        </div>
      )
    }
    if (state.announcement) {
      return (
        <div id='overlay'>
          <div id="announcement" className={theme}>
            <div id="announcementText">{state.announcement}</div>
          </div>
        </div>
      )
    }

    return (
      <div id="nowNext">
        <Now name={state.now.name} artist={state.now.artist} genre={state.now.genre} theme={theme}></Now>
        <Next artist={state.next.artist} genre={state.next.genre} theme={theme}></Next>

        <Ribbon songX={state.songX} songY={state.songY} theme={theme}></Ribbon>
      </div>
    )
}

export default App;
