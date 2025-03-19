import { Router } from 'express'
import { loginController, registerController, refreshTokenController } from '../controllers/authController'
import { upload } from '../utils/common/multer'
import { refreshTokenMiddleware } from '../middlewares/refreshtokenMiddleware'
import { jwtMiddleware } from '../middlewares/authMiddleware'
import { addBrand, getAllBrand } from '../controllers/brandController'
import { addProduct, allProduct, deleteProduct, editProduct } from '../controllers/productController'

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
    ).get(jwtMiddleware,getAllBrand)


//product routes

router.route('/products').post(upload.single('product_image'),jwtMiddleware,addProduct).get(jwtMiddleware,allProduct)
router.route('/products/:id').put(upload.single('product_image'),jwtMiddleware,editProduct).delete(jwtMiddleware,deleteProduct)



export default router