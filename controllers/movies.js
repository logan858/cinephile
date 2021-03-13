const { NotExtended } = require("http-errors");
const User = require("../models/user");

module.exports = {
    index,
    lists,
    search,
}
function index(req, res) {
    let modelQuery = req.query.username ?  {username: new RegExp(req.query.username, "i")} : {};
    let sortKey = req.query.sort || 'username';
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
        if(err) return NotExtended(err);
        res.render("index", {
            users,
            user: req.user,
            username: req.query.username,
            sortKey
        })
    })
}
function lists(req, res) {
    let modelQuery = req.query.username ?  {username: new RegExp(req.query.username, "i")} : {};
    let sortKey = req.query.sort || 'username';
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
        if(err) return NotExtended(err);
        res.render("posts", {
            users,
            user: req.user,
            username: req.query.username,
            sortKey
        })
    })
}
function search(req, res) {
    let modelQuery = req.query.username ?  {username: new RegExp(req.query.username, "i")} : {};
    let sortKey = req.query.sort || 'username';
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
        if(err) return NotExtended(err);
        res.render("search", {
            users,
            user: req.user,
            username: req.query.username,
            sortKey
        })
    })
}