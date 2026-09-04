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
            <div class="play">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 24 24" style="--encore-icon-height: var(--encore-graphic-size-decorative-base); --encore-icon-width: var(--encore-graphic-size-decorative-base);"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path></svg>
                    </div>
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