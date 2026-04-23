import { Request, Response, NextFunction } from 'express'
import { listarVagasSchema } from '../schemas/vaga.schema'
import * as vagasService from '../services/vagas.service'
import * as pdfService from '../services/pdf.service'

export async function listarVagas(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listarVagasSchema.parse(req.query)
    const resultado = await vagasService.listarVagas(req.user!.id, query)
    res.json(resultado)
  } catch (err) {
    next(err)
  }
}

export async function criarVaga(req: Request, res: Response, next: NextFunction) {
  try {
    const vaga = await vagasService.criarVaga(req.user!.id, req.body)
    res.status(201).json(vaga)
  } catch (err) {
    next(err)
  }
}

export async function getVaga(req: Request, res: Response, next: NextFunction) {
  try {
    const vaga = await vagasService.getVaga(req.user!.id, req.params.id)
    res.json(vaga)
  } catch (err) {
    next(err)
  }
}

export async function deletarVaga(req: Request, res: Response, next: NextFunction) {
  try {
    await vagasService.deletarVaga(req.user!.id, req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

export async function downloadPDF(req: Request, res: Response, next: NextFunction) {
  try {
    const vaga = await vagasService.getVaga(req.user!.id, req.params.id)
    const curriculo = vaga.curriculoJson as Record<string, unknown>
    const html = pdfService.gerarHtmlCurriculo(curriculo)
    const pdfBuffer = await pdfService.gerarPDF(html)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="curriculo-${vaga.id}.pdf"`,
    )
    res.send(pdfBuffer)
  } catch (err) {
    next(err)
  }
}
