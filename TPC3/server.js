const http = require('http')
var url = require('url')

function generateMainPage(){
    page = "<body>Exemplo Conteudo</body>" //lista de links
    return page
}

function getAlunos(){
    const axios = require('axios');

    axios.get('http://localhost:3002/Alunos')
        .then(function (resp){
            pubs = resp.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getInstrumentos(){
    const axios = require('axios');

    axios.get('http://localhost:3002/instrumentos')
        .then(function (resp){
            pubs = resp.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getCursos(){
    const axios = require('axios');

    axios.get('http://localhost:3002/cursos')
        .then(function (resp){
            pubs = resp.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

/*function postAlunos(id, nome, dataNasc ){
    const axios = require('axios');

    axios.post('http://localhost:3003/alunos',{
    "id": id,
    "nome" : nome,
    "dataNasc":dataNasc    
}).then(resp => {
       console.log(resp.data);
    })
    .catch(error => {
        console.log(error);
    });
}


function postInstrumentos(id, text){
    const axios = require('axios');

    axios.post('http://localhost:3003/instrumentos',{
    "id": id,
    "text": text    
}).then(resp => {
       console.log(resp.data);
    })
    .catch(error => {
        console.log(error);
    });
}
*/

/*
function postCursos(id, text){
    const axios = require('axios');

    axios.post('http://localhost:3003/cursos',{
    "id": id,
    "text": text    
}).then(resp => {
       console.log(resp.data);
    })
    .catch(error => {
        console.log(error);
    });
}
*/

http.createServer(function (req, res) {
    console.log(req.method + " " + req.url + " " + d)
    var myurl = url.parse(req.url, true).pathname
    
    if (myurl == "/") {
        var q = url.parse(req.url, true).query
        var resultado = parseInt(q.a) + parseInt(q.b)
        res.writeHead(200, { 'Content-Type': 'text/html: charset=utf-8' })
        res.write(generateMainPage())
        res.end()
    }
    else if(myurl == "/alunos"){
        var file = `
        <!DOCTYPE html>
        <html lang="eng">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <title>Alunos</title>
        </head>
        <body style="background:rgb(70, 148, 177)">
        
            <table class="w3-table-all w3-hoverable">
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>
        `
        res.writeHead(200, { 'Content-Type': 'text/html: charset=utf-8' })
        getAlunos.then(alunos => {
            alunos.forEach(a => {
                file += `<tr>
                            <td>${a.id}</td>
                            <td>${a.nome}</td>
                        </tr>`
            });
        })
        file += `
            </table>
        </body>
        </html>`        
        res.write("")
        res.end()
    }
    else if(myurl == "/instrumentos"){
        res.writeHead(200, { 'Content-Type': 'text/html: charset=utf-8' })
        res.write("")
        res.end()
    }
    else if(myurl == "/cursos"){
        res.writeHead(200, { 'Content-Type': 'text/html: charset=utf-8' })
        res.write("")
        res.end()
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html:charset=utf-8' })
        res.end('<p>Rota não suportada' + req.url + '</p>')
    }
}).listen(7777)
console.log('Servidor à escuta na porta 7777')






