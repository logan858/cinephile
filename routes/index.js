var express = require('express');
var router = express.Router();
let moviesCtrl = require("../controllers/movies")
const passport = require("passport")
const fetch = require("node-fetch")

/* GET home page. */
router.get('/', moviesCtrl.index)
router.get("/show", moviesCtrl.lists)
router.get("/search", moviesCtrl.renderSearch)


router.get("/search/create", moviesCtrl.search)


//oauth routes
router.get("/auth/google", passport.authenticate(
    "google",
    {scope: ["profile", "email"]}
));
router.get("/oauth2callback", passport.authenticate(
    "google", 
    {
        successRedirect: "/",
        failureRedirect: "/"
    }
));
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;
