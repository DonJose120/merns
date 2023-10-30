import express from 'express';
import postCtrl from '../controllers/Post.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router
  .route('/api/posts/feed/:userId')
  .get(authCtrl.requireSignin, postCtrl.listNewsFeed);

router
  .route('api/posts/by/:userId')
  .get(authCtrl.requireSignin, postCtrl.listByUser);

router
  .route('/api//posts/new/:userId')
  .post(authCtrl.requireSignin, postCtrl.create);

router.route('/api//posts/photo/:postId').get(postCtrl.photo);

router
  .route('/api/posts/like')
  .put(authCtrl.requireSignin, postCtrl.Like);

router
  .route('/api/posts/unlike')
  .put(authCtrl.requireSignin, postCtrl.unLike);

router
  .route('/api/posts/:postId')
  .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove);

router
  .route('/api/posts/comment')
  .put(authCtrl.requireSignin, postCtrl.Comment);

router
  .route('/api/posts/uncomment')
  .put(authCtrl.requireSignin, postCtrl.unComment);

router.route('userId', userCtrl.userById);

router.param('postId', postCtrl.postById);

export default router;
