import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";
import { exportToPDF, generateFilename } from "@/lib/exportPdf";

const mockInterview = {
  ce_quils_cherchent: [
    { competence: "Maîtrise de React et TypeScript", explication: "Le poste nécessite une expérience solide en développement frontend moderne.", comment_valoriser: "Parlez de vos projets React concrets avec métriques (utilisateurs, performance)." },
    { competence: "Expérience en architecture logicielle", explication: "Capacité à concevoir des systèmes scalables et maintenables.", comment_valoriser: "Décrivez les choix d'architecture que vous avez faits et leur impact." },
    { competence: "Travail en équipe agile", explication: "Habitude des sprints, stand-ups et collaboration avec les product managers.", comment_valoriser: "Donnez un exemple concret de sprint réussi ou d'amélioration de process." },
    { competence: "Communication claire", explication: "Être capable d'expliquer des concepts techniques à des non-techniques.", comment_valoriser: "Racontez quand vous avez vulgarisé un sujet technique pour un client/manager." },
    { competence: "Autonomie et proactivité", explication: "Prendre des initiatives et résoudre des problèmes sans supervision constante.", comment_valoriser: "Citez une initiative personnelle qui a créé de la valeur pour l'équipe." },
  ],
  questions_probables: [
    { question: "Parlez-moi de votre parcours professionnel", reponse_suggeree: "Structurez en 3 temps : formation, expériences clés, pourquoi ce poste. Montrez la cohérence de votre parcours.", difficulte: "facile" as const },
    { question: "Pourquoi voulez-vous rejoindre notre entreprise ?", reponse_suggeree: "Montrez que vous connaissez leur produit/mission et liez à vos aspirations professionnelles.", difficulte: "facile" as const },
    { question: "Décrivez un projet dont vous êtes fier", reponse_suggeree: "Utilisez la méthode STAR : Situation, Tâche, Action, Résultat avec des chiffres concrets.", difficulte: "moyen" as const },
    { question: "Comment gérez-vous les conflits en équipe ?", reponse_suggeree: "Exemple concret de résolution constructive. Montrez empathie + pragmatisme.", difficulte: "moyen" as const },
    { question: "Où vous voyez-vous dans 3 ans ?", reponse_suggeree: "Montrez de l'ambition alignée avec les perspectives du poste sans paraître opportuniste.", difficulte: "moyen" as const },
    { question: "Quelle est votre plus grande faiblesse ?", reponse_suggeree: "Choisissez une vraie faiblesse, montrez comment vous travaillez dessus avec un exemple récent.", difficulte: "difficile" as const },
    { question: "Comment restez-vous à jour techniquement ?", reponse_suggeree: "Veille active, conférences, projets perso, communautés. Soyez spécifique.", difficulte: "facile" as const },
    { question: "Avez-vous des questions pour nous ?", reponse_suggeree: "Préparez 2-3 questions sur l'équipe, les défis techniques, la vision produit. Montrez votre intérêt.", difficulte: "facile" as const },
  ],
  questions_pieges: [
    { question: "Pourquoi avez-vous quitté votre dernier poste ?", le_piege: "Ils testent votre loyauté et votre capacité à rester positif.", strategie_reponse: "Parlez d'envie de nouveaux défis et de progression. Ne critiquez jamais l'ancien employeur." },
    { question: "Quelle est votre prétention salariale ?", le_piege: "Donner un chiffre trop bas ou trop haut peut vous éliminer.", strategie_reponse: "Donnez une fourchette basée sur le marché. Retournez la question : 'Quel est le budget prévu pour ce poste ?'" },
    { question: "Un collègue ne fait pas son travail, que faites-vous ?", le_piege: "Ils testent votre leadership et votre diplomatie.", strategie_reponse: "Communication directe d'abord, puis escalade si nécessaire. Montrez de l'empathie et du pragmatisme." },
    { question: "Êtes-vous prêt à faire des heures supplémentaires ?", le_piege: "Refuser paraît peu engagé, mais accepter sans limite est naïf.", strategie_reponse: "Flexibilité oui, mais posez vos limites professionnellement. 'En période de rush, je m'adapte, mais je privilégie l'efficacité au quotidien.'" },
  ],
  arguments_cles: [
    { argument: "Expérience directe avec les technologies du poste", pourquoi_pertinent: "Vous réduisez le temps de ramp-up et apportez de la valeur immédiatement." },
    { argument: "Capacité prouvée à livrer dans les délais", pourquoi_pertinent: "C'est ce qui distingue un bon candidat : la fiabilité et les résultats concrets." },
    { argument: "Passion pour l'apprentissage continu", pourquoi_pertinent: "Dans un secteur en évolution rapide, l'adaptabilité est la compétence #1." },
  ],
  a_ne_pas_dire: [
    { erreur: "Critiquer vos anciens employeurs ou collègues", dire_plutot: "Parlez de ce que vous avez appris de chaque expérience, même difficile." },
    { erreur: "Dire que vous postulez partout ou que c'est un plan B", dire_plutot: "Expliquez pourquoi CETTE entreprise et CE poste vous attirent spécifiquement." },
    { erreur: "Demander le salaire ou les avantages dès le premier entretien", dire_plutot: "Concentrez-vous sur votre valeur ajoutée. Les négociations viendront après." },
  ],
};

const difficultyBadge = {
  facile: 'bg-green-100 text-green-700',
  moyen: 'bg-amber-100 text-amber-700',
  difficile: 'bg-red-100 text-red-700',
};

interface ApplicationData {
  id: string;
  poste?: string;
  entreprise?: string;
}

const InterviewPrep = () => {
  const { id } = useParams();
  const [app, setApp] = useState<ApplicationData | null>(null);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const found = apps.find((a: ApplicationData) => a.id === id);
    if (found) setApp(found);
  }, [id]);

  const handleExportPdf = async () => {
    if (!contentRef.current) return;
    toast.info("Génération du PDF...");
    await exportToPDF(contentRef.current, generateFilename('Fiche_Entretien', app?.poste || 'Entretien'));
    toast.success("PDF téléchargé ✓");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to={app ? `/candidature/${app.id}` : "/dashboard"} className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">← Retour</Link>

          <h1 className="text-3xl md:text-5xl font-extrabold font-display mb-2">
            Coach <span className="text-accent italic">entretien</span>
          </h1>
          <p className="text-muted-foreground mb-10 text-lg">{app ? `${app.poste} — ${app.entreprise}` : "Fiche de préparation"}</p>

          <div ref={contentRef}>
            {/* Section 1 */}
            <Section title="🔍 Ce qu'ils vont chercher" bg="bg-green-50/50">
              <div className="space-y-4">
                {mockInterview.ce_quils_cherchent.map((item, i) => (
                  <div key={i} className="flex gap-3 bg-card rounded-xl p-4 border border-border/20">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold h-fit shrink-0">{item.competence}</span>
                    <div>
                      <p className="text-sm text-foreground/80 mb-1">{item.explication}</p>
                      <p className="text-xs text-success font-medium">💡 {item.comment_valoriser}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Section 2 */}
            <Section title="❓ Questions probables">
              <div className="space-y-3">
                {mockInterview.questions_probables.map((item, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border/20 overflow-hidden">
                    <button
                      onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 transition-colors"
                    >
                      <span className="font-bold text-sm pr-3">Q{i + 1}. {item.question}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${difficultyBadge[item.difficulte]}`}>{item.difficulte}</span>
                        <motion.span animate={{ rotate: expandedQ === i ? 45 : 0 }} className="text-primary font-bold">+</motion.span>
                      </div>
                    </button>
                    {expandedQ === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4">
                        <div className="p-3 bg-accent/5 border border-accent/10 rounded-lg">
                          <p className="text-sm">💡 <span className="font-semibold text-accent">Réponse suggérée :</span> {item.reponse_suggeree}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            {/* Section 3 */}
            <Section title="⚠️ Questions pièges" bg="bg-red-50/30">
              <div className="space-y-4">
                {mockInterview.questions_pieges.map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-5 border border-red-100">
                    <p className="font-bold mb-2">🚩 {item.question}</p>
                    <p className="text-xs text-destructive/70 mb-2"><strong>Le piège :</strong> {item.le_piege}</p>
                    <p className="text-sm text-success">✓ <strong>Stratégie :</strong> {item.strategie_reponse}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Section 4 */}
            <Section title="💪 Tes arguments clés">
              <div className="space-y-3">
                {mockInterview.arguments_cles.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-100">
                    <span className="text-lg">⭐</span>
                    <div>
                      <p className="font-bold text-sm">{item.argument}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.pourquoi_pertinent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Section 5 */}
            <Section title="🚫 À ne surtout pas dire" bg="bg-amber-50/30">
              <div className="space-y-3">
                {mockInterview.a_ne_pas_dire.map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border/20">
                    <p className="text-sm text-destructive line-through mb-2">✗ {item.erreur}</p>
                    <p className="text-sm text-success">✓ {item.dire_plutot}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </motion.div>
      </div>

      {/* Fixed PDF button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button onClick={handleExportPdf} className="btn-primary px-8 py-3.5 text-sm shadow-wow-lg">
          ⬇ Télécharger la fiche en PDF
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, children, bg }: { title: string; children: React.ReactNode; bg?: string }) => (
  <div className={`rounded-[2rem] shadow-wow-sm border border-border/30 p-8 mb-6 ${bg || 'bg-card/80'}`}>
    <h2 className="text-2xl font-extrabold font-display mb-6">{title}</h2>
    {children}
  </div>
);

export default InterviewPrep;
