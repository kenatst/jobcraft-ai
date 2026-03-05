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
            <h1 className="text-3xl md:text-4xl font-bold">
              Mes <span className="text-accent-violet italic">candidatures</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="pill-badge text-primary font-semibold text-sm">
              {credits} candidatures restantes
            </span>
            <Link
              to="/nouvelle-candidature"
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.key ? "bg-primary text-primary-foreground" : "bg-card shadow-card text-foreground hover:bg-muted"
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
            className="bg-card rounded-3xl shadow-card p-16 text-center"
          >
            <p className="text-5xl mb-4">📭</p>
            <h2 className="text-xl font-bold mb-2">Aucune candidature pour l'instant</h2>
            <p className="text-muted-foreground mb-6">Colle une offre d'emploi et laisse l'IA faire le reste</p>
            <Link
              to="/nouvelle-candidature"
              className="inline-block px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
            >
              + Nouvelle candidature
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
                  className="bg-card rounded-3xl shadow-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
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
                      className="px-4 py-2 rounded-full text-xs font-semibold border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      Voir les documents
                    </Link>
                    {app.statut === "entretien" && (
                      <Link
                        to={`/preparation-entretien/${app.id}`}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground animate-pulse-coral"
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
