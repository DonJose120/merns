import mongoose from 'mongoose';

const required = 'requerid';
const PostSchema = new mongoose.Schema([
  {
    title: {
      type: String,
      required: `title ${required} `
    },

    PostBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },

    like:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },

  comment:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },

    create: {
      type: Date,
      default: Date.now
    },
    updated: Date
  }
]);

export default mongoose.model('Post', PostSchema);
