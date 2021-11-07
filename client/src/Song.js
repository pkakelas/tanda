import note from './static/note.svg';

function Song({ name }) {
  return (
    <div class="song list-group-item d-flex">
      <img src={note}></img>
      <p className="songtitle">{name}</p>
    </div>
  )
}

export default Song;
