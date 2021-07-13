const express = require('express');
const path = require('path');
const exphbs=require('express-handlebars');
const methoOverride=require('method-override');
const session=require('express-session');
const flash = require('connect-flash');
//init
const app = express();
require('./database');
//configuraciones
app.set('port', process.env.PORT||9000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');
//middleware
app.use(express.urlencoded({extended:false}));
app.use(methoOverride('_method'));
app.use(session({
    secret:'bocha',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
//variables globales
app.use((req,res,next)=>{
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
});

//rutas
app.use(require('./router/index'));
app.use(require('./router/notes'));
app.use(require('./router/users'));
//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));
//servidor init
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});