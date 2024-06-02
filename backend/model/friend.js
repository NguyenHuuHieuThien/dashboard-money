const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    name: { type: String, required: true, default: '', trim: true },
    email: { type: String, required: true, trim: true },
    image: { type: String, required: true, default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fdefault-avatar-profile-icon-of-social-media-user--947022627871095943%2F&psig=AOvVaw1G5oHRQMmcSMxTI3R6W06S&ust=1715700772851000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDMvcv5ioYDFQAAAAAdAAAAABAE' },
    money: { type: Number, require: true, default: 0 },
    phone: { type: String, require: true, default: '' },
    description: { type: String, require: false },
    link: { type: Array },

}, {
    timestamps: true,
});

// Remove _id,password from user object
friendSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model("friend", friendSchema);
