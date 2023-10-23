import express from "express";
import postCtrl from '../controllers/Post.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/post')
.get(postCtrl.list)
.post(postCtrl.create);

// router
// .route('/api/users/comment')
// .put(
//   authCtrl.requireSignin,
//   userCtrl.addComment
// );



  ///Permite ejecutar la funcionalidad de seguir usuarios///
  router
  .route('/api/users/like')
  .put(
    authCtrl.requireSignin,
    userCtrl.addLike,
    userCtrl.removeLike
  );

  ///Permite ejecutar la funcionalidad para dejar de seguir///
  router
  .route('/api/users/unlike')
  .put(
    authCtrl.requireSignin,
    userCtrl.addLike,
    userCtrl.removeLike
  );

router.param('postCtrlId', postCtrl.postById);

export default router;