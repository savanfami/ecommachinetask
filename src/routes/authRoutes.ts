import { Router } from 'express'
import { register } from '../controllers/authController'
import {upload} from '../utils/common/multer'

const router=Router()

router.route('/register')
    .post(upload.single("profileImage"), register);




export default router