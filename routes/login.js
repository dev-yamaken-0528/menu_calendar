var express = require('express')
var router = express.Router()
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { msg:"" })
})

router.post('/', function(req, res, next) {
  if(req.body.username=="kyama" && req.body.userpass=="kyama"){
    req.session.username = "kyama"
    res.redirect('../')
  }else{
    res.render('login', { msg:"wrong user" })
  }
})

module.exports = router;
