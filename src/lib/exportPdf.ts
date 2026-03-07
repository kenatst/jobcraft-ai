interface ExportOptions {
  filename?: string;
  margin?: number;
  image?: { type: string; quality: number };
  html2canvas?: { scale: number; useCORS: boolean; logging: boolean };
  jsPDF?: { unit: string; format: string; orientation: string };
}

export async function exportToPDF(
  element: HTMLElement,
  filename: string = 'document.pdf',
  options?: Partial<ExportOptions>
) {
  // Dynamic import to avoid SSR issues
  const html2pdfModule = await import('html2pdf.js');
  const html2pdf = html2pdfModule.default || html2pdfModule;

  const defaultOptions: ExportOptions = {
    margin: 10,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    ...options,
  };

  // Clone element to avoid style issues in preview
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '210mm';
  clone.style.padding = '20mm';
  clone.style.background = 'white';
  clone.style.color = '#1a1a1a';
  clone.style.fontSize = '14px';
  clone.style.lineHeight = '1.6';
  clone.style.fontFamily = "'Space Grotesk', 'Inter', system-ui, sans-serif";
  
  // Temporarily add to DOM for rendering
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  document.body.appendChild(clone);

  try {
    await html2pdf().set(defaultOptions).from(clone).save();
  } finally {
    document.body.removeChild(clone);
  }
}

export function generateFilename(type: 'CV' | 'Lettre' | 'Fiche_Entretien', poste: string, entreprise?: string) {
  const clean = (s: string) => s.replace(/[^a-zA-Z0-9àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ ]/g, '').replace(/\s+/g, '_').slice(0, 30);
  const parts = [type, clean(poste)];
  if (entreprise) parts.push(clean(entreprise));
  parts.push('JobCraftAI');
  return parts.join('_') + '.pdf';
}