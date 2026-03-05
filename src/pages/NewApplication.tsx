import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const NewApplication = () => {
  const navigate = useNavigate();
  const [offerText, setOfferText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<"cv" | "lettre">("cv");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("jobcraft_gemini_key") || "");
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem("jobcraft_gemini_key"));

  const handleGenerate = async () => {
    if (!offerText.trim()) return;

    if (!apiKey.trim()) {
      setShowApiInput(true);
      return;
    }

    localStorage.setItem("jobcraft_gemini_key", apiKey);
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
  };

  const handleSave = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Nouvelle <span className="text-accent-violet italic">candidature</span>
          </h1>
          <p className="text-center text-muted-foreground mb-10">Colle l'offre d'emploi et laisse l'IA créer tes documents</p>

          {showApiInput && (
            <div className="bg-card rounded-3xl shadow-card p-6 mb-6">
              <label className="block text-sm font-semibold mb-1.5">Clé API Gemini</label>
              <input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Obtiens ta clé sur <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-primary underline">Google AI Studio</a>
              </p>
            </div>
          )}

          {!generated ? (
            <>
              <div className="bg-card rounded-3xl shadow-card p-8 mb-6">
                <textarea
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  placeholder="Colle ici le texte de l'offre d'emploi ou son URL..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {loading ? (
                <div className="bg-card rounded-3xl shadow-card p-10 text-center">
                  <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                    />
                  </div>
                  <p className="text-sm font-medium text-primary">{loadingStep}</p>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={handleGenerate}
                    className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
                  >
                    ✦ Générer mes documents →
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("cv")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === "cv" ? "bg-primary text-primary-foreground" : "bg-card shadow-card"}`}
                >
                  📄 CV personnalisé
                </button>
                <button
                  onClick={() => setActiveTab("lettre")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === "lettre" ? "bg-primary text-primary-foreground" : "bg-card shadow-card"}`}
                >
                  ✉️ Lettre de motivation
                </button>
              </div>

              {/* Document preview */}
              <div className="bg-card rounded-3xl shadow-card overflow-hidden mb-6">
                <div className="flex items-center gap-2 px-5 py-3 bg-muted/50 border-b border-border/50">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
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

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                  ⬇ Télécharger en PDF
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-full bg-foreground text-card font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Ajouter à mes candidatures
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
