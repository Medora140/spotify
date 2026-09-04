async function loadRadio() {

    try {

        const response = await fetch("/api/radio");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const radioContainer =
            document.querySelector("#radio-list");

        radioContainer.innerHTML = "";

        data.radio_links.forEach(radio => {

            const radioElement =
                document.createElement("article");

            radioElement.classList.add("radio-card");

            radioElement.innerHTML = `
            <div class="play">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 24 24" style="--encore-icon-height: var(--encore-graphic-size-decorative-base); --encore-icon-width: var(--encore-graphic-size-decorative-base);"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path></svg>
                    </div>
                <img
                    class="radio-image"
                    src="${radio.link}"
                    alt="${radio.title}"
                >

                <p class="radio-bio">
                    ${radio.title}
                </p>
            `;

            radioContainer.appendChild(radioElement);

        });

    } catch (error) {

        console.error(
            "Failed to load radio stations",
            error
        );

    }
}

loadRadio();