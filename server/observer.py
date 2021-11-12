import time
import json
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
from tinytag import TinyTag
from os import path

PLAYLIST_PATH = "/Users/mourt/AppData/roaming/winamp/Winamp.m3u"
CURRENT_PATH = "/Users/mourt/AppData/roaming/winamp/currently_playing"
STATE_FILE = "./state.json"

class State:
	def __init__(self):
		self.tanda = []
		self.current_song = None
		self.next_tanda = []
		self.playlist = []
		self.current_is_cortina = False

	def set_current_song(self, song):
		songname = song.strip()
		print("Set current song", songname)
		# Find song in playlist
		for song in self.playlist:
			if songname == song.title:
				print("Current song found")
				self.current_song = song

		if not self.current_song:
			print("Current song not found")
			return

		self.current_is_cortina = self.current_song.is_cortina()
		self.playlist and self.set_tanda()
		self.save_state()
	
	def set_playlist(self, playlist):
		self.playlist = playlist
		if self.current_song:
			self.set_tanda()
		self.save_state()

	def set_tanda(self):
		print("[SETTING TANDA]")
		print("current_song", self.current_song)
		print("playlist", self.playlist)
		assert(self.current_song in self.playlist)
		prev_cortina = self.get_previous_cortina_idx(self.current_song)
		print("PREV", prev_cortina)
		next_cortina = self.get_next_cortina_idx(self.current_song)
		print("NEXT", next_cortina)
		print(prev_cortina['idx'], next_cortina)
		self.tanda = self.playlist[prev_cortina['idx'] + 1:next_cortina['idx']]
		print("TANDA GENERATED BITCH", self.tanda)
	
	def save_state(self):
		current_song = self.current_song.artist + " - " + self.current_song.title if self.current_song else ""
		state = {
			"tanda": list(map(lambda x: x.title, self.tanda)),
			"next_tanda": [],
			"current_song": current_song,
			"is_cortina": self.current_is_cortina
		}

		f = open(STATE_FILE, "w")
		f.write(json.dumps(state, sort_keys=True, indent=4))
		f.close()
		
	# returns prev cortina or first song
	def get_previous_cortina_idx(self, song):
		song_index = self.playlist.index(song)
		idx = song_index
		while idx > 0 and not self.playlist[idx].is_cortina():
			idx -= 1	
		
		return {"idx": idx, "name": self.playlist[idx]}

	# returns next cortina or last song
	def get_next_cortina_idx(self, song):
		song_index = self.playlist.index(song)
		idx = song_index

		while idx < len(self.playlist) - 1 and not self.playlist[idx].is_cortina():
			idx += 1	
			print(idx, len(self.playlist))
		
		return {"idx": idx, "name": self.playlist[idx]}

	def __repr__(self):
		return "current playlist:\n" + str(self.playlist) + "\n" + "current_song:\n" + str(self.current_song)


class CurrentSongHandler(PatternMatchingEventHandler):
	def __init__(self, state):
		super().__init__()
		self.state = state
		self.update_current_song(CURRENT_PATH)

	def on_modified(self, event):
		print("Current song changed")
		self.update_current_song(event.src_path)
		print(self.state)

	def update_current_song(self, path):
		f = open(path)
		firstline = f.readlines()[0]
		artist, title = firstline.split(' - ')
		self.state.set_current_song(title.strip())
		print("Current", self.state.current_song)
		f.close()


class PlaylistHandler(PatternMatchingEventHandler):
	def __init__(self, state):
		super().__init__()
		self.state = state
		self.update_current_playlist(PLAYLIST_PATH)

	def on_modified(self, event):
		print("Playlist changed")
		self.update_current_playlist(event.src_path)

	def update_current_playlist(self, playlist_path):
		f = open(playlist_path)
		lines = f.readlines()
		songs = []
		for line in lines:
			songpath = line.strip()
			if path.isfile(songpath):
				tag = TinyTag.get(songpath)
				song = Song(songpath, tag.title, tag.artist, tag.year, tag.genre)
				songs.append(song)

		self.state.set_playlist(songs)
		f.close()

class Song:
	def __init__(self, path, title, artist, year, genre):
		self.path = path
		self.title = title
		self.artist = artist
		self.year = year
		self.genre = genre

	def __repr__(self):
		return "[TRACK] Title: " + self.title + " artist: " + self.artist + "\n"

	def is_cortina(self):
		return "cortina" in self.title.lower() + self.artist.lower()


state = State()
observer = Observer()
observer.schedule(PlaylistHandler(state), PLAYLIST_PATH, recursive=True)
observer.schedule(CurrentSongHandler(state), CURRENT_PATH, recursive=True)
observer.start()

try:
	while True:
		time.sleep(1)
except KeyboardInterrupt:
	observer.stop()
