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