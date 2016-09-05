var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Item', ItemSchema);