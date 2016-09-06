var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  asin: {type: String, unique: true},
  description: String,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Item', ItemSchema);
