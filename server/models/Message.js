import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
});


messageSchema.index({ room: 1, timestamp: -1 });
messageSchema.index({ author: 1, timestamp: -1 });
messageSchema.index({ timestamp: 1 }, { expireAfterSeconds: 86400 * 2 });


messageSchema.methods.markAsEdited = function() {
  this.edited = true;
  this.editedAt = new Date();
  return this.save();
};


messageSchema.methods.canEdit = function(userId) {
  return this.author.toString() === userId.toString();
};

const Message = mongoose.model('Message', messageSchema);

export default Message;
