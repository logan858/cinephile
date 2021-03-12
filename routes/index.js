var express = require('express');
var router = express.Router();
let moviesCtrl = require("../controllers/movies")

/* GET home page. */
router.get('/', moviesCtrl.index)
router.get("/show", moviesCtrl.lists)
router.get("/search", moviesCtrl.search)

module.exports = router;
