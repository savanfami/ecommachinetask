import { Router } from 'express'
import { loginController, registerController, refreshTokenController } from '../controllers/authController'
import { upload } from '../utils/common/multer'
import { refreshTokenMiddleware } from '../middlewares/refreshtokenMiddleware'
import { jwtMiddleware } from '../middlewares/authMiddleware'
import { addBrand } from '../controllers/brandController'

const router = Router()

//auth routes

router.route('/auth/register')
    .post(upload.single("profilephoto"), registerController);

router.route('/auth/login')
    .post(loginController);

router.route('/auth/refresh-token').post(refreshTokenMiddleware, refreshTokenController);


//brand routes
router.route('/brands')
    .post(
        upload.single('brand_logo'),
        jwtMiddleware,
        addBrand
    ).get()


export default router