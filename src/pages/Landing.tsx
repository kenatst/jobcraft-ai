import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundIcons from "@/components/BackgroundIcons";

const testimonials = [
  {
    initial: "S",
    name: "Sophie Martin",
    role: "Développeuse Full-Stack",
    quote: "En une semaine, j'ai décroché 3 entretiens. Le CV généré par JobCraft était tellement bien adapté que les recruteurs pensaient que j'avais passé des heures dessus. Le gain de temps est incroyable.",
    bg: "#FEF2F2",
    avatarBg: "#FECACA",
  },
  {
    initial: "M",
    name: "Marc Leblanc",
    role: "Chef de Projet Marketing",
    quote: "La lettre de motivation était si personnalisée que le DRH m'a félicité dessus en entretien. Il m'a dit qu'il voyait rarement des candidatures aussi bien ciblées. J'ai eu le poste en 2 semaines.",
    bg: "#EFF6FF",
    avatarBg: "#BFDBFE",
  },
  {
    initial: "A",
    name: "Amira Benali",
    role: "Data Analyst Junior",
    quote: "La fiche de préparation entretien m'a sauvée. Toutes les questions posées étaient dans la fiche ! J'ai pu répondre avec assurance et structurer mes réponses. Premier CDI à 24 ans, merci JobCraft.",
    bg: "#F5F3FF",
    avatarBg: "#DDD6FE",
  },
];

const demoCV = `<div style="font-family: 'Space Grotesk', system-ui; color: #1a1a1a;">
  <h2 style="font-size: 22px; font-weight: 800; margin: 0;">Thomas Durand</h2>
  <p style="color: #C85C3E; font-weight: 600; margin: 4px 0 16px;">Chef de Projet Digital · 6 ans d'expérience</p>
  <hr style="border: none; border-top: 2px solid #C85C3E; margin-bottom: 14px;" />
  <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #C85C3E; margin-bottom: 8px;">Expérience</h3>
  <p style="font-weight: 700; margin: 0;">Chef de Projet Digital — Agence Webflow Studio</p>
  <p style="color: #666; font-size: 13px; margin: 2px 0 6px;">2021 – Présent · Paris</p>
  <p style="font-size: 14px; line-height: 1.5; margin-bottom: 12px;">Pilotage de 15+ projets web (budget moyen 80K€). Coordination équipes design, dev et SEO. Mise en place de méthodologies agiles ayant réduit les délais de livraison de 30%.</p>
  <p style="font-weight: 700; margin: 0;">Chargé de Projet Digital — StartupFactory</p>
  <p style="color: #666; font-size: 13px; margin: 2px 0 6px;">2018 – 2021 · Lyon</p>
  <p style="font-size: 14px; line-height: 1.5; margin-bottom: 12px;">Gestion de la refonte e-commerce (+45% de conversion). Déploiement d'une stratégie CRM omnicanale sur Salesforce pour 50K+ contacts.</p>
  <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #C85C3E; margin: 16px 0 8px;">Compétences</h3>
  <p style="font-size: 14px;">Gestion de projet agile · Figma · Jira · Google Analytics · SEO/SEA · CRM Salesforce · Management d'équipe</p>
  <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #C85C3E; margin: 16px 0 8px;">Formation</h3>
  <p style="font-size: 14px;">Master Marketing Digital — IAE Lyon (2018)</p>
</div>`;

const demoLettre = `<div style="font-family: 'Space Grotesk', system-ui; color: #1a1a1a; line-height: 1.7;">
  <p style="text-align: right; color: #666; margin-bottom: 24px;">Paris, le 5 mars 2026</p>
  <p style="margin-bottom: 12px;">Madame, Monsieur,</p>
  <p style="margin-bottom: 12px;">Votre recherche d'un Chef de Projet Digital capable de porter des projets ambitieux dans un environnement innovant a immédiatement résonné avec mon parcours. Après 6 ans à transformer des visions business en expériences digitales concrètes, je suis convaincu de pouvoir accélérer vos objectifs de croissance.</p>
  <p style="margin-bottom: 12px;">Chez Webflow Studio, j'ai piloté plus de 15 projets web avec un taux de satisfaction client de 96%. Ma capacité à fédérer des équipes pluridisciplinaires — designers, développeurs, data analysts — autour d'objectifs communs a permis de réduire nos délais de livraison de 30% tout en augmentant la qualité des livrables.</p>
  <p style="margin-bottom: 12px;">Ce qui me motive dans votre entreprise, c'est votre approche centrée sur l'impact utilisateur. Mon expérience en méthodologies agiles et en stratégie CRM omnicanale s'inscrit parfaitement dans cette philosophie.</p>
  <p style="margin-bottom: 12px;">Je serais ravi d'échanger avec vous sur la manière dont mon expertise peut contribuer à vos projets. Disponible pour un entretien à votre convenance.</p>
  <p>Cordialement,<br/>Thomas Durand</p>
</div>`;

const demoEntretien = `<div style="font-family: 'Space Grotesk', system-ui; color: #1a1a1a;">
  <h3 style="color: #C85C3E; font-size: 15px; font-weight: 700; margin-bottom: 12px;">❓ Questions probables</h3>
  <div style="margin-bottom: 16px; padding: 12px; background: #F5F3FF; border-radius: 12px;">
    <p style="font-weight: 700; margin: 0 0 6px;">Comment gérez-vous un projet qui prend du retard ?</p>
    <p style="font-size: 14px; color: #444; margin: 0;"><strong>Réponse suggérée :</strong> "Je commence par identifier la cause racine du retard via un stand-up d'urgence. Chez Webflow Studio, un projet e-commerce avait 3 semaines de retard — j'ai repriorisé les features avec le client, découpé le MVP et livré la V1 dans les temps."</p>
  </div>
  <div style="margin-bottom: 16px; padding: 12px; background: #EFF6FF; border-radius: 12px;">
    <p style="font-weight: 700; margin: 0 0 6px;">Décrivez votre méthodologie de gestion de projet.</p>
    <p style="font-size: 14px; color: #444; margin: 0;"><strong>Réponse suggérée :</strong> "J'utilise une approche hybride Agile/Kanban adaptée à chaque projet. Pour les projets courts, des sprints de 1 semaine. Pour les projets longs, des itérations de 2 semaines avec des reviews clients systématiques."</p>
  </div>
  <h3 style="color: #C85C3E; font-size: 15px; font-weight: 700; margin: 20px 0 12px;">⚠️ Question piège</h3>
  <div style="padding: 12px; background: #FEF2F2; border-radius: 12px;">
    <p style="font-weight: 700; margin: 0 0 6px;">Pourquoi quittez-vous votre poste actuel ?</p>
    <p style="font-size: 14px; color: #444; margin: 0;"><strong>Stratégie :</strong> Ne jamais critiquer l'employeur actuel. Orientez vers la recherche de nouveaux défis et la correspondance avec les valeurs de l'entreprise cible.</p>
  </div>
</div>`;

const Landing = () => {
  const [demoTab, setDemoTab] = useState<"cv" | "lettre" | "entretien">("cv");

  const demoContent = { cv: demoCV, lettre: demoLettre, entretien: demoEntretien };

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["✦ CV adapté en 30 secondes", "✦ Lettre sur mesure", "✦ Coaching entretien IA"].map((badge, i) => (
              <span key={i} className="pill-badge text-foreground/80">{badge}</span>
            ))}
          </div>

          <h1 className="hero-title mb-6">
            Décroche le job<br />
            <span className="text-accent-violet italic">que tu mérites</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-[560px] mx-auto mb-10 leading-relaxed">
            Colle une offre d'emploi. JobCraft réécrit ton CV, génère ta lettre de motivation et te prépare à l'entretien. En 30 secondes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/onboarding" className="btn-primary text-lg !px-8 !py-4">
              ✦ Essayer gratuitement →
            </Link>
            <a href="#demo" className="btn-outline text-lg !px-8 !py-4">
              Voir une démo
            </a>
          </div>

          <p className="text-sm text-muted-foreground mb-14">
            3 essais gratuits · Sans carte bancaire · PDF téléchargeable
          </p>

          {/* Hero browser mockup */}
          <div className="browser-mockup max-w-3xl mx-auto">
            <div className="browser-mockup-chrome">
              <div className="browser-dot bg-destructive/60" />
              <div className="browser-dot bg-highlight/60" />
              <div className="browser-dot bg-success/60" />
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-full px-4 py-1 text-xs text-muted-foreground w-fit">jobcraft.ai/documents</div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">SM</div>
                <div className="text-left">
                  <h3 className="text-lg font-extrabold">Sophie Martin</h3>
                  <p className="text-muted-foreground text-sm">Développeuse Full-Stack · 5 ans d'expérience</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="pill-badge text-primary font-bold text-xs">92% ATS match</span>
                </div>
              </div>
              <div className="text-left space-y-3 text-sm">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-primary font-bold mb-1 border-b-2 border-primary pb-1 w-fit">Expérience</h4>
                  <p className="font-bold mt-2">Lead Frontend Developer — TechCorp</p>
                  <p className="text-muted-foreground text-xs">2022 – Présent · Paris</p>
                  <p className="text-foreground/80 text-sm mt-1">Architecture React/TypeScript pour 3 produits SaaS (200K+ utilisateurs). Migration vers Next.js 14 avec réduction de 40% du temps de chargement.</p>
                </div>
                <div className="flex gap-2 flex-wrap pt-2">
                  {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"].map(s => (
                    <span key={s} className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-12 px-6 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-card p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "12 847", label: "utilisateurs actifs" },
              { value: "94%", label: "taux de succès entretiens" },
              { value: "30 sec", label: "temps de génération" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 px-6 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title mb-14">
            Ils ont <span className="text-accent-violet italic">décroché</span> leur job
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-3xl p-8 flex flex-col gap-4" style={{ background: t.bg }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: t.avatarBg }}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm flex-1">"{t.quote}"</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success bg-success/10 px-3 py-1 rounded-full w-fit">
                  ✓ Entretien décroché
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="fonctionnalites" className="py-20 px-6 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title mb-14">
            Tout ce qu'il <span className="text-accent-violet italic">faut</span> pour réussir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="rounded-3xl p-8" style={{ background: "#FFF7ED" }}>
              <span className="text-4xl mb-4 block">📄</span>
              <h3 className="text-xl font-bold mb-2">Sniper CV</h3>
              <p className="text-foreground/70 leading-relaxed text-sm mb-4">
                Ton CV est réécrit mot pour mot pour coller parfaitement à chaque offre d'emploi. L'IA analyse les mots-clés ATS, restructure tes expériences et met en avant les compétences demandées. Résultat : un CV qui passe les filtres automatiques des recruteurs.
              </p>
              <span className="pill-badge text-primary text-xs font-semibold">Passe les filtres ATS</span>
            </div>
            <div className="rounded-3xl p-8" style={{ background: "#F0FDF4" }}>
              <span className="text-4xl mb-4 block">✉️</span>
              <h3 className="text-xl font-bold mb-2">Lettre Parfaite</h3>
              <p className="text-foreground/70 leading-relaxed text-sm mb-4">
                Une lettre de motivation unique pour chaque candidature. L'IA s'adapte au ton de l'entreprise — startup décontractée ou grand groupe corporate — et construit un argumentaire percutant basé sur ton profil et les exigences du poste.
              </p>
              <span className="pill-badge text-success text-xs font-semibold">Ton adapté à l'entreprise</span>
            </div>
            <div className="rounded-3xl p-8" style={{ background: "#FAF5FF" }}>
              <span className="text-4xl mb-4 block">🎯</span>
              <h3 className="text-xl font-bold mb-2">Coach Entretien</h3>
              <p className="text-foreground/70 leading-relaxed text-sm mb-4">
                Une fiche de préparation complète en 5 sections : compétences recherchées, questions probables avec réponses, questions pièges avec stratégies, tes arguments clés, et les erreurs à éviter. Tout est personnalisé pour TON profil et CE poste.
              </p>
              <span className="pill-badge text-accent text-xs font-semibold">5 sections complètes</span>
            </div>
          </div>
          {/* Bonus card */}
          <div className="rounded-3xl p-8" style={{ background: "#FFFBEB" }}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <span className="text-4xl mb-4 block">📊</span>
                <h3 className="text-xl font-bold mb-2">Score ATS en temps réel</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  Après chaque génération, JobCraft calcule un score de correspondance entre ton CV et l'offre d'emploi. Tu vois exactement quels mots-clés ont été détectés, lesquels manquent, et tu reçois des recommandations pour améliorer ton score. L'objectif : dépasser 85% pour maximiser tes chances.
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                    strokeDasharray={`${0.87 * 251.3} ${251.3}`}
                    strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
                    className="fill-primary font-extrabold" style={{ fontSize: "22px" }}>87%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEMO ═══ */}
      <section id="demo" className="py-20 px-6 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-14">
            Un aperçu de la <span className="text-accent-violet italic">magie</span>
          </h2>
          <div className="browser-mockup">
            <div className="browser-mockup-chrome">
              <div className="browser-dot bg-destructive/60" />
              <div className="browser-dot bg-highlight/60" />
              <div className="browser-dot bg-success/60" />
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-full px-4 py-1 text-xs text-muted-foreground w-fit">jobcraft.ai/demo</div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex border-b border-border/50">
              {([
                { key: "cv", label: "CV" },
                { key: "lettre", label: "Lettre de motivation" },
                { key: "entretien", label: "Fiche entretien" },
              ] as const).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setDemoTab(tab.key)}
                  className={`px-6 py-3 text-sm font-semibold transition-colors ${
                    demoTab === tab.key
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8 min-h-[300px]" dangerouslySetInnerHTML={{ __html: demoContent[demoTab] }} />
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="tarifs" className="py-20 px-6 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title mb-14">
            Des prix <span className="text-accent-violet italic">simples</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Gratuit */}
            <div className="bg-card rounded-3xl p-8 shadow-card flex flex-col">
              <span className="pill-badge text-xs font-semibold mb-4 w-fit">Pour commencer</span>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">0€</span>
                <span className="text-muted-foreground ml-1">pour toujours</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> 3 générations complètes</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Templates de base</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Aperçu en ligne</li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground line-through"><span>✗</span> Téléchargement PDF</li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground line-through"><span>✗</span> Suivi candidatures</li>
              </ul>
              <Link to="/onboarding" className="btn-outline w-full text-center">Commencer gratuitement</Link>
            </div>

            {/* Starter */}
            <div className="bg-card rounded-3xl p-8 shadow-card border-2 border-primary flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                Le plus populaire
              </span>
              <div className="mb-1 mt-2" />
              <div className="mb-6">
                <span className="text-5xl font-extrabold">9€</span>
                <span className="text-muted-foreground ml-1">/mois</span>
                <p className="text-xs text-muted-foreground mt-1">Annulez à tout moment</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> 15 générations/mois</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> PDF illimités</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Suivi candidatures</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Support email</li>
              </ul>
              <Link to="/onboarding" className="btn-primary w-full text-center">Commencer avec Starter</Link>
            </div>

            {/* Pro */}
            <div className="rounded-3xl p-8 shadow-card flex flex-col bg-foreground text-card">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-highlight text-highlight-foreground w-fit mb-4">
                Tout inclus
              </span>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">19€</span>
                <span className="text-card/60 ml-1">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-highlight font-bold">✓</span> Générations illimitées</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-highlight font-bold">✓</span> 4 templates CV premium</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-highlight font-bold">✓</span> Coach entretien IA complet</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-highlight font-bold">✓</span> Support prioritaire</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-highlight font-bold">✓</span> Export multi-formats</li>
              </ul>
              <Link to="/onboarding" className="inline-flex items-center justify-center w-full px-7 py-3.5 rounded-full font-bold text-sm bg-highlight text-highlight-foreground transition-all hover:brightness-110">
                Passer Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 px-6 z-10 relative">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[30px] p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-card mb-2" style={{ lineHeight: 1.1 }}>
            Prêt à décrocher
          </h2>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6" style={{ lineHeight: 1.1 }}>
            <span className="text-highlight italic">ton prochain job ?</span>
          </h2>
          <p className="text-card/50 mb-8 max-w-lg mx-auto">
            Rejoins 12 847 candidats qui utilisent JobCraft AI
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-card/30 text-card font-bold text-lg hover:bg-card/10 transition-colors"
          >
            Commence maintenant →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
