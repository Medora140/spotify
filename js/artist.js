async function loadArtists() {

    try {

        const response = await fetch("/api/artists");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const artistContainer =
            document.querySelector("#artist-list");

        artistContainer.innerHTML = "";

        data.artist_links.forEach(artist => {

            const artistElement =
                document.createElement("article");

            artistElement.classList.add("artist-card");

            artistElement.innerHTML = `
                <img
                    class="artist-image"
                    src="${artist.link}"
                    alt="${artist.name}"
                >

                <h3 class="artist-name">
                    ${artist.name}
                </h3>

                <p class="artist-bio">
                    ${artist.title}
                </p>
            `;

            artistContainer.appendChild(artistElement);

        });

    } catch (error) {

        console.error(
            "Failed to load artists:",
            error
        );

    }
}

loadArtists();