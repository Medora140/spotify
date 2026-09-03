async function loadSongs() {

    try {

        const response = await fetch("/api/songs");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const songsContainer =
            document.querySelector("#songs-list");

        songsContainer.innerHTML = "";

        data.song_links.forEach(song => {

            const songElement =
                document.createElement("article");

            songElement.classList.add("song-card");

            songElement.innerHTML = `
                <img
                    class="song-image"
                    src="${song.link}"
                    alt="${song.title}"
                >

                <h3 class="song-title">
                    ${song.title}
                </h3>

                <p class="song-artist">
                    ${song.artist.join(", ")}
                </p>
            `;

            songsContainer.appendChild(songElement);

        });

    } catch (error) {

        console.error(
            "Failed to load songs:",
            error
        );

    }
}

loadSongs();