import Comment from '../models/Comment.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const comment = new Comment(req.body);
  try {
    await comment.save();
    return res.status(200).json({
      message: 'Successfully signed up!'
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let comments = await Comment.find().select('name post created');
    res.json(comments);

  } catch (err) {
    return res.status('400').json({
      error:errorHandler.getErrorMessage(err)
    })
  }
};

const commentById =async (req, res, next, id) => {
  try {
    let comment = await Comment.findById({_id: id});
    if(!comment) {
      return res.status(400).json({
        error:'comment not found'
      });
    }
    req.profile = comment;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:"Could not retrieve comment"
    });
  }
};

const read = (req, res) => {
  req.profile.salt = undefined;
  req.name = 'ss';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let comment = req.profile;
    comment = merge(comment, req.body);

    comment.updated = Date.now();
    await comment.save();
    comment.salt = '';
    res.json(comment);
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
    let comment = req.profile;
    console.log('comment to remove', comment);
    let deletedComment= await comment.deleteOne();
    deletedComment.salt = '';
    res.json(deletedComment);
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export default {
  create,
  list,
  read,
  remove,
  commentById,
  update
};