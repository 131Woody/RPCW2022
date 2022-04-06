var express = require('express');
var router = express.Router();
var multer = require('multer');
var jsonfile = require('jsonfile');
var fs = require('fs');

var File = require('../controllers/file');
const file = require('../models/file');
var upload = multer({dest:'uploads'})


router.get('/', (req, res) => {
  File.listar()
  .then(dados => {
    res.render('index', {list : dados})
  })
  .catch( err => {
    res.render('error',{error:err})
  })
})

router.post('/', upload.single('myFile'), (req, res) => {
  let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../fileStore/' + req.file.originalname

  fs.rename(oldPath, newPath, error => {
    if(error) res.render('error', {error: error})
  })

  var d = new Date().toISOString().substring(0, 16)
  var f = {
    data: d,
    nome: req.body.nome,
    descricao: req.body.descricao,
    mimeType: req.body.mimeType,
    size: req.body.size
  }

  File.insert(f)
    .then(() => res.redirect(301, "/"))
    .catch((erro) => res.render('error', {error:erro}))
})

router.post("/delete/:id",(req,res) => {
  File.consultar(req.params.id)
      .then(data => {
        var path = __dirname + '/../fileStore/' + data.nome
        fs.unlink(path, erro => {
          if(erro) res.render('error', {error:erro})
        })
      })
      .catch(erro => {res.render('error', {error : erro})})

  File.delete(req.params.id)
      .then(() => {res.redirect('/')} )
      .catch(erro => {res.render('error',{error : erro})})
});

module.exports = router;