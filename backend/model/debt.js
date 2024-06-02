const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Friends = require('./friend');

const debtSchema = new Schema({
    title: { type: String, required: true, default: '', trim: true },
    friend: { type: Schema.Types.ObjectId, require: false, ref: 'friend' },
    amount: { type: Number, required: true, default: 0 },
    note: { type: String, require: true, default: '' },
    type: { type: String, require: true, default: '' },
    status: {type: Number, require: true, default: 0}
}, {
    timestamps: true,
});

// Remove _id,password from user object
debtSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
// debtSchema.plugin(require("../libs/pagination"));
module.exports = mongoose.model("debt", debtSchema);
// debtSchema.plugin(uniqueValidator, {
//     message: '{PATH}_already_in_use'
// });
