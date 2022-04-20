import express from 'express';
import notes from '../routes/notes';

const router = express.Router();

router.use(notes);
// add more routes

export default router;
