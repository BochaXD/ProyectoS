const express = require('express');
const router = express.Router();

const Note=require('../model/notes');

router.get('/note/add',(req,res)=>{
    res.render('note/new-note');
});
router.post('/note/new-note',async (req,res)=>{
    const {title,description}= req.body;
    const errors = [];
    if (!title){
        errors.push({text: 'Escriba un titulo'});
    }
    if (!description){
        errors.push({text: 'Escriba una Descripcion'});
    }
    if (errors.length > 0){
        res.render('note/new-note',{
            errors,
            title,
            description
        });
    }else{
    const newNote = new Note({title, description});
    await newNote.save();
    req.flash('success_msg','Nota agregada')
    res.redirect('/notes');
    }

});
router.get('/notes',async (req,res) => {
    const notes = await Note.find().lean().sort({date:'desc'});
    
    res.render('note/allnotes',{notes});
});
//editar
router.get('/note/edit/:id', async (req,res)=>{
    const note = await Note.findById(req.params.id).lean();
    res.render('note/editnote',{note});
});

router.put('/note/editnote/:id', async (req,res)=>{
   const{title, description}=req.body;
   await Note.findByIdAndUpdate(req.params.id,{title,description});
    res.redirect('/notes');
   
});
//eliminar
router.delete('/note/delete/:id', async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
});
module.exports = router;