var express = require('express');
var router = express.Router();
let moviesCtrl = require("../controllers/movies")
const passport = require("passport")

/* GET home page. */
router.get('/', moviesCtrl.index)
router.get("/show", moviesCtrl.lists)
router.get("/search", moviesCtrl.search)

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
    res.redicrect("/");
});

module.exports = router;
