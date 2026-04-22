import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportarPDF(elementoId, nomeArquivo) {
  const elemento = document.getElementById(elementoId)
  if (!elemento) throw new Error('Elemento não encontrado: ' + elementoId)

  const canvas = await html2canvas(elemento, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const largura = pdf.internal.pageSize.getWidth()
  const alturaA4 = pdf.internal.pageSize.getHeight()
  const alturaImagem = (canvas.height * largura) / canvas.width

  if (alturaImagem <= alturaA4) {
    pdf.addImage(imgData, 'PNG', 0, 0, largura, alturaImagem)
  } else {
    // Divide em páginas se o conteúdo for maior que A4
    let posY = 0
    let pagina = 0
    while (posY < alturaImagem) {
      if (pagina > 0) pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, -posY, largura, alturaImagem)
      posY += alturaA4
      pagina++
    }
  }

  pdf.save(`${nomeArquivo}.pdf`)
}
