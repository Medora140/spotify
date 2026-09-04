let currentAudio = null;

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

function createMusicPlayer(song) {
    const sign = document.querySelector(".sign");

    const previewText =
        document.querySelector(".sign-text");

    const previewButton =
        document.querySelector(".sign-btn");

    let player =
        document.querySelector(".music-player");


    // Hide preview
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

        <div class="music-player-controls">

            <button class="previous">
            <span class="material-symbols-outlined">
                skip_previous
            </span>
        </button>

        <button class="play">
            <span class="material-symbols-outlined">
                pause
            </span>
        </button>

        <button class="next">
            <span class="material-symbols-outlined">
                skip_next
            </span>
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
    `;
    const playButton =
        player.querySelector(".play");

    const progress =
        player.querySelector(".progress");

    const currentTime =
        player.querySelector(".current-time");

    const duration =
        player.querySelector(".duration");


    currentAudio.play();
    playButton.addEventListener("click", () => {

        if (currentAudio.paused) {

            currentAudio.play();

            playButton.innerHTML = `
                <span class="material-symbols-outlined">
                    pause
                </span>
            `;

        } else {

            currentAudio.pause();

            playButton.innerHTML = `
                <span class="material-symbols-outlined">
                    play_arrow
                </span>
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

    });
    progress.addEventListener("input", () => {

        const newTime =
            (progress.value / 100) *
            currentAudio.duration;

        currentAudio.currentTime = newTime;

    });
    currentAudio.addEventListener("ended", () => {

        playButton.innerHTML = `
            <span class="material-symbols-outlined">
                play_arrow
            </span>
        `;

        progress.value = 0;

        currentTime.textContent = "0:00";

    });
}


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
            songElement.addEventListener("click", () => {
                createMusicPlayer(song);
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