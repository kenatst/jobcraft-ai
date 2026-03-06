export interface CVTemplate {
  id: number;
  name: string;
  category: 'classique' | 'creatif' | 'tech' | 'minimaliste' | 'audacieux';
  description: string;
}

const categoryLabels: Record<string, string> = {
  classique: '📁 Classique / Corporate',
  creatif: '🎨 Créatif / Design',
  tech: '💻 Tech / Startup',
  minimaliste: '✨ Minimaliste / Épuré',
  audacieux: '🔥 Audacieux / Impactant',
};

function generateTemplates(): CVTemplate[] {
  const cats: Array<{ key: CVTemplate['category']; names: string[] }> = [
    { key: 'classique', names: [
      'Sidebar Anthracite','Bandeau Bleu Marine','Ligne Verte Élégante','Double Colonne Traditionnel',
      'Cadre Doré','Timeline Verticale','Colonnes Grises','Serif Académique','Bordure Noire Fine',
      'En-tête Centré','Filet Bronze','Bloc Gris Perle','Deux Tons Charbon','Encadré Bordeaux',
      'Barre Latérale Sable','Header Bleu Acier','Section Séparée','Colonnes Équilibrées','Cadre Institutionnel','Ruban Classique'
    ]},
    { key: 'creatif', names: [
      'Splash Corail','Gradient Sunset','Typo Bold','Mosaïque Couleurs','Cercles Dynamiques',
      'Bande Diagonale','Pop Art Minimal','Watercolor Fond','Néon Outline','Collage Moderne',
      'Brush Stroke','Palette Pastel','Grid Créatif','Overlay Photos','Duo-Tone Rose',
      'Illustré Main','Carte Postale','Magazine Layout','Papier Craft','Encre Calligraphie'
    ]},
    { key: 'tech', names: [
      'Terminal Dark','Code Editor','Matrix Vert','Dashboard UI','Blueprint Grid',
      'Monospace Hacker','Circuit Board','API Docs Style','Dark IDE','Material Design',
      'Flat UI Cards','Github Profile','Console Output','Binary Header','Cloud Stack',
      'DevOps Pipeline','React Component','Pixel Grid','JSON Layout','Markdown Style'
    ]},
    { key: 'minimaliste', names: [
      'Blanc Absolu','Ligne Unique','Espace Zen','Sans Serif Pure','Point Central',
      'Marge Généreuse','Mono Couleur','Trait Fin','Typographie Seule','Papier Vierge',
      'Accent Discret','Grid Invisible','Ultra Light','Souffle Aérien','Cadre Invisible',
      'Trait Horizontal','Espace Négatif','Micro Détails','Silence Visuel','Respiration'
    ]},
    { key: 'audacieux', names: [
      'Full Noir','Rouge Intense','Barre Latérale XXL','Typo Géante','Contraste Maximum',
      'Photo Plein Cadre','Bannière Large','Or sur Noir','Bloc Couleur Total','Split Diagonal',
      'Neon Glow','Grunge Texture','3D Depth','Metallic Silver','Fire Gradient',
      'Electric Blue','Brutalist Raw','Max Impact','Bold Statement','Power Layout'
    ]},
  ];

  const templates: CVTemplate[] = [];
  let id = 1;
  for (const cat of cats) {
    for (const name of cat.names) {
      templates.push({
        id,
        name: `${String(id).padStart(2, '0')} — ${name}`,
        category: cat.key,
        description: `Template ${cat.key} : ${name}`,
      });
      id++;
    }
  }
  return templates;
}

export const CV_TEMPLATES = generateTemplates();
export const CATEGORY_LABELS = categoryLabels;
export const CATEGORIES = Object.keys(categoryLabels) as CVTemplate['category'][];
