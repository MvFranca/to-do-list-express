const mongoose = require('mongoose')
const checklist = require('./checklist')

//usa-se a ideia de referência

const task =  mongoose.Schema({
    name: {type: String, require: true}, //definindo o nome e que ele é obrigatório.
    done: {type: Boolean, default: false},
        //define o tipo: verdadeira ou falsa //valor inicial é false, já que ela n foi concuída

    //A relação de referência é apontada abaixo:
    checklist: {
        type: mongoose.Schema.Types.ObjectId, //define a relação por ID
        ref: 'Checklist', //referência ao model Checklist
        //cada task estará relacionado a um ID de checklist

        require: true
        //só irá existir uma task quando existir um checklist(obrigatório)
    }
})

//através desse esquema, um model foi gerado
                            //nome do model 
module.exports = mongoose.model('Task', task)
                                            //o esquema que irá gerar o model