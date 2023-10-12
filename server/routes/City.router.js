import express from "express";
import cityCtrl from '../controllers/City.controller';

const router = express.Router();

router.route('/api/cities')
.get(cityCtrl.list)
.post(cityCtrl.create);

router.param('cityId', cityCtrl.cityById);

export default router;