const express =  require('express')

const router = express.Router()

const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
    try{
        let checklists = await Checklist.find({}) //find é usado para encontrar
        res.status(200).render('checklists/index', { checklists: checklists}) //tá passando para a view uma variável com a listagem de checklists
    }catch(error){
        res.status(200).render('pages/error', {error: 'Erro ao exibir as listas'})
    } 
})

router.get('/new', async(req, res) => {
    try{
        let checklist = new Checklist()
        res.status(200).render('checklists/new', {checklist: checklist})
    } catch(error){
        res.status(500).render('pages/error', {errors: 'Erro ao carregar o formulário'})
    }
})

router.get('/:id/edit', async(req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/edit', {checklist: checklist})
    } catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição de Lista de Tarefas'})
    }
})

router.post('/', async (req, res) => { 
    let {name} = req.body.checklist
    let checklist = new Checklist({name})

    try{
        await checklist.save() //create é usado para chamar
        res.redirect('/checklists')
    }catch(error){
        res.status(422).render('checklists/new', {checklists: { ...checklist, error}})
    }
})

router.get('/:id', async (req, res) => {
    try{
       let checklist = await Checklist.findById(req.params.id)
       res.status(200).render('checklists/show', {checklist: checklist})
    }catch(error){
        res.status(200).render('pages/error', {error: 'Erro ao exibir as listas'})
    }
})

router.put('/:id', async (req, res) => {
   let { name } = req.body.checklist
   let checklist = await Checklist.findById(req.params.id)
    try{
        await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true})
        res.redirect('/checklists')
    }catch(error){
        let errors = error.errors
        res.status(422).render('checklists/edit', {checklist: {...checklist, errors}})
    }
})

 router.delete('/:id', async (req, res) => {
     try{
        await Checklist.findByIdAndRemove(req.params.id)
         res.redirect('/checklists')
     }catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao deletar a lista de tarefas'})
     }
 })


module.exports = router