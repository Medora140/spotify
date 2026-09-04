async function loadAlbum() {

    try {

        const response = await fetch("/api/albums");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const albumContainer =
            document.querySelector("#album-list");

        albumContainer.innerHTML = "";

        data.album_links.forEach(album => {

            const albumElement =
                document.createElement("article");

            albumElement.classList.add("album-card");

            albumElement.innerHTML = `
            <div class="play">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 24 24" style="--encore-icon-height: var(--encore-graphic-size-decorative-base); --encore-icon-width: var(--encore-graphic-size-decorative-base);"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path></svg>
                    </div>
                <img
                    class="album-image"
                    src="${album.link}"
                    alt="${album.title}"
                >

                <h3 class="album-title">
                    ${album.title}
                </h3>

                <p class="album-artist">
                    ${album.artist.join(", ")}
                </p>
            `;

            albumContainer.appendChild(albumElement);

        });

    } catch (error) {

        console.error(
            "Failed to load albums:",
            error
        );

    }
}

loadAlbum();