import express from 'express';
import { getProfiles, getProfileById, saveProfile, updateProfile, deleteProfile } from '../controllers/ProfileController.js';
import { VerifyToken } from '../middleware/VerifyToken.js';
const router = express.Router();

router.get('/profile', getProfiles);
router.get('/profile/:id', getProfileById);
router.post('/profile', saveProfile);
router.patch('/profile/:id', updateProfile);
router.delete('/profile/:id', deleteProfile);

export default router;
