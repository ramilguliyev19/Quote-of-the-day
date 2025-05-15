const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' }],
});
module.exports = mongoose.model('User', UserSchema);
