import note from './static/note.svg';

function Song() {
  return (
    <div class="song list-group-item d-flex">
      <img src={note}></img>
      <p className="songtitle">La Yumba</p>
    </div>
  )
}

export default Song;
