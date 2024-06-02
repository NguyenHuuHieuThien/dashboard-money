const mongoose = require('mongoose');

async function Connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/dashboard')
        .then(() => console.log('Connected!'))
        .catch(()=> console.log('Connect failure!!!'))

}
module.exports = { Connect };