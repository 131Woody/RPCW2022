var express = require('express');
var router = express.Router();
var axios = require('axios');
var apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY0OTE5NTY1MiwiZXhwIjoxNjUxNzg3NjUyfQ.EuvH713Qr6IZ073-5FMF6j5p_3tb6Trv0TOOF5ZHWOPUlCBqKU1H9DTo_ueoCyWhPbEd6F8xzNvn-UkG3J8Ppq65xF8uukoElnSIsi3kldXI2E_EHMv5ETIq-2SGpiBmLyv1zu2broi-nXw18XwKM-WWpoumw5mZacg1qyj4kokGm--WzPIDD15Uibu2ObsDfeHpbDt81Npq-WgEVe56F5w0TdAvY_b-Xvm77hXI4MuaatL9bsOtYEyiepLuBelDyVWjAIoon3-7tB1lwrPnC0OJ_cxKUyCdqx8sZPkmciyTmBsV8fDTyvTP1ibiryAQsDRK5TrG83CcWmStZyDnoQ"

/* GET home page. */

// título  e lista de classes de nível 1 (código e título)
router.get('/', function(req, res, next) {
  
  axios.get('http://clav-api.di.uminho.pt/v2/classes?apikey=' + apikey)
    .then(l => {
      var list = l.data
      res.render('index', { lista: list });
    })
    .catch(function(erro){
      res.render('error', { erro: 'erro' });
    });
})
  
  
 //Todos os campos de informação com códigos de classes devem ser transformados em links que realizam pedidos à tua aplicação de nova página

 router.get('/:codigo', function(req, res, next) {
  var codigo = req.params.codigo
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ codigo + '?apikey=' + apikey)
    .then(i => {
      var inf = i.data
      res.render('codigo', { info: inf });
    })
    .catch(function(erro){
      res.render('error', { erro: 'erro' });
    });
})

//Na página de cada classe, deve ser mostrada a informação base da classe, 
// uma lista dos seus descendentes caso existam e, 
//se a classe for de nível 3 uma lista dos processos relacionados (cada um destes deve ser um link para o respetivo processo), 
//apenas deves contemplar as relações: eCruzadoCom, eComplementarDe, eSuplementoDe e eSuplementoPara;

module.exports = router;

