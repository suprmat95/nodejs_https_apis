const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResourceSchema = new Schema({
    id: {type: String, required: true, max: 100},
    data: {type: Object, required: true},
    created: {type: Number, required: true},
    modified: {type: Number, required: true},

});


// Export the model
module.exports = mongoose.model('Resource', ResourceSchema);
