const mongoose = require('mongoose');

// Define the blog schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   image:{
    type: String,
    required: true
   },
   user:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    require:[true,'user id is required']
   }
});

// Create the model from the schema
const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;
