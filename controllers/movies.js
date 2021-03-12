module.exports = {
    index,
    lists,
    search,
}


function index(req, res) {
    res.render("index")
}
function lists(req, res) {
    res.render("posts")
}
function search(req, res) {
    res.render("search")
}