function Now({ genre, artist, name, theme }) {
  return (
      <div id="nowPlaying" className={theme}>
        <div id="nowPlayingGenre">{genre}</div>
        <div id="nowPlayingArtist">{artist}</div>
        <div id="nowPlayingName">{name}</div>
      </div>
  )
}

export default Now;
