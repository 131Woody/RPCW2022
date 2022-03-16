const http = require('http')
var url = require('url')
const axios = require('axios');

function generateMainPage(){
    return `<html>
        <head>
            <title>Listas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="/w3.css"/>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Listas</h2>
            </div>
            
            <a href="http://localhost:4000/alunos">Lista de Alunos</a>
            </br>
            <a href="http://localhost:4000/instrumentos">Lista de Instrumentos</a>
            </br>
            <a href="http://localhost:4000/cursos">Lista de Cursos</a>
        </body>
    </html>
  `
}

function getAlunos(){
    return axios.get("http://localhost:3002/alunos")
        .then(resp =>{
            pubs = resp.data;
            return pubs
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getInstrumentos(){
    return axios.get('http://localhost:3002/instrumentos')
        .then(function (resp){
            pubs = resp.data;
            return pubs
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getCursos(){

    return axios.get('http://localhost:3002/cursos')
        .then(function (resp){
            pubs = resp.data;
            return pubs
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
    
    var myurl = url.parse(req.url, true).pathname
    console.log(myurl)
    if (myurl == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(generateMainPage())
        res.end()
    }

    else if(myurl == "/alunos"){
        getAlunos().then(alunos => {
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
            alunos.forEach(a => {
                file += `<tr>
                            <td>${a.id}</td>
                            <td>${a.nome}</td>
                        </tr>`
            });
            file += `
            </table>
        </body>
        </html>`  
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })     
            res.write(file)
            res.end()
        })
       
       
    }
    else if(myurl == "/instrumentos"){
        
        getInstrumentos().then(instrumentos => {
            var file = `
        <!DOCTYPE html>
        <html lang="eng">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <title>Instrumentos</title>
        </head>
        <body style="background:rgb(70, 148, 177)">
        
            <table class="w3-table-all w3-hoverable">
            <tr>
                <th>ID</th>
                <th>Text</th>
            </tr>
        `
            instrumentos.forEach(i => {
                file += `<tr>
                            <td>${i.id}</td>
                            <td>${i.text}</td>
                        </tr>`
            });
            file += `
            </table>
        </body>
        </html>` 
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }) 
        res.write(file)
        res.end()
        })
              
        
    }
    else if(myurl == "/cursos"){
        
        getCursos().then(cursos => {
            var file = `
        <!DOCTYPE html>
        <html lang="eng">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <title>Instrumentos</title>
        </head>
        <body style="background:rgb(70, 148, 177)">
        
            <table class="w3-table-all w3-hoverable">
            <tr>
                <th>ID</th>
                <th>Text</th>
            </tr>
        `
            cursos.forEach(c => {
                file += `<tr>
                            <td>${c.id}</td>
                            <td>${c.designacao}</td>
                        </tr>`
            });
            file += `
            </table>
        </body>
        </html>` 
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }) 
        res.write(file)
        res.end()
        })
              
        
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html:charset=utf-8' })
        res.end('<p>Rota não suportada' + req.url + '</p>')
    }
}).listen(4000)
console.log('Servidor à escuta na porta 4000')






