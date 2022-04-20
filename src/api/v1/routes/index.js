import express from 'express';
import controller from '../controllers/notes.controller';

const router = express.Router();

router.get('/ping', controller.ping);
router.get('/notes', controller.get);
router.get('/notes/:id', controller.getById);

router.post('/notes', controller.create);

router.put('/notes/:id', controller.updateById);

router.delete('/notes/:id', controller.deleteById);

export default router;
