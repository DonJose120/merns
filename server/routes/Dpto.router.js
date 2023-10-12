import express from 'express';
import dptoCtrl from '../controllers/Dpto.controller';

const router = express.Router();

router.route('/api/dptos')
.get(dptoCtrl.list)
.post(dptoCtrl.create);

router.param('dptoId', dptoCtrl.dptoById);

export default router;