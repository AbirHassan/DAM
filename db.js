//Data Model
const mongoose = require('mongoose');
// schemas goes here
// define the data in our collection

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more canvases in their profile
const User = new mongoose.Schema({
    username: String,
    password: String,
    lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Canvas' }]
});
mongoose.model("User", User);

const Asset = new mongoose.Schema({
    name: String,
    assetType: String,
});
mongoose.model("Asset", Asset);

const Canvas = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    name: {type: String, required: true},
    content: String
    //type: mongoose.Schema.Types.ObjectId, ref: 'CanvasItem'
    
});
mongoose.model("Canvas", Canvas);
mongoose.set('useCreateIndex', true);
const uristring =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/DAM'
mongoose.connect(uristring, { useNewUrlParser: true });