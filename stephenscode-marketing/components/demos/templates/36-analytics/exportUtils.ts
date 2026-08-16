// Client-side file generation helpers for the analytics demo.
// Every export produces a real downloadable file so the demo has no dead ends.

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'report'
}

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function csvBlob(rows: (string | number)[][]): Blob {
  const escapeCell = (cell: string | number) => {
    const value = String(cell)
    return /[",\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value
  }
  const csv = rows.map(row => row.map(escapeCell).join(',')).join('\r\n')
  return new Blob([csv], { type: 'text/csv;charset=utf-8' })
}

export function jsonBlob(data: unknown): Blob {
  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
}

// Excel opens HTML-table .xls files natively, so this is a genuinely usable spreadsheet export.
export function xlsBlob(title: string, rows: (string | number)[][]): Blob {
  const escapeHtml = (value: string | number) =>
    String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const body = rows
    .map((row, rowIndex) => {
      const tag = rowIndex === 0 ? 'th' : 'td'
      return '<tr>' + row.map(cell => `<${tag}>${escapeHtml(cell)}</${tag}>`).join('') + '</tr>'
    })
    .join('')
  const html = `<html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body><table border="1">${body}</table></body></html>`
  return new Blob([html], { type: 'application/vnd.ms-excel' })
}

// Hand-built minimal single-page PDF (valid PDF 1.4) so the PDF export downloads a real,
// openable document without any external library.
export function pdfBlob(title: string, lines: string[]): Blob {
  const escapePdf = (value: string) =>
    value
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      // Keep the byte-offset math exact by restricting to printable ASCII
      .replace(/[^\x20-\x7E]/g, '')

  let content = 'BT\n/F1 16 Tf\n50 742 Td\n(' + escapePdf(title) + ') Tj\n/F1 11 Tf\n14 TL\n0 -30 Td\n'
  for (const line of lines) {
    content += '(' + escapePdf(line) + ') Tj\nT*\n'
  }
  content += 'ET'

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []
  objects.forEach((body, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
  })
  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  for (const offset of offsets) {
    pdf += String(offset).padStart(10, '0') + ' 00000 n \n'
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`
  return new Blob([pdf], { type: 'application/pdf' })
}
