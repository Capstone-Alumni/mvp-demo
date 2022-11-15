const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  major: {
    type: String,
  },
});

module.exports =
  mongoose.models.Alumni || mongoose.model('Alumni', alumniSchema);
