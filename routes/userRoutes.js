import express from 'express';
import { createAccount, loginAccount, updateUserProfile, userProfile } from '../controllers/userControllers.js';
import { isAuth } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', createAccount);
router.post('/login',loginAccount)
router.get('/profile',isAuth,userProfile)
router.put('/update-user-profile',isAuth,updateUserProfile)

export default router;
