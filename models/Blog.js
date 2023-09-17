const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    authorName: String,
    body: {
        type: String,
        required: true,
    },
        
    head: {
        type: String,
        required: true,
    },
    
    likes: {type:Number, default: 0}
},{timestamps: true})

blogSchema.index({
    body: "text",
    head: "text",
    authorName: "text"
})

module.exports = mongoose.model('Blog',blogSchema);