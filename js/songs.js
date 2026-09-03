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
                <div class="play">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 24 24" style="--encore-icon-height: var(--encore-graphic-size-decorative-base); --encore-icon-width: var(--encore-graphic-size-decorative-base);"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path></svg>
                    </div>
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