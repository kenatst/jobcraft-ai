import html2pdf from 'html2pdf.js';

interface ExportOptions {
  filename?: string;
  margin?: number;
  image?: { type: string; quality: number };
  html2canvas?: { scale: number; useCORS: boolean };
  jsPDF?: { unit: string; format: string; orientation: string };
}

export async function exportToPDF(
  element: HTMLElement,
  filename: string = 'document.pdf',
  options?: Partial<ExportOptions>
) {
  const defaultOptions: ExportOptions = {
    margin: 10,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    ...options,
  };

  await html2pdf().set(defaultOptions).from(element).save();
}

export function generateFilename(type: 'CV' | 'Lettre' | 'Fiche_Entretien', poste: string, entreprise?: string) {
  const clean = (s: string) => s.replace(/[^a-zA-Z0-9àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ ]/g, '').replace(/\s+/g, '_').slice(0, 30);
  const parts = [type, clean(poste)];
  if (entreprise) parts.push(clean(entreprise));
  parts.push('JobCraftAI');
  return parts.join('_') + '.pdf';
}
