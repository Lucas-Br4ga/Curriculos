import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { atualizarPerfilSchema } from '../schemas/perfil.schema'
import * as perfilController from '../controllers/perfil.controller'

const router = Router()

router.use(requireAuth)

router.get('/', perfilController.getPerfil)
router.put('/', validate(atualizarPerfilSchema), perfilController.atualizarPerfil)

export default router
