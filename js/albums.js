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