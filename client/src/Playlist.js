import Song from './Song'

function Playlist({ tanda }) {
  return (
      <ul className="list-group">
        {
          tanda.map(song => <Song name={song}></Song>)
        }
      </ul>
  )
}

export default Playlist;
