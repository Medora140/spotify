let queuePanel = null;

function toggleQueue() {

    if (queuePanel) {
        queuePanel.remove();
        queuePanel = null;
        return;
    }

    createQueue();
}

function createQueue() {
    if (queuePanel) return;
    queuePanel =
        document.createElement("article");

    queuePanel.classList.add("queue-card");

    const header = document.createElement("div");
    header.classList.add("queue-header");
    const title = document.createElement("h2");
    title.innerText = "Queue";

    const close = document.createElement("button");
    close.innerHTML = `
<svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06"></path></svg>
`

    close.onclick = () => {
        queuePanel.remove();
        queuePanel = null;
    };

    header.append(title, close);
    queuePanel.appendChild(header);

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent =
        "About recommendations and the impact of promotion";

    queuePanel.appendChild(description);
    const nowPlayingTitle = document.createElement("h3");

    nowPlayingTitle.innerText = "Now playing";

    queuePanel.appendChild(nowPlayingTitle);
    if (currentSongs.length > 0) {
        const currentSong = currentSongs[currentIndex];
        const currentElement =
            createQueueSong(
                currentSong,
                currentIndex,
                true
            );

        queuePanel.appendChild(currentElement);
    }
    const nextTitle = document.createElement("h3");

    nextTitle.innerText = "Next up";

    queuePanel.appendChild(nextTitle);
    for (let i = currentIndex + 1; i < currentSongs.length; i++) {
        const song = currentSongs[i];

        const songElement =
            createQueueSong(
                song,
                i
            );

        queuePanel.appendChild(songElement);
    }
    document.body.appendChild(queuePanel);
}

function createQueueSong(song, index, isCurrent = false) {
    const songElement =
        document.createElement("div");

    songElement.classList.add("queue-song");
    const image =
        document.createElement("img");

    image.src = song.link;

    image.alt = song.title;
    const info =
        document.createElement("div");

    info.classList.add("queue-song-info");


    const songTitle =
        document.createElement("div");

    songTitle.classList.add("queue-song-title");

    songTitle.innerText =
        song.title;
    const artist =
        document.createElement("div");

    artist.classList.add("queue-song-artist");

    artist.innerText =
        song.artist.join(", ");


    info.append(
        songTitle,
        artist
    );
    if (isCurrent) {
        songTitle.classList.add("current");
    }
    songElement.addEventListener("click", () => {

        createMusicPlayer(
            song,
            index
        );

    });


    songElement.append(
        image,
        info
    );

    return songElement;
}
function updateQueue() {

    if (!queuePanel) {
        return;
    }

    queuePanel.remove();

    queuePanel = null;

    createQueue();
}


