let currentAudio = null;
let currentSongs = [];
let currentIndex = 0;

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

function createMusicPlayer(song, index) {
    currentIndex = index;
    const sign = document.querySelector(".sign");

    const previewText =
        document.querySelector(".sign-text");

    const previewButton =
        document.querySelector(".sign-btn");

    let player =
        document.querySelector(".music-player");

    previewText.style.display = "none";
    previewButton.style.display = "none";


    if (!player) {

        player = document.createElement("div");

        player.classList.add("music-player");

        sign.appendChild(player);
    }

    if (currentAudio) {

        currentAudio.pause();

        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(song.audio);

    player.innerHTML = `

        <div class="music-player-song">

            <img
                src="${song.link}"
                alt="${song.title}"
            >

            <div class="music-player-info">

                <h3>${song.title}</h3>

                <p> ${song.artist.join(", ")}</p>

            </div>

        </div>
    <div class="system">
        <div class="music-player-controls">

            <button class="previous">
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"></path></svg>
        </button>

        <button class="play">
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path></svg>
        </button>

        <button class="next">
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path></svg>
        </button>
        <button class="repeat">
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75z"></path></svg>
        </button>

        </div>

        <div class="music-player-progress">

            <span class="current-time">0:00</span>

            <input
                class="progress"
                type="range"
                min="0"
                max="100"
                value="0"
            >

            <span class="duration">0:00</span>

        </div>
        </div>
        <div class="controls">
            <ul class="controls-items">
                <li>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797M10.5 8.118l-2.619-2.62L4.74 9.075 2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045z"></path></svg>
                </li>
                <li id="queue">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M15 15H1v-1.5h14zm0-4.5H1V9h14zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5m2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2z"></path></svg>
                </li>
                <li>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5zM4 15H2v-1.5h2z"></path><path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path></svg>
                </li>
                <li class="music-player-progress">
                    <svg data-encore-id="icon" role="presentation" aria-label="Volume high" aria-hidden="false" class="e-10860-icon" id="volume-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-informative-smaller); --encore-icon-width: var(--encore-graphic-size-informative-smaller);"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z"></path></svg>
                    <input
                class="progress volume"
                type="range"
                min="0"
                max="100"
                value="0"
            >
                </li>
                <li>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M16 2.45c0-.8-.65-1.45-1.45-1.45H1.45C.65 1 0 1.65 0 2.45v11.1C0 14.35.65 15 1.45 15h5.557v-1.5H1.5v-11h13V7H16z"></path><path d="M15.25 9.007a.75.75 0 0 1 .75.75v4.493a.75.75 0 0 1-.75.75H9.325a.75.75 0 0 1-.75-.75V9.757a.75.75 0 0 1 .75-.75z"></path></svg>
                </li>
                <li>
                    <svg width="23" height="23" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 3C0.25 2.0335 1.0335 1.25 2 1.25H5.375V2.75H2C1.86193 2.75 1.75 2.86193 1.75 3V5.42857H0.25V3ZM14 2.75H10.625V1.25H14C14.9665 1.25 15.75 2.0335 15.75 3V5.42857H14.25V3C14.25 2.86193 14.1381 2.75 14 2.75ZM1.75 10.5714V13C1.75 13.1381 1.86193 13.25 2 13.25H5.375V14.75H2C1.0335 14.75 0.25 13.9665 0.25 13V10.5714H1.75ZM14.25 13V10.5714H15.75V13C15.75 13.9665 14.9665 14.75 14 14.75H10.625V13.25H14C14.1381 13.25 14.25 13.1381 14.25 13Z" fill="currentColor"></path></svg>
                </li>
            </ul>
        </div>
    `;
    const playButton =
        player.querySelector(".play");
    const nextButton =
        player.querySelector(".next");
    const prevButton =
        player.querySelector(".previous");

    const progress =
        player.querySelector(".progress");

    const currentTime =
        player.querySelector(".current-time");

    const duration =
        player.querySelector(".duration");

    const volume =
        player.querySelector(".volume");


    currentAudio.play();
    playButton.addEventListener("click", () => {

        if (currentAudio.paused) {

            currentAudio.play();

            playButton.innerHTML = `
                <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path></svg>
            `;

        } else {

            currentAudio.pause();

            playButton.innerHTML = `
                <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path></svg>
            `;
        }

    });
    currentAudio.addEventListener("loadedmetadata", () => {

        duration.textContent =
            formatTime(currentAudio.duration);

    });
    currentAudio.addEventListener("timeupdate", () => {

        currentTime.textContent =
            formatTime(currentAudio.currentTime);


        const percentage =
            (currentAudio.currentTime /
                currentAudio.duration) * 100;


        progress.value = percentage;
        duration.textContent =
            formatTime(currentAudio.duration - currentAudio.currentTime);

    });
    progress.addEventListener("input", () => {

        const newTime =
            (progress.value / 100) *
            currentAudio.duration;

        currentAudio.currentTime = newTime;

    });
    currentAudio.addEventListener("ended", () => {

        playButton.innerHTML = `
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path></svg>
        `;

        progress.value = 0;

        currentTime.textContent = "0:00";
        duration.textContent =
            formatTime(currentAudio.duration);

    });
    nextButton.addEventListener("click", () => {

        currentIndex = (currentIndex + 1) % currentSongs.length;

        const nextSong = currentSongs[currentIndex];

        createMusicPlayer(nextSong, currentIndex);
    });
    prevButton.addEventListener("click", () => {

        currentIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;

        const prevSong = currentSongs[currentIndex];

        createMusicPlayer(prevSong, currentIndex);
    });
    volume.addEventListener("input", () => {

        currentAudio.volume =
            volume.value / 100;

    });
}


async function loadSongs() {

    try {

        const response = await fetch("/api/songs");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        currentSongs = data.song_links;

        const songsContainer =
            document.querySelector("#songs-list");

        songsContainer.innerHTML = "";

        data.song_links.forEach((song, index) => {

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
            songElement.addEventListener("click", () => {
                createMusicPlayer(song, index);
            });

        });

    } catch (error) {

        console.error(
            "Failed to load songs:",
            error
        );

    }
}

loadSongs();