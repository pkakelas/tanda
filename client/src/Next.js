function Next({ artist, genre, theme}) {
  return (
    <div id="nextTanda" className={theme}>
      <div>
        <span id="nextTandaArtist"><strong>Next tanda: </strong>{artist}</span>
        <span id="nextTandaGenre">   ({genre})</span>
      </div>
    </div>
  );
}

export default Next;
