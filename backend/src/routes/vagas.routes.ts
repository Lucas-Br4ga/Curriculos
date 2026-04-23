import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { criarVagaSchema } from '../schemas/vaga.schema'
import * as vagasController from '../controllers/vagas.controller'

const router = Router()

router.use(requireAuth)

router.get('/', vagasController.listarVagas)
router.post('/', validate(criarVagaSchema), vagasController.criarVaga)
router.get('/:id', vagasController.getVaga)
router.get('/:id/pdf', vagasController.downloadPDF)
router.delete('/:id', vagasController.deletarVaga)

export default router
