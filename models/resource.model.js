const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResourceSchema = new Schema({
    id: {type: String, required: false, max: 100},
    data: [{
            field1: {type:[Number|String], required: false},
            field2: {type:[Number|String], required: false},
            field3: {type:[Number|String], required: false},
            field4: {type:[Number|String], required: false},
            field5: {type:[Number|String], required: false},
            field6: {type:[Number|String], required: false},
            field7: {type:[Number|String], required: false},
            field8: {type:[Number|String], required: false},
            field9: {type:[Number|String], required: false},
            field10: {type:[Number|String], required: false}
        }],
    created: {type: Number, required: false},
    modified: {type: Number, required: false},
    deleted: {type: Number, required: false},


});

// Export the model
module.exports = mongoose.model('Resource', ResourceSchema);
