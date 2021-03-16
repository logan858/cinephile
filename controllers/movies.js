const { NotExtended } = require("http-errors");
const User = require("../models/user");
const List = require("../models/list");

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
async function lists(req, res) {
    let lists = await List.find({user: req.user._id})
    // console.log(lists)

    res.render("posts", {
        user: req.user,
        lists: lists,
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
    let userId = await User.findById(req.user.id)
    await List.create({
        category: req.body.category,
        name: req.body.name,
        image: null,
        quote: null,
        user: userId._id,
    })
    res.render("index", {
        user: req.user
    })

}