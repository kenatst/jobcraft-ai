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

const ApplicationDetail = () => {
  const { id } = useParams();
  const [app, setApp] = useState<any>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const found = apps.find((a: any) => a.id === id);
    if (found) {
      setApp(found);
      setNotes(found.notes || "");
    }
  }, [id]);

  const updateStatus = (newStatus: string) => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const updated = apps.map((a: any) => (a.id === id ? { ...a, statut: newStatus } : a));
    localStorage.setItem("jobcraft_applications", JSON.stringify(updated));
    setApp({ ...app, statut: newStatus });
  };

  const saveNotes = () => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const updated = apps.map((a: any) => (a.id === id ? { ...a, notes } : a));
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{app.poste}</h1>
              <p className="text-muted-foreground">{app.entreprise} · {app.date}</p>
            </div>
            <select
              value={app.statut}
              onChange={(e) => updateStatus(e.target.value)}
              className="px-4 py-2 rounded-2xl bg-card shadow-card border border-border text-sm font-medium focus:outline-none"
            >
              {statusOptions.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="bg-card rounded-3xl shadow-card p-6 mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-3xl shadow-card p-6">
              <h3 className="font-bold mb-4">📄 Mon CV</h3>
              <div className="bg-background rounded-2xl p-4 min-h-[200px] text-sm mb-4" dangerouslySetInnerHTML={{ __html: app.cvHtml || "<p class='text-muted-foreground'>CV non généré</p>" }} />
              <button className="w-full py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                ⬇ Télécharger en PDF
              </button>
            </div>
            <div className="bg-card rounded-3xl shadow-card p-6">
              <h3 className="font-bold mb-4">✉️ Ma lettre de motivation</h3>
              <div className="bg-background rounded-2xl p-4 min-h-[200px] text-sm mb-4" dangerouslySetInnerHTML={{ __html: app.lettreHtml || "<p class='text-muted-foreground'>Lettre non générée</p>" }} />
              <button className="w-full py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                ⬇ Télécharger en PDF
              </button>
            </div>
          </div>

          {/* Interview prep CTA */}
          {app.statut === "entretien" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/10 border-2 border-primary/20 rounded-3xl p-8 text-center"
            >
              <p className="text-3xl mb-3">🎯</p>
              <h2 className="text-xl font-bold mb-2">Entretien décroché !</h2>
              <p className="text-muted-foreground mb-5">Prépare-toi avec une fiche personnalisée générée par l'IA</p>
              <Link
                to={`/preparation-entretien/${app.id}`}
                className="inline-block px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity animate-pulse-coral"
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
