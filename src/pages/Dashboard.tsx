import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type Application = {
  id: string;
  poste: string;
  entreprise: string;
  date: string;
  statut: "en_attente" | "relance" | "refus" | "entretien";
};

const statusConfig = {
  en_attente: { label: "En attente", color: "bg-muted text-muted-foreground" },
  relance: { label: "Relancé", color: "bg-yellow-100 text-yellow-800" },
  refus: { label: "Refus", color: "bg-red-100 text-red-700" },
  entretien: { label: "Entretien décroché ✓", color: "bg-green-100 text-green-700" },
};

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const saved = localStorage.getItem("jobcraft_applications");
    if (saved) setApplications(JSON.parse(saved));
  }, []);

  const filtered = filter === "all" ? applications : applications.filter((a) => a.statut === filter);
  const credits = 12;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display">
              Mes <span className="text-accent italic">candidatures</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="pill-badge text-primary font-semibold text-sm">
              {credits} candidatures restantes
            </span>
            <Link
              to="/nouvelle-candidature"
              className="btn-primary py-2.5 text-sm"
            >
              + Nouvelle candidature
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: "all", label: "Tous" },
            { key: "en_attente", label: "En attente" },
            { key: "entretien", label: "Entretiens" },
            { key: "refus", label: "Refus" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${filter === f.key ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Applications list */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card/70 backdrop-blur-lg rounded-[2rem] shadow-wow-sm border border-white/40 p-16 text-center"
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

            <Link
              to="/nouvelle-candidature"
              className="btn-primary text-sm hover:shadow-wow-lg hover:-translate-y-1 transition-all"
            >
              + Créer ma première candidature
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((app, i) => {
              const status = statusConfig[app.statut];
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-card/90 backdrop-blur-sm rounded-[2rem] shadow-wow-sm border border-white/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-wow-lg transition-all"
                >
                  <div>
                    <h3 className="font-bold text-lg">{app.poste}</h3>
                    <p className="text-sm text-muted-foreground">{app.entreprise} · {app.date}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                      {status.label}
                    </span>
                    <Link
                      to={`/candidature/${app.id}`}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold border-2 border-border hover:border-primary hover:text-primary transition-colors bg-background"
                    >
                      Voir les documents
                    </Link>
                    {app.statut === "entretien" && (
                      <Link
                        to={`/preparation-entretien/${app.id}`}
                        className="btn-highlight py-2.5 text-xs animate-pulse-coral relative"
                      >
                        🎯 Préparer l'entretien
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
