const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema);
