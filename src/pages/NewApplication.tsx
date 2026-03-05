import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const NewApplication = () => {
  const navigate = useNavigate();
  const [offerText, setOfferText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<"cv" | "lettre">("cv");

  const handleGenerate = async () => {
    if (!offerText.trim()) return;

    setLoading(true);

    const steps = ["Analyse de l'offre...", "Réécriture du CV...", "Génération de la lettre..."];
    for (const s of steps) {
      setLoadingStep(s);
      await new Promise((r) => setTimeout(r, 1500));
    }

    // Save application
    const profile = JSON.parse(localStorage.getItem("jobcraft_profile") || "{}");
    const newApp = {
      id: Date.now().toString(),
      poste: "Poste extrait de l'offre",
      entreprise: "Entreprise",
      date: new Date().toLocaleDateString("fr-FR"),
      statut: "en_attente" as const,
      offerText,
      cvHtml: `<div style="font-family: system-ui; padding: 2rem;"><h1 style="margin-bottom: 0.5rem;">${profile.name || "Votre Nom"}</h1><p style="color: #666; margin-bottom: 1.5rem;">${profile.targetRole || "Poste visé"}</p><h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #C85C3E; padding-bottom: 0.25rem; margin-bottom: 0.75rem;">Expérience</h2><p>${profile.experience || "Vos expériences adaptées à l'offre..."}</p><h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #C85C3E; padding-bottom: 0.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">Compétences</h2><p>${profile.skills || "Vos compétences..."}</p><h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #C85C3E; padding-bottom: 0.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">Formation</h2><p>${profile.education || "Votre formation..."}</p></div>`,
      lettreHtml: `<div style="font-family: system-ui; padding: 2rem;"><p style="text-align: right; color: #666; margin-bottom: 2rem;">${new Date().toLocaleDateString("fr-FR")}</p><p style="margin-bottom: 1rem;">Madame, Monsieur,</p><p style="margin-bottom: 1rem; line-height: 1.7;">Votre offre pour le poste a immédiatement retenu mon attention. Fort(e) de mon expérience en ${profile.skills || "votre domaine"}, je suis convaincu(e) de pouvoir apporter une réelle valeur ajoutée à votre équipe.</p><p style="margin-bottom: 1rem; line-height: 1.7;">Mon parcours m'a permis de développer des compétences solides qui correspondent parfaitement aux exigences de ce poste.</p><p style="margin-bottom: 1rem; line-height: 1.7;">Je me tiens à votre disposition pour un entretien afin de vous présenter plus en détail mon parcours et ma motivation.</p><p>Cordialement,<br/>${profile.name || "Votre Nom"}</p></div>`,
    };

    const existing = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    localStorage.setItem("jobcraft_applications", JSON.stringify([newApp, ...existing]));

    setLoading(false);
    setGenerated(true);
    toast.success("Documents générés avec succès ✨");
  };

  const handleSave = () => {
    toast.success("Candidature enregistrée ✓");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-center mb-4">
            Nouvelle <span className="text-highlight italic">candidature</span>
          </h1>
          <p className="text-center text-muted-foreground mb-10">Colle l'offre d'emploi et laisse l'IA créer tes documents</p>

          {!generated ? (
            <>
              <div className="bg-card/90 backdrop-blur-md rounded-[2rem] shadow-wow-sm border border-white/40 p-8 mb-6 hover:shadow-wow-lg transition-shadow">
                <textarea
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  placeholder="Colle ici le texte de l'offre d'emploi ou son URL..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {loading ? (
                <div className="bg-highlight/5 rounded-[2rem] shadow-[0_0_40px_rgba(124,92,255,0.2)] border border-highlight/30 p-12 text-center relative overflow-hidden mb-6">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-highlight/10 pointer-events-none"
                  />
                  <div className="w-full bg-background rounded-full h-2 mb-6 overflow-hidden relative z-10 border border-white/20">
                    <motion.div
                      className="h-full bg-highlight rounded-full shadow-[0_0_15px_rgba(124,92,255,0.8)]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                    />
                  </div>
                  <motion.p
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-sm font-bold text-highlight relative z-10"
                  >
                    ✨ {loadingStep}
                  </motion.p>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={handleGenerate}
                    className="btn-primary px-10 py-4 text-lg hover:shadow-wow-lg hover:-translate-y-1 transition-all"
                  >
                    ✦ Générer mes documents →
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => setActiveTab("cv")}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "cv" ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  📄 CV personnalisé
                </button>
                <button
                  onClick={() => setActiveTab("lettre")}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "lettre" ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  ✉️ Lettre de motivation
                </button>
              </div>

              {/* Document preview */}
              <div className="bg-background rounded-[2rem] shadow-wow-lg border border-white/50 overflow-hidden mb-10">
                <div className="flex items-center gap-2 px-5 py-4 bg-card/80 border-b border-border/50 backdrop-blur-md">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <div className="p-2">
                  <div
                    className="bg-background rounded-2xl p-6 min-h-[400px]"
                    dangerouslySetInnerHTML={{
                      __html: activeTab === "cv"
                        ? JSON.parse(localStorage.getItem("jobcraft_applications") || "[{}]")[0]?.cvHtml || ""
                        : JSON.parse(localStorage.getItem("jobcraft_applications") || "[{}]")[0]?.lettreHtml || "",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-outline px-8 py-3.5 text-sm">
                  ⬇ Télécharger en PDF
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary px-8 py-3.5 text-sm hover:shadow-wow-sm"
                >
                  Enregistrer la candidature
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NewApplication;
