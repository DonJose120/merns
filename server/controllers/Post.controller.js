//////////Se le agrega la importacion formidable///////
import formidable from 'formidable';
import Post from '../models/Post.model';
import errorHandler from '../helpers/dbErrorHandler';
///////Se le agrega la importacion fs //////////
import fs from 'fs';
import { error } from 'console';

////////// Se le agrega listNewsFeed para la lista de noticias//////////

const listNewsFeed = async (req, res) => {
  const following = req.profile.following;
  following.push(req.profile._id);
  try {
    const posts = await Post.find({
      postedBy: { $in: req.profile.following }
    })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exect();
    res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

///// Se le agrega listByUser para lista por usuarios///////////

const listByUser = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.profile._id })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exect();

    res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Imagen could not be uploaded'
      });
    }
    let post = new Post(fields);
    post.postedBy = req.profile;

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.filepath);
      post.photo.contentType = files.photo.type;
    }

    try {
      let result = await post.save();
      res.json(result);
    } catch (error) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  });
};

const list = async (req, res) => {
  try {
    let posts = await Post.find().select('_id name comments');

    res.json(posts);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
///// se crea bien el PostById ////////////

const postById = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id)
      .populate('postdBy', '_id name')
      .exect();
    if (!post) {
      return res.status(400).json({
        error: 'post Not found'
      });
    }
    req.post = post;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retivese Post'
    });
  }
};

const isPoster = (req, res) => {
  let isPoster =
    req.post && req.auth && req.post.postBy._id == req.auth._id;
  if (!isPoster) {
    error: 'User is not authorized';
  }
  next();
};

const read = (req, res) => {
  req.profile.salt = undefined;
  req.name = 'aa';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let post = req.profile;
    post = merge(post, req.body);
    post.update = Date.now();

    if (FileSystem.photo) {
      user.photo.data = fs.readFileSync(files.photo.filepath);
      user.photo.contentType = files.photo.types;
    }
    await post.save();
    post.salt = '';
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res) => {
  let post = req.post;
  try {
    let deletedPost = await post.remove();
   res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const Like = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.body.userId } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const unLike = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

const Comment = async (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
      dest: 'desd'
    });
  }
};

const unComment = async (req, res) => {
  let comment = req.body.comment;
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { comments:{_id: comment._id}}},
      { new: true })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec();
      res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

const photo = (req,res,next) => {
  res.set('Content-Type', req.post.photo.buffer);
  return res.send(req.post.photo.data);
}

export default {
  create,
  list,
  read,
  remove,
  postById,
  Like,
  unLike,
  Comment,
  unComment,
  photo,
  listNewsFeed,
  listByUser,
  isPoster,
  update
};
