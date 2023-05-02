const mongoose = require('mongoose')

const checklistSchema =  mongoose.Schema({
    name: {type: String, require: true},

    //Define a relação com task abaixo:
    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
    
})

//através desse esquema, um model foi gerado
                            //nome do model 
module.exports = mongoose.model('Checklist', checklistSchema)
                                            //o esquema que irá gerar o model