var mongoose =  require('mongoose')

var fileSchema = new mongoose.Schema({
    data: String,
    nome: String,
    descricao: String,
    mimeType: String,
    size: Number
})

//o primeiro é o id da coleção do mongo, e o schema que o modelo vai compilar com o módulo "model"
module.exports = mongoose.model('file', fileSchema) 