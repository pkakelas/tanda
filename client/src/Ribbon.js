function Playlist({ songX, songY, theme }) {
  return (
    <div id="ribbon" className={theme}>
      <div id="songX">{songX}</div>
      <div id="songY">{songY}</div>
    </div>
  )
}

export default Playlist;
