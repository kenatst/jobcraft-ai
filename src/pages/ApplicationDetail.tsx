import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";
import AtsScore from "@/components/AtsScore";
import { exportToPDF, generateFilename } from "@/lib/exportPdf";

const statusOptions = [
  { key: "en_attente", label: "En attente", color: "bg-muted text-muted-foreground" },
  { key: "envoyee", label: "Envoyée", color: "bg-blue-100 text-blue-700" },
  { key: "relance", label: "Relancé", color: "bg-amber-100 text-amber-700" },
  { key: "entretien", label: "Entretien décroché ✓", color: "bg-green-100 text-green-700" },
  { key: "refus", label: "Refus", color: "bg-red-100 text-red-700" },
];

interface ApplicationData {
  id: string;
  poste?: string;
  entreprise?: string;
  date?: string;
  statut?: string;
  notes?: string;
  cvHtml?: string;
  lettreHtml?: string;
  atsScore?: number;
}

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState<ApplicationData | null>(null);
  const [notes, setNotes] = useState("");
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [activeDoc, setActiveDoc] = useState<'cv' | 'lettre'>('cv');
  const cvRef = useRef<HTMLDivElement>(null);
  const lettreRef = useRef<HTMLDivElement>(null);
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const found = apps.find((a: ApplicationData) => a.id === id);
    if (found) { setApp(found); setNotes(found.notes || ""); }
  }, [id]);

  const updateApp = (updates: Partial<ApplicationData>) => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const updated = apps.map((a: ApplicationData) => (a.id === id ? { ...a, ...updates } : a));
    localStorage.setItem("jobcraft_applications", JSON.stringify(updated));
    setApp(prev => prev ? { ...prev, ...updates } : prev);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setSaveIndicator(false);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateApp({ notes: value });
      setSaveIndicator(true);
      setTimeout(() => setSaveIndicator(false), 2000);
    }, 1000);
  };

  const handleExportPdf = async (type: 'cv' | 'lettre') => {
    const el = type === 'cv' ? cvRef.current : lettreRef.current;
    if (!el) return;
    toast.info("Génération du PDF...");
    try {
      await exportToPDF(el, generateFilename(type === 'cv' ? 'CV' : 'Lettre', app?.poste || '', app?.entreprise));
      toast.success("PDF téléchargé ✓");
    } catch (err) {
      console.error('PDF export error:', err);
      toast.error("Erreur lors de l'export PDF");
    }
  };

  if (!app) {
    return (
      <div className="min-h-screen bg-background">
        <BackgroundIcons /><Navbar />
        <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto text-center relative z-10">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-muted-foreground mb-4">Candidature introuvable</p>
          <Link to="/dashboard" className="btn-primary text-sm">← Retour au dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{app.poste}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold font-display">{app.poste}</h1>
              <p className="text-muted-foreground text-lg">{app.entreprise} · {app.date}</p>
            </div>
            <select
              value={app.statut}
              onChange={(e) => { updateApp({ statut: e.target.value }); toast.success("Statut mis à jour"); }}
              className="px-5 py-2.5 rounded-2xl bg-card shadow-sm border border-border/30 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {statusOptions.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>

          {/* ATS Score */}
          {app.atsScore && (
            <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border border-border/30 p-6 mb-8 flex items-center gap-6">
              <AtsScore score={app.atsScore} size={80} showLabel={false} />
              <div>
                <p className="font-bold">Score ATS : {app.atsScore}%</p>
                <p className="text-sm text-muted-foreground">Correspondance avec l'offre d'emploi</p>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border border-border/30 p-6 mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold">📝 Notes</label>
              {saveIndicator && <span className="text-xs text-success font-medium">Sauvegardé ✓</span>}
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Ajoute tes notes sur cette candidature..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          {/* Document tabs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveDoc('cv')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeDoc === 'cv' ? 'bg-primary text-primary-foreground shadow-wow-sm' : 'bg-card border border-border/50 text-muted-foreground'}`}
            >
              📄 Mon CV
            </button>
            <button
              onClick={() => setActiveDoc('lettre')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeDoc === 'lettre' ? 'bg-primary text-primary-foreground shadow-wow-sm' : 'bg-card border border-border/50 text-muted-foreground'}`}
            >
              ✉️ Ma lettre
            </button>
          </div>

          {/* Document preview */}
          <div className="bg-card rounded-[2rem] shadow-wow-sm border border-border/30 overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-5 py-3 bg-muted/30 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-highlight/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <span className="ml-auto text-xs text-muted-foreground font-semibold">
                {activeDoc === 'cv' ? '📄 Mon CV' : '✉️ Ma lettre'}
              </span>
            </div>
            <div className="p-3">
              <div
                ref={cvRef}
                className={`bg-white rounded-2xl p-5 min-h-[200px] text-sm ${activeDoc !== 'cv' ? 'hidden' : ''}`}
                dangerouslySetInnerHTML={{ __html: app.cvHtml || "<p class='text-muted-foreground'>Non généré</p>" }}
              />
              <div
                ref={lettreRef}
                className={`bg-white rounded-2xl p-5 min-h-[200px] text-sm ${activeDoc !== 'lettre' ? 'hidden' : ''}`}
                dangerouslySetInnerHTML={{ __html: app.lettreHtml || "<p class='text-muted-foreground'>Non généré</p>" }}
              />
            </div>
            <div className="px-5 pb-4">
              <button onClick={() => handleExportPdf(activeDoc)} className="btn-outline w-full py-2.5 text-sm">
                ⬇ Télécharger en PDF
              </button>
            </div>
          </div>

          {/* Interview prep CTA */}
          {app.statut === "entretien" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-success/5 border-2 border-success/20 rounded-[2rem] p-10 text-center"
            >
              <p className="text-4xl mb-3">🎯</p>
              <h2 className="text-xl font-bold mb-2">Entretien décroché !</h2>
              <p className="text-muted-foreground mb-5">Prépare-toi avec une fiche personnalisée</p>
              <Link to={`/preparation-entretien/${app.id}`} className="btn-primary text-sm">
                🎯 Générer ma préparation d'entretien →
              </Link>
            </motion.div>
          ) : (
            <div className="bg-muted/30 rounded-[2rem] border border-border/30 p-8 text-center">
              <p className="text-muted-foreground text-sm mb-3">Passe en statut "Entretien décroché" pour accéder au coaching IA</p>
              <button
                onClick={() => { updateApp({ statut: 'entretien' }); toast.success("Statut mis à jour !"); }}
                className="btn-outline text-xs !py-2 !px-5"
              >
                Marquer comme entretien décroché
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationDetail;