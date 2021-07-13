const moongose =require('mongoose');
const {Schema} = moongose;
const NoteSchema = new Schema({
    title: { type: String, require: true},
    description: { type: String, require: true},
    date: { type: Date, default:Date.now}
});

module.exports=moongose.model('Note', NoteSchema);
