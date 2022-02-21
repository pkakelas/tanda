
function store(event) {
	event.preventDefault();
	console.log(event)
}

function Webmaster({ theme }) {
	document.body.className = "" // meh

	return (
		<form onSubmit={store}>
			<label>
				Name:
				<input type="text" name="name" />
				</label>
				<input type="submit" value="Submit" />
		</form>
	)
}

export default Webmaster;
