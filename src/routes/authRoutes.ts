import { Router } from 'express'
import {  loginController, registerController, refreshTokenController } from '../controllers/authController'
import { upload } from '../utils/common/multer'
import { refreshTokenMiddleware } from '../middlewares/refreshtokenMiddleware'

const router = Router()

router.route('/register')
    .post(upload.single("profilephoto"), registerController);

router.route('/login')
    .post(loginController);

router.route('/refresh-token').post(refreshTokenMiddleware,refreshTokenController);


export default router