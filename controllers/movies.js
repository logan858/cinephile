const { NotExtended } = require("http-errors");
const User = require("../models/user");
const List = require("../models/list");

BASE_URL = "https://api.themoviedb.org/3/search/movie"
API_KEY = unknown_key
BASE_URL_ID = "https://api.themoviedb.org/3/movie/"
API_KEY_ID = unknown_key

const fetch = require("node-fetch")

module.exports = {
    index,
    lists,
    renderSearch,
    search,
    showPage,
    createList,
    deleteFilm,
}
function index(req, res) {
    res.render("index", {
        user: req.user
    })
}
async function lists(req, res) {
    let lists = await List.find({user: req.user._id})
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
    let topTen = body.results.slice(0, 10)
    res.render("results", {
        data: topTen, 
        user: req.user,
    })
}
async function showPage(req, res) {
    let results = await fetch(BASE_URL_ID + req.params.id + API_KEY_ID)
    let body = await results.json()
    res.render("show", {
        body: body,
        user: req.user
    })
}


//function that creates lists, names, and embeds film titles under those listed names
async function createList(req, res) {
    let userId = await User.findById(req.user.id)
    let lists = await List.find({user: req.user._id})
    let formattedName = req.body.name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    console.log(formattedName)
    let checker = x => x.some(y => y.name === formattedName);

    //if list entry matches no previous ones, then:
    if(checker(lists) === false) {
        let newList = await List.create({
            category: req.body.category,
            name: formattedName,
            image: null,
            quote: null,
            user: userId._id,
        })
        let results = await fetch(BASE_URL_ID + req.params.id + API_KEY_ID)
        let movie = await results.json()
        let year = new Date(movie.release_date)
        let listObj = {
            title: movie.original_title,
            releasedate: year.getFullYear(),
            runtime: movie.runtime,
            synopsis: movie.overview,
            director: req.body.director,
            editor: req.body.editor,
            cinematographer: req.body.cinematographer,
            writer: req.body.writer,
            composer: req.body.composer,
            poster: movie.poster_path
        }
        newList.films.push(listObj)
        await newList.save()

    // if names are not matched to a previous list entry, then:
    } else {
        let matchedName = await List.find({
            name: formattedName,
            user: userId._id
        });
        let results = await fetch(BASE_URL_ID + req.params.id + API_KEY_ID)
        let movie = await results.json()
        let year = new Date(movie.release_date)
        let listObj = {
            title: movie.original_title,
            releasedate: year.getFullYear(),
            runtime: movie.runtime,
            synopsis: movie.overview,
            director: req.body.director,
            editor: req.body.editor,
            cinematographer: req.body.cinematographer,
            writer: req.body.writer,
            composer: req.body.composer,
            poster: movie.poster_path
         }
        matchedName[0].films.push(listObj)
        await matchedName[0].save()
    }
    res.render("index", {
        user: req.user
    })
}

async function deleteFilm(req, res) {
    List.find({"films._id": req.params.id}, async function(err, lists) {
        try {
            lists[0].films.id(req.params.id).remove()
            await lists[0].save()
            res.render("index", {
                user: req.user,
            })
        } catch (err) {
            console.log(err)
            return res.send("error")
        }
    }) 
}
