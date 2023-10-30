import mongoose from 'mongoose';

const required = 'requerid';
const CommentSchema = new mongoose.Schema([{

  name: {
    type: String,
    trim: true,
    required: `name ${required} `
  },
  post:{
    type: String,
    trim: true,
    require: `post ${required} `
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  comments:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },

  like:{
    type: mongoose.Schema.ObjectId,
    ref: 'Like'
    },

  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
}]);

export default mongoose.model('Comment', CommentSchema);