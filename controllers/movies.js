const { NotExtended } = require("http-errors");
const User = require("../models/user");

BASE_URL = "https://api.themoviedb.org/3/search/movie"
API_KEY = "?api_key=1671706fa83059c7ac996122901fc15c&query="
BASE_URL_ID = "https://api.themoviedb.org/3/movie/"
API_KEY_ID = "?api_key=1671706fa83059c7ac996122901fc15c"

const fetch = require("node-fetch")

module.exports = {
    index,
    lists,
    renderSearch,
    search,
    showPage,
    createList,
}
function index(req, res) {
    res.render("index", {
        user: req.user
    })
}
function lists(req, res) {
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
async function showPage(req, res) {
    let results = await fetch(BASE_URL_ID + req.params.id + API_KEY_ID)
    let body = await results.json()
    res.render("show", {
        body: body,
        user: req.user
    })
}
async function createList(req, res) {
    //console.log(req.body)
    let userId = await User.findById(req.user.id)
    console.log(userId)
    await List.create({
        category: req.body.category,
        name: req.body.name,
        image: null,
        quote: null,
        user: userId.id,
    })
    
    console.log("teeeest")

    res.render("index", {
        user: req.user
    })

}