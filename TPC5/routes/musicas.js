var express = require('express');
var router = express.Router();
var axios = require("axios");
const { json } = require('express');

/* GET musics listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  axios.get("http://localhost:3000/musicas")
    .then(response => {
      var lista = response.data
      res.render("ids", { musicas: lista })
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});
     

router.get('/inserir', function(req, res, next) {
  //res.send('respond with a resource');
      res.render("forms")
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
})


router.get('/:id', function(req, res, next) {
  var id = req.params.id
  //res.send('respond with a resource');
  axios.get("http://localhost:3000/musicas?id=" + id)
    .then(response => {
      var musica = response.data
      res.render("id", {musicas : musica })
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});


router.get('/prov/:prov', function(req, res, next) {
  var prov = req.params.prov
  //res.send('respond with a resource');
  axios.get("http://localhost:3000/musicas?prov=" + prov)
    .then(response => {
      var provincias = response.data
      res.render("prov", {musicas : provincias })
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});       

module.exports = router;
