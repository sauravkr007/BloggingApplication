const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    name: { 
        type: String,
        required: true
    },

    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    }],

    isAdmin: {
        type: Boolean,
        default: false
    },

    liked:[{
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    }]
},{timestamps: true})

module.exports = mongoose.model('User',userSchema);