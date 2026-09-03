const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path=require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const songs = JSON.parse(
    fs.readFileSync("data/songs.json", "utf-8")
);
const artists = JSON.parse(
    fs.readFileSync("data/artists.json", "utf-8")
);
const albums = JSON.parse(
    fs.readFileSync("data/albums.json", "utf-8")
);
const radio = JSON.parse(
    fs.readFileSync("data/radio.json", "utf-8")
);

app.get("/api/songs", (req, res) => {

    res.json(songs);
})
app.get("/api/artists", (req, res) => {

    res.json(artists);
})
app.get("/api/albums", (req, res) => {

    res.json(albums);
})
app.get("/api/radio", (req, res) => {

    res.json(radio);
})

app.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");

})