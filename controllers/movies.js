const { NotExtended } = require("http-errors");
const User = require("../models/user");
BASE_URL = "https://api.themoviedb.org/3/search/movie"
API_KEY = "?api_key=1671706fa83059c7ac996122901fc15c&query="
const fetch = require("node-fetch")

module.exports = {
    index,
    lists,
    renderSearch,
    search,
}
function index(req, res) {
    res.render("index", {
        user: req.user
    })
}
function lists(req, res) {
    console.log(req.user)
    res.render("posts", {
        user: req.user,
    })
}
function renderSearch(req, res) {
    res.render("search", {
        user: req.user,
    })
}
async function search(req, res) {
    let inputSearch = BASE_URL + API_KEY + req.query.title;
    let results = await fetch(inputSearch)
    let body = await results.json()
    let topThree = body.results.slice(0, 4)
    res.render("results", {
        data: topThree, 
        user: req.user,
    })
}
// .original_title << main title
// .overview << synopsis
// .release_date, .runtime, .poster_path
// .id << search criteria