import express from 'express';
import { getProfiles, getProfileById, saveProfile, updateProfile, deleteProfile } from '../controllers/ProfileController.js';
import { VerifyToken } from '../middleware/VerifyToken.js';
const router = express.Router();

router.get('/profile', VerifyToken, getProfiles);
router.get('/profile/:id', getProfileById);
router.post('/profile', VerifyToken, saveProfile);
router.put('/profile/:id', updateProfile);
router.delete('/profile/:id', deleteProfile);

export default router;
