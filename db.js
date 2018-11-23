// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
// my schema goes here!
// define the data in our collection

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more restuarants in their profile
const User = new mongoose.Schema({
    username: String,
    password: String,
    lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Canvas' }]
});
mongoose.model("User", User);

/*
const CanvasItem = new mongoose.Schema({

});
*/

const Canvas = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    name: {type: String, required: true},
    material: {type: String, required: true},
    items: [{
      itemName: String,
      width: Number,
      length: Number,
      Xpos: Number,
      Ypos: Number 
      //type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem'
    }]
});
mongoose.model("Canvas", Canvas);

mongoose.connect('mongodb://localhost/DAM', { useNewUrlParser: true });