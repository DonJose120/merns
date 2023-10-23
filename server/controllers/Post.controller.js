import Post from '../models/Post.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    return res.status(200).json({
      message: 'felicidades'
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let posts = await Post.find()
      .select('_id name comments')

    res.json(posts);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const postById = async (req, res, next, id) => {
  try {
    let post = await Post.findById({ _id: id })
    .populate('Post', '_id name')
    .populate('user', '_id name')
    .exect();
    if (!post) {
      return res.status(400).json({
        error: 'post Not found'
      });
    }
    req.profile = post;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Could not retivese Post'
    });
  }
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

const remove = async (req, res, next) => {
  try {
    console.log('deleted');
    let post = req.profile;
    console.log('post to remove', post);
    let deletedPost = await post.deleteOne();
    deletedPost.salt = '';
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const Like = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.likeId,
      { $push: { likes: req.body.userId } },
      { new: true }
    )

      .populate('likes', '_id name')
      .exec();

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const unLike = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.unlikeId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    )
      .populate('likes', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

const Comment = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.commentId,
      { $push: { comments: req.body.userId } },
      { new: true }
    )

      .populate('comments', '_id name')
      .exec();

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const unComment = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.uncommentId,
      { $pull: { comments: req.body.userId } },
      { new: true }
    )
      .populate('comments', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

export default {
  create,
  list,
  read,
  Like,
  remove,
  postById,
  unLike,
  Comment,
  unComment,
  update
};
