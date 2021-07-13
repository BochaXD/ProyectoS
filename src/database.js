const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/tienda',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db => console.log('Db esta conectada'))
.catch(err => console.error('err'));