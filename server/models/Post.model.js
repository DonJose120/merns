import mongoose from 'mongoose';

const required = 'requerid';
const PostSchema = new mongoose.Schema([
  {
    text: {
      type: String,
      required: `Text ${required} `
    },
     photo: {
      data: Buffer,
      contentType: String
    },

    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User'
    // },

    likes:[{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    }],

  comment:[{
    text:String,
    created:{
      type:Date,
      default:Date.now
    }
    }],

    // create: {
    //   type: Date,
    //   default: Date.now
    // },
    updated: Date
  }
]);

export default mongoose.model('Post', PostSchema);
