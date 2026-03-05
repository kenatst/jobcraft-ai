import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const mockInterview = {
  ce_quils_cherchent: [
    { competence: "Maîtrise de React et TypeScript", explication: "Le poste nécessite une expérience solide en développement frontend moderne." },
    { competence: "Expérience en architecture logicielle", explication: "Capacité à concevoir des systèmes scalables et maintenables." },
    { competence: "Travail en équipe agile", explication: "Habitude des sprints, stand-ups et collaboration avec les product managers." },
    { competence: "Communication claire", explication: "Être capable d'expliquer des concepts techniques à des non-techniques." },
    { competence: "Autonomie et proactivité", explication: "Prendre des initiatives et résoudre des problèmes sans supervision constante." },
  ],
  questions_probables: [
    { question: "Parlez-moi de votre parcours professionnel", reponse: "Structurez en 3 temps : formation, expériences clés, pourquoi ce poste." },
    { question: "Pourquoi voulez-vous rejoindre notre entreprise ?", reponse: "Montrez que vous connaissez leur produit/mission et liez à vos aspirations." },
    { question: "Décrivez un projet dont vous êtes fier", reponse: "Utilisez la méthode STAR : Situation, Tâche, Action, Résultat." },
    { question: "Comment gérez-vous les conflits en équipe ?", reponse: "Exemple concret de résolution constructive avec un collègue." },
    { question: "Où vous voyez-vous dans 3 ans ?", reponse: "Montrez de l'ambition alignée avec les perspectives du poste." },
    { question: "Quelle est votre plus grande faiblesse ?", reponse: "Choisissez une vraie faiblesse et montrez comment vous travaillez dessus." },
    { question: "Comment restez-vous à jour techniquement ?", reponse: "Veille, conférences, projets perso, communautés." },
    { question: "Avez-vous des questions pour nous ?", reponse: "Préparez 2-3 questions sur l'équipe, les défis techniques, la vision produit." },
  ],
  questions_pieges: [
    { question: "Pourquoi avez-vous quitté votre dernier poste ?", conseil: "Restez positif. Parlez d'envie de nouveaux défis, jamais de conflits." },
    { question: "Quelle est votre prétention salariale ?", conseil: "Donnez une fourchette basée sur le marché. Ne soyez pas le premier à donner un chiffre." },
    { question: "Un collègue ne fait pas son travail, que faites-vous ?", conseil: "Communication directe d'abord, puis escalade si nécessaire. Montrez de l'empathie." },
    { question: "Êtes-vous prêt à faire des heures supplémentaires ?", conseil: "Montrez de la flexibilité tout en posant vos limites de manière professionnelle." },
  ],
  arguments_cles: [
    "Votre expérience directe avec les technologies utilisées par l'entreprise",
    "Votre capacité prouvée à livrer des projets dans les délais",
    "Votre passion pour l'apprentissage continu et l'amélioration",
  ],
  a_ne_pas_dire: [
    "Ne critiquez jamais vos anciens employeurs ou collègues",
    "Ne dites pas que vous postulez partout ou que c'est un plan B",
    "Ne demandez pas le salaire ou les avantages dès le premier entretien",
  ],
};

const InterviewPrep = () => {
  const { id } = useParams();
  const [app, setApp] = useState<any>(null);

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    const found = apps.find((a: any) => a.id === id);
    if (found) setApp(found);
  }, [id]);

  const data = mockInterview;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to={app ? `/candidature/${app.id}` : "/dashboard"} className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">
            ← Retour
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Préparation <span className="text-accent-violet italic">entretien</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            {app ? `${app.poste} — ${app.entreprise}` : "Fiche de préparation"}
          </p>

          {/* Section 1 */}
          <Section title="🔍 Ce qu'ils vont chercher">
            <div className="space-y-4">
              {data.ce_quils_cherchent.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-primary font-bold mt-0.5">→</span>
                  <div>
                    <p className="font-semibold">{item.competence}</p>
                    <p className="text-sm text-muted-foreground">{item.explication}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2 */}
          <Section title="💬 Questions probables">
            <div className="space-y-5">
              {data.questions_probables.map((item, i) => (
                <div key={i} className="bg-background rounded-2xl p-5">
                  <p className="font-semibold mb-2">Q{i + 1}. {item.question}</p>
                  <p className="text-sm text-muted-foreground">💡 {item.reponse}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 3 */}
          <Section title="⚠️ Questions pièges">
            <div className="space-y-5">
              {data.questions_pieges.map((item, i) => (
                <div key={i} className="bg-red-50 rounded-2xl p-5 border border-red-100">
                  <p className="font-semibold mb-2">🚩 {item.question}</p>
                  <p className="text-sm text-muted-foreground">→ {item.conseil}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 4 */}
          <Section title="💪 Tes arguments clés">
            <div className="space-y-3">
              {data.arguments_cles.map((arg, i) => (
                <div key={i} className="flex items-start gap-3 bg-green-50 rounded-2xl p-4 border border-green-100">
                  <span className="text-green-600 font-bold">✓</span>
                  <p className="text-sm">{arg}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 5 */}
          <Section title="🚫 À ne surtout pas dire">
            <div className="space-y-3">
              {data.a_ne_pas_dire.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-red-50 rounded-2xl p-4 border border-red-100">
                  <span className="text-red-500 font-bold">✗</span>
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <div className="text-center mt-10">
            <button className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
              ⬇ Télécharger la fiche en PDF
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-3xl shadow-card p-8 mb-6">
    <h2 className="text-xl font-bold mb-5">{title}</h2>
    {children}
  </div>
);

export default InterviewPrep;
