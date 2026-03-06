import { useState } from "react";
import { motion } from "framer-motion";
import { CV_TEMPLATES, CATEGORIES, CATEGORY_LABELS, type CVTemplate } from "@/lib/templates";

interface TemplateSelectorProps {
  selected: number;
  onSelect: (id: number) => void;
  compact?: boolean;
}

const TemplateSelector = ({ selected, onSelect, compact = false }: TemplateSelectorProps) => {
  const [category, setCategory] = useState<CVTemplate['category'] | 'all'>('all');
  const [previewId, setPreviewId] = useState<number | null>(null);

  const filtered = category === 'all' ? CV_TEMPLATES : CV_TEMPLATES.filter(t => t.category === category);
  const previewTemplate = previewId !== null ? CV_TEMPLATES.find(t => t.id === previewId) : null;

  // Generate a color based on template id for visual diversity
  const getTemplateColors = (id: number) => {
    const hues = [0, 30, 60, 120, 200, 260, 300, 340];
    const hue = hues[id % hues.length];
    const sat = 40 + (id % 3) * 15;
    return {
      primary: `hsl(${hue}, ${sat}%, 35%)`,
      bg: `hsl(${hue}, ${sat}%, 97%)`,
      accent: `hsl(${hue}, ${sat}%, 85%)`,
      text: `hsl(${hue}, ${sat}%, 20%)`,
    };
  };

  return (
    <div>
      {/* Category filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${category === 'all' ? 'bg-primary text-primary-foreground shadow-wow-sm' : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground'}`}
        >
          Tous ({CV_TEMPLATES.length})
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${category === cat ? 'bg-primary text-primary-foreground shadow-wow-sm' : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground'}`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={`grid gap-3 ${compact ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'}`}>
        {filtered.map((t) => {
          const colors = getTemplateColors(t.id);
          const isSelected = selected === t.id;
          return (
            <motion.button
              key={t.id}
              onClick={() => onSelect(t.id)}
              onDoubleClick={() => setPreviewId(t.id)}
              whileHover={{ y: -3, scale: 1.02 }}
              className={`relative rounded-2xl border-2 p-3 text-left transition-all ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 shadow-wow-sm'
                  : 'border-border/30 hover:border-primary/50'
              }`}
              style={{ background: colors.bg }}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold z-10">
                  ✓
                </div>
              )}
              {/* Mini CV preview skeleton */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 border border-border/20 bg-card p-2 space-y-1.5">
                <div className="h-2 rounded-full w-3/5" style={{ background: colors.primary }} />
                <div className="h-1.5 rounded-full w-4/5" style={{ background: colors.accent }} />
                <div className="h-1 rounded-full w-full" style={{ background: colors.accent, opacity: 0.5 }} />
                <div className="h-1 rounded-full w-4/5" style={{ background: colors.accent, opacity: 0.5 }} />
                <div className="mt-2 h-1.5 rounded-full w-2/5" style={{ background: colors.primary }} />
                <div className="h-1 rounded-full w-full" style={{ background: colors.accent, opacity: 0.4 }} />
                <div className="h-1 rounded-full w-3/4" style={{ background: colors.accent, opacity: 0.4 }} />
                <div className="mt-2 h-1.5 rounded-full w-1/3" style={{ background: colors.primary }} />
                <div className="h-1 rounded-full w-full" style={{ background: colors.accent, opacity: 0.3 }} />
              </div>
              <p className="text-xs font-bold truncate" style={{ color: colors.text }}>{t.name}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Preview modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setPreviewId(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl shadow-wow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <div>
                <h3 className="font-bold">{previewTemplate.name}</h3>
                <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[previewTemplate.category]}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { onSelect(previewTemplate.id); setPreviewId(null); }}
                  className="btn-primary text-xs !py-2 !px-5"
                >
                  ✓ Sélectionner
                </button>
                <button onClick={() => setPreviewId(null)} className="btn-outline text-xs !py-2 !px-4">
                  Fermer
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <iframe
                src={`/cv-100-templates.html#template-${String(previewTemplate.id).padStart(2, '0')}`}
                className="w-full border border-border/30 rounded-xl"
                style={{ height: '800px' }}
                title={`Preview ${previewTemplate.name}`}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
