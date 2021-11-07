function appendToList(song) {
	var ul = document.getElementById("songs");
	var li = document.createElement('li')
	li.classList.add("single-item");
	li.innerHTML = `
		<a data-playlist="" data-title="3. Girls In The Hood" data-artist="Jason Aldean"
			data-img="./static/cover.svg"
			href="https://dmitryvolkov.me/demo/blast2.0/audio/10938456_inspiring-epic-motivational-cinematic-trailer_by_audiopizza_preview.mp3"
			class="single-item__cover">
			<img src="./static/cover.svg" alt="">
		</a>
		<div id="active" class="single-item__title">
			<h4>${song}</h4>
		</div>
	`

	ul.appendChild(li)
}

async function getState() {
	URL = 'http://localhost:8080/state'
	const res = await axios.get(URL)
	return res.data
}

async function main() {
	const { tanda } = await getState()
	const ul = document.getElementById("songs");
	ul.innerHTML = ""
	tanda.forEach((s) => {
		appendToList(s.split(' - ')[1])})
}

main()
setInterval(main, 10000)