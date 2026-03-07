import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";
import KanbanBoard from "@/components/KanbanBoard";

type Application = {
  id: string;
  poste: string;
  entreprise: string;
  date: string;
  statut: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  useEffect(() => {
    // Redirect if no profile
    const profile = localStorage.getItem("jobcraft_profile");
    if (!profile) {
      navigate("/onboarding", { replace: true });
      return;
    }
    const saved = localStorage.getItem("jobcraft_applications");
    if (saved) setApplications(JSON.parse(saved));
  }, [navigate]);

  const saveApps = (apps: Application[]) => {
    setApplications(apps);
    localStorage.setItem("jobcraft_applications", JSON.stringify(apps));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = applications.map(a => a.id === id ? { ...a, statut: newStatus } : a);
    saveApps(updated);
    toast.success("Statut mis à jour ✓");
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Supprimer cette candidature ?")) return;
    saveApps(applications.filter(a => a.id !== id));
    toast.success("Candidature supprimée");
  };

  const stats = {
    total: applications.length,
    en_attente: applications.filter(a => a.statut === 'en_attente' || a.statut === 'envoyee').length,
    entretien: applications.filter(a => a.statut === 'entretien').length,
    refus: applications.filter(a => a.statut === 'refus').length,
  };

  const credits = 12;
  const profileData = JSON.parse(localStorage.getItem("jobcraft_profile") || "{}");

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display">
              {profileData.name ? (
                <>Salut <span className="text-accent italic">{profileData.name.split(' ')[0]}</span> 👋</>
              ) : (
                <>Mes <span className="text-accent italic">candidatures</span></>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              {applications.length === 0
                ? "Prêt à lancer ta première candidature ?"
                : `${applications.length} candidature${applications.length > 1 ? 's' : ''} en cours`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="pill-badge text-primary font-semibold text-sm">
              {credits} crédits restants
            </span>
            <Link to="/nouvelle-candidature" className="btn-primary py-2.5 text-sm">
              + Nouvelle candidature
            </Link>
          </div>
        </div>

        {/* Stats */}
        {applications.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: stats.total, icon: '📊', color: 'text-foreground' },
              { label: 'En cours', value: stats.en_attente, icon: '⏳', color: 'text-muted-foreground' },
              { label: 'Entretiens', value: stats.entretien, icon: '🎯', color: 'text-success' },
              { label: 'Refus', value: stats.refus, icon: '❌', color: 'text-destructive' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/30 p-5 text-center shadow-sm"
              >
                <span className="text-2xl block mb-1">{s.icon}</span>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* View toggle */}
        {applications.length > 0 && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'kanban' ? 'bg-primary text-primary-foreground shadow-wow-sm' : 'bg-card border border-border/50 text-muted-foreground'}`}
            >
              📋 Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-primary text-primary-foreground shadow-wow-sm' : 'bg-card border border-border/50 text-muted-foreground'}`}
            >
              📝 Liste
            </button>
          </div>
        )}

        {/* Content */}
        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card/70 backdrop-blur-lg rounded-[2rem] shadow-wow-sm border border-border/30 p-16 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-7xl mb-6"
            >
              🚀
            </motion.div>
            <h2 className="text-2xl font-extrabold font-display mb-3">Prêt à décrocher ton prochain job ?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">3 étapes simples pour générer ta candidature parfaite</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 text-left max-w-lg mx-auto">
              {[
                { step: "1", icon: "📋", text: "Colle une offre d'emploi" },
                { step: "2", icon: "✨", text: "L'IA génère CV + Lettre" },
                { step: "3", icon: "📨", text: "Télécharge et postule" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-3 bg-background rounded-2xl p-4 flex-1"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <span className="text-xs font-bold text-primary">Étape {s.step}</span>
                    <p className="text-sm font-semibold">{s.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to="/nouvelle-candidature" className="btn-primary text-sm hover:shadow-wow-lg hover:-translate-y-1 transition-all">
              + Créer ma première candidature
            </Link>
          </motion.div>
        ) : viewMode === 'kanban' ? (
          <KanbanBoard
            applications={applications}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ) : (
          <div className="space-y-3">
            {applications.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-sm border border-border/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-wow-sm transition-all"
              >
                <Link to={`/candidature/${app.id}`} className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                    ['bg-primary/15 text-primary', 'bg-accent/15 text-accent', 'bg-success/15 text-success'][i % 3]
                  }`}>
                    {app.entreprise.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold">{app.poste}</h3>
                    <p className="text-sm text-muted-foreground">{app.entreprise} · {app.date}</p>
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <Link to={`/candidature/${app.id}`} className="btn-outline text-xs !py-2 !px-4">
                    Voir →
                  </Link>
                  <button onClick={() => handleDelete(app.id)} className="text-xs text-destructive/50 hover:text-destructive px-2">✕</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;