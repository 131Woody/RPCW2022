var http = require('http');
var fs = require("fs")
var url = require("url")


myserver = http.createServer(function (req,res){
    var myurl = url.parse(req.url,true).pathname
    console.log(myurl)
    if (myurl.includes("/filmes")){
        if(myurl == "/filmes"){
            fs.readFile("./html/index.html",(err,data) => {
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                if(err){
                    res.write("<p>Erro na leitura do ficheiro...</p>")
                }else{
                    res.write(data)
                }
                res.end()
            })
        }
        else {
            file = myurl.split("/")[2]
            fs.readFile("./html/"+file+".html",(err,data) => {
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                if(err){
                    res.write("<p>Erro na leitura do ficheiro...</p>")
                }else{
                    res.write(data)
                }
                res.end()
            })
        }
    }
    
});

myserver.listen(7777);
console.log("Servidor à escuta na porta 7777....")
