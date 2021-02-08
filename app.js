const searchSongs = async() =>{
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
    
}
// console.log(searchText);

const displaySongs = songs =>{
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song)
        const songDiv = document.createElement("Div");
        songDiv.className = 'search-result row align-items-center my-3 py-3';
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                            <source src="http://cdn-preview-2.deezer.com/stream/c-281727009382e01fe27e7c97b1a2143b-5.mp3" type="audio/mpeg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `;

        songContainer.appendChild(songDiv);
    })
}

const getLyric = async (artist,title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res =await fetch(url);
        const data =await res.json();
        displayLyrics(data.lyrics);
    }
    catch{
        console.log('try again');
    }
    
    
}

const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}