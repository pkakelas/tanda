import Header from './Header'
import pugliese from './static/pugliese.jpeg'
import Playlist from './Playlist';
import Next from './Next'

function App() {
  return (
    <div>
      <Header></Header>
      <main className="main container-fluid">
        <div class="row">
          <div class="orchestra col-sm-3">
              <img src={pugliese} className="rounded"></img>
          </div>
          <div class="songs col-sm-6">
            <Playlist></Playlist>
          </div>
        </div>
        <Next></Next>
      </main>
    </div>
  );
}

export default App;
