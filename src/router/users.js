const express = require('express');
const user = require('../model/user');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');
//ingreso
router.get('/users/signin',(req,res) => {
    res.render('users/signin');
});
router.post('/users/signin',passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
}));
//registro
router.get('/users/signup',(req,res) => {
    res.render('users/signup');
});

router.post('/users/signup',async (req,res)=>{
const{name, email,password,confpassword}=req.body;
const errors=[];
if (name.length <=0) {
    errors.push({text:'ingrese nombre'});
    
}
if (password != confpassword) {
    errors.push({text:'Password error// not match'});
    
}
if (password.length<4) {
    errors.push({text:'La password debe ser mayor  a cuatro caracteres'})   ;   
}
if (errors.length > 0) {
    res.render('users/signup',{errors, name, email,password,confpassword});
    
}else{
   const emailUser = await User.findOne({email: email});
   if (emailUser) {
    req.flash('error_msg','El correo ya esta registrado'); 
    res.redirect('/users/signup');
   }
   const newUser = new User({name, email, password});
   newUser.password = await newUser.encryptPassword(password);
   await newUser.save();
   req.flash('success_msg','Registrado');
   res.redirect('/users/signin');
}

});
module.exports = router;