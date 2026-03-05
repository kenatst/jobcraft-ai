import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const statusOptions = [
  { key: "en_attente", label: "En attente", color: "bg-muted text-muted-foreground" },
  { key: "relance", label: "Relancé", color: "bg-yellow-100 text-yellow-800" },
  { key: "refus", label: "Refus", color: "bg-red-100 text-red-700" },
  { key: "entretien", label: "Entretien décroché ✓", color: "bg-green-100 text-green-700" },
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
}

const ApplicationDetail = () => {
  const { id } = useParams();
  const [app, setApp] = useState<ApplicationData | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const found = apps.find((a: ApplicationData) => a.id === id);
    if (found) {
      setApp(found);
      setNotes(found.notes || "");
    }
  }, [id]);

  const updateStatus = (newStatus: string) => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const updated = apps.map((a: ApplicationData) => (a.id === id ? { ...a, statut: newStatus } : a));
    localStorage.setItem("jobcraft_applications", JSON.stringify(updated));
    setApp({ ...app, statut: newStatus });
  };

  const saveNotes = () => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const updated = apps.map((a: ApplicationData) => (a.id === id ? { ...a, notes } : a));
    localStorage.setItem("jobcraft_applications", JSON.stringify(updated));
  };

  if (!app) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Candidature introuvable</p>
          <Link to="/dashboard" className="text-primary underline mt-4 inline-block">Retour au dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">
            ← Retour au dashboard
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold font-display">{app.poste}</h1>
              <p className="text-muted-foreground text-lg">{app.entreprise} · {app.date}</p>
            </div>
            <select
              value={app.statut}
              onChange={(e) => updateStatus(e.target.value)}
              className="px-5 py-2.5 rounded-2xl bg-card/80 backdrop-blur-md shadow-wow-sm border border-white/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {statusOptions.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="bg-card/80 backdrop-blur-md rounded-[2rem] shadow-wow-sm border border-white/40 p-6 mb-8">
            <label className="block text-sm font-semibold mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={saveNotes}
              placeholder="Ajoute tes notes sur cette candidature..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          {/* Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-background rounded-[2rem] shadow-wow-sm border border-white/50 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 bg-card/80 border-b border-border/50 backdrop-blur-md">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                <span className="ml-auto text-xs text-muted-foreground font-semibold">📄 Mon CV</span>
              </div>
              <div className="p-3">
                <div className="bg-background rounded-2xl p-5 min-h-[200px] text-sm" dangerouslySetInnerHTML={{ __html: app.cvHtml || "<p class='text-muted-foreground'>CV non généré</p>" }} />
              </div>
              <div className="px-5 pb-5">
                <button className="btn-outline w-full py-2.5 text-sm">
                  ⬇ Télécharger en PDF
                </button>
              </div>
            </div>
            <div className="bg-background rounded-[2rem] shadow-wow-sm border border-white/50 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 bg-card/80 border-b border-border/50 backdrop-blur-md">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                <span className="ml-auto text-xs text-muted-foreground font-semibold">✉️ Ma lettre</span>
              </div>
              <div className="p-3">
                <div className="bg-background rounded-2xl p-5 min-h-[200px] text-sm" dangerouslySetInnerHTML={{ __html: app.lettreHtml || "<p class='text-muted-foreground'>Lettre non générée</p>" }} />
              </div>
              <div className="px-5 pb-5">
                <button className="btn-outline w-full py-2.5 text-sm">
                  ⬇ Télécharger en PDF
                </button>
              </div>
            </div>
          </div>

          {/* Interview prep CTA */}
          {app.statut === "entretien" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-highlight/10 border-2 border-highlight/20 rounded-[2rem] p-10 text-center shadow-[0_0_40px_rgba(124,92,255,0.1)] relative overflow-hidden"
            >
              <p className="text-3xl mb-3">🎯</p>
              <h2 className="text-xl font-bold mb-2">Entretien décroché !</h2>
              <p className="text-muted-foreground mb-5">Prépare-toi avec une fiche personnalisée générée par l'IA</p>
              <Link
                to={`/preparation-entretien/${app.id}`}
                className="btn-primary text-sm animate-pulse-coral"
              >
                🎯 Générer ma préparation d'entretien →
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
