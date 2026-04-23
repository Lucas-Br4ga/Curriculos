import { Router } from 'express'
import { authLimiter } from '../middlewares/rateLimiter.middleware'
import { validate } from '../middlewares/validate.middleware'
import { requireAuth } from '../middlewares/auth.middleware'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import * as authController from '../controllers/auth.controller'

const router = Router()

router.post('/register', authLimiter, validate(registerSchema), authController.register)
router.post('/login', authLimiter, validate(loginSchema), authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', requireAuth, authController.logout)

export default router
