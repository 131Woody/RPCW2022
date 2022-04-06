const mongoose = require('mongoose') //tb se pode utilizar "var" 
const file = require('../models/file')

var File = require('../models/file') //import do modelo

//lista de funcionalidades que quero ter na aplicação

module.exports.listar = () => {
    return File
        .find({} , {nome:1}) 
        .exec()
}

module.exports.consultar = id => {
    return File
        .findOne({_id : mongoose.Types.ObjectId(id)}) 
        .exec()
}


module.exports.insert = file => {
    var newFile = new File(file)
    return newFile.save()
}

module.exports.delete = id => {
    return File
        .deleteOne({_id : mongoose.Types.ObjectId(id)})
        .exec()
}