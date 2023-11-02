import express from 'express';
import postCtrl from '../controllers/Post.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/post')
.get(postCtrl.list)
.post(postCtrl.create);

router
  .route('/api/post/feed/:userId')
  .get(authCtrl.requireSignin, postCtrl.listNewsFeed);

router
  .route('api/post/by/:userId')
  .get(authCtrl.requireSignin, postCtrl.listByUser);

router
  .route('/api//post/new/:userId')
  .post(authCtrl.requireSignin, postCtrl.create);

router.route('/api//post/photo/:postId').get(postCtrl.photo);

router
  .route('/api/post/like')
  .put(authCtrl.requireSignin, postCtrl.Like);

router
  .route('/api/post/unlike')
  .put(authCtrl.requireSignin, postCtrl.unLike);

router
  .route('/api/post/:postId')
  .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove);

router
  .route('/api/post/comment')
  .put(authCtrl.requireSignin, postCtrl.Comment);

router
  .route('/api/post/uncomment')
  .put(authCtrl.requireSignin, postCtrl.unComment);

router.route('userId', userCtrl.userById);

router.param('postId', postCtrl.postById);

export default router;
