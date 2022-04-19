import { Router } from "express";
import { AuthController }from '../controller/auth.controller'

const router: Router = Router()
const authController:AuthController = new AuthController()

router.route('/login').post(authController.login)

export const AuthRouter: Router = router
