import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";
import AtsScore from "@/components/AtsScore";
import { exportToPDF, generateFilename } from "@/lib/exportPdf";

const NewApplication = () => {
  const navigate = useNavigate();
  const [offerText, setOfferText] = useState("");
  const [posteName, setPosteName] = useState("");
  const [entrepriseName, setEntrepriseName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<"cv" | "lettre">("cv");
  const [atsScore] = useState(87);
  const [atsKeywords] = useState(["React", "TypeScript", "Agile", "API REST", "Git"]);
  const [atsMissing] = useState(["Docker", "CI/CD"]);
  const cvRef = useRef<HTMLDivElement>(null);
  const lettreRef = useRef<HTMLDivElement>(null);

  const loadingSteps = [
    { icon: "🔍", label: "Analyse de l'offre d'emploi...", pct: 20 },
    { icon: "📝", label: "Réécriture de ton CV...", pct: 50 },
    { icon: "✉️", label: "Génération de la lettre de motivation...", pct: 80 },
    { icon: "✨", label: "Finalisation des documents...", pct: 100 },
  ];

  const handleGenerate = async () => {
    if (!offerText.trim()) return;
    setLoading(true);

    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise((r) => setTimeout(r, 2000));
    }

    const profile = JSON.parse(localStorage.getItem("jobcraft_profile") || "{}");
    const poste = posteName || "Poste extrait de l'offre";
    const entreprise = entrepriseName || "Entreprise";

    const newApp = {
      id: Date.now().toString(),
      poste,
      entreprise,
      date: new Date().toLocaleDateString("fr-FR"),
      statut: "en_attente" as const,
      offerText,
      atsScore: 87,
      cvHtml: `<div style="font-family: 'Space Grotesk', system-ui; padding: 2rem;"><h1 style="margin-bottom: 0.25rem; font-size: 24px;">${profile.name || "Votre Nom"}</h1><p style="color: #C85C3E; font-weight: 600; margin-bottom: 1.5rem;">${profile.targetRole || poste}</p><h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #C85C3E; padding-bottom: 4px; margin-bottom: 12px; color: #C85C3E;">Expérience</h2><p style="line-height: 1.6;">${profile.experience || "Vos expériences adaptées à l'offre..."}</p><h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #C85C3E; padding-bottom: 4px; margin-top: 20px; margin-bottom: 12px; color: #C85C3E;">Compétences</h2><p>${profile.skills || "Vos compétences..."}</p><h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #C85C3E; padding-bottom: 4px; margin-top: 20px; margin-bottom: 12px; color: #C85C3E;">Formation</h2><p>${profile.education || "Votre formation..."}</p></div>`,
      lettreHtml: `<div style="font-family: 'Space Grotesk', system-ui; padding: 2rem; line-height: 1.7;"><p style="text-align: right; color: #666; margin-bottom: 2rem;">${new Date().toLocaleDateString("fr-FR")}</p><p style="margin-bottom: 1rem;">Madame, Monsieur,</p><p style="margin-bottom: 1rem;">Votre offre pour le poste de ${poste} a immédiatement retenu mon attention. Fort(e) de mon expérience en ${profile.skills || "votre domaine"}, je suis convaincu(e) de pouvoir apporter une réelle valeur ajoutée à votre équipe chez ${entreprise}.</p><p style="margin-bottom: 1rem;">Mon parcours m'a permis de développer des compétences solides qui correspondent parfaitement aux exigences de ce poste.</p><p style="margin-bottom: 1rem;">Je me tiens à votre disposition pour un entretien afin de vous présenter plus en détail mon parcours et ma motivation.</p><p>Cordialement,<br/>${profile.name || "Votre Nom"}</p></div>`,
    };

    const existing = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    localStorage.setItem("jobcraft_applications", JSON.stringify([newApp, ...existing]));

    setLoading(false);
    setGenerated(true);
    toast.success("Documents générés avec succès ✨");
  };

  const handleExportPdf = async (type: 'cv' | 'lettre') => {
    const el = type === 'cv' ? cvRef.current : lettreRef.current;
    if (!el) return;
    const filename = generateFilename(
      type === 'cv' ? 'CV' : 'Lettre',
      posteName || 'Candidature',
      entrepriseName
    );
    toast.info("Génération du PDF...");
    await exportToPDF(el, filename);
    toast.success("PDF téléchargé ✓");
  };

  const handleSave = () => {
    toast.success("Candidature enregistrée ✓");
    navigate("/dashboard");
  };

  const getAppData = () => {
    try {
      return JSON.parse(localStorage.getItem("jobcraft_applications") || "[{}]")[0] || {};
    } catch { return {}; }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-center mb-4">
            Nouvelle <span className="text-accent italic">candidature</span>
          </h1>
          <p className="text-center text-muted-foreground mb-10">Colle l'offre d'emploi et laisse l'IA créer tes documents</p>

          {!generated ? (
            <>
              <div className="bg-card/90 backdrop-blur-md rounded-[2rem] shadow-wow-sm border border-border/30 p-8 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Nom du poste (optionnel)</label>
                    <input
                      value={posteName}
                      onChange={(e) => setPosteName(e.target.value)}
                      placeholder="Ex: Développeur Full-Stack"
                      className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Entreprise (optionnel)</label>
                    <input
                      value={entrepriseName}
                      onChange={(e) => setEntrepriseName(e.target.value)}
                      placeholder="Ex: TechCorp"
                      className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <label className="block text-sm font-semibold mb-1.5">Offre d'emploi</label>
                <textarea
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  placeholder="Colle ici le texte complet de l'offre d'emploi, ou son URL (LinkedIn, Welcome to the Jungle, etc.)"
                  rows={8}
                  className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {loading ? (
                <div className="bg-accent/5 rounded-[2rem] shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-accent/20 p-12 text-center relative overflow-hidden mb-6">
                  <div className="w-full bg-background rounded-full h-2.5 mb-8 overflow-hidden border border-border/30">
                    <motion.div
                      className="h-full bg-primary rounded-full shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingSteps[loadingStep]?.pct || 0}%` }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="space-y-3 mb-8">
                    {loadingSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: i <= loadingStep ? 1 : 0.3 }}
                        className="flex items-center justify-center gap-2 text-sm"
                      >
                        <span>{step.icon}</span>
                        <span className={`font-semibold ${i === loadingStep ? 'text-primary' : i < loadingStep ? 'text-success' : 'text-muted-foreground'}`}>
                          {i < loadingStep ? '✓ ' : ''}{step.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    "94% des candidats qui adaptent leur CV décrochent plus d'entretiens"
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={handleGenerate}
                    disabled={!offerText.trim()}
                    className="btn-primary px-10 py-4 text-lg hover:shadow-wow-lg hover:-translate-y-1 transition-all"
                  >
                    ✦ Générer mes documents →
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* ATS Score */}
              <div className="bg-card/90 backdrop-blur-md rounded-[2rem] shadow-wow-sm border border-border/30 p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <AtsScore score={atsScore} size={140} keywords={atsKeywords} missing={atsMissing} />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">Score ATS excellent !</h3>
                    <p className="text-sm text-muted-foreground">
                      Ton CV correspond à {atsScore}% des critères de l'offre. Les mots-clés ATS ont été intégrés naturellement dans tes expériences et compétences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => setActiveTab("cv")}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "cv" ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"}`}
                >
                  📄 CV personnalisé
                </button>
                <button
                  onClick={() => setActiveTab("lettre")}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "lettre" ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"}`}
                >
                  ✉️ Lettre de motivation
                </button>
              </div>

              {/* Document preview */}
              <div className="bg-card rounded-[2rem] shadow-wow-lg border border-border/30 overflow-hidden mb-10">
                <div className="flex items-center gap-2 px-5 py-4 bg-muted/30 border-b border-border/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-highlight/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <div className="flex-1 mx-4">
                    <div className="bg-background rounded-full px-4 py-1 text-xs text-muted-foreground w-fit">
                      jobcraft.ai/{activeTab === 'cv' ? 'cv' : 'lettre'}-personnalise
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div
                    ref={activeTab === 'cv' ? cvRef : lettreRef}
                    className="bg-card rounded-2xl p-6 min-h-[400px]"
                    dangerouslySetInnerHTML={{
                      __html: activeTab === "cv" ? getAppData().cvHtml || "" : getAppData().lettreHtml || "",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleExportPdf(activeTab)}
                  className="btn-outline px-8 py-3.5 text-sm"
                >
                  ⬇ Télécharger en PDF
                </button>
                <button className="btn-outline px-8 py-3.5 text-sm">
                  🔄 Régénérer
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
