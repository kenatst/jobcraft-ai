import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const testimonials = [
  { name: "S", role: "Développeuse fullstack", quote: "J'ai décroché 3 entretiens en une semaine grâce aux CV adaptés automatiquement.", bg: "card-pastel-pink", result: "Entretien décroché" },
  { name: "M", role: "Chef de projet marketing", quote: "La lettre de motivation était si personnalisée que le recruteur m'a félicité dessus.", bg: "card-pastel-blue", result: "Entretien décroché" },
  { name: "A", role: "Data analyst junior", quote: "La préparation entretien m'a permis de répondre à toutes les questions sans stress.", bg: "card-pastel-lavender", result: "Entretien décroché" },
];

const features = [
  { emoji: "📄", title: "Sniper CV", desc: "Ton CV réécrit mot pour mot pour coller à l'offre et passer les filtres ATS.", bg: "card-pastel-pink" },
  { emoji: "✉️", title: "Lettre Parfaite", desc: "Une lettre de motivation personnalisée, ton de l'entreprise inclus.", bg: "card-pastel-blue" },
  { emoji: "🎯", title: "Prépare ton Entretien", desc: "Questions probables, pièges, ce qu'il faut dire et éviter.", bg: "card-pastel-lavender" },
];

const pricing = [
  { name: "Gratuit", price: "0€", period: "", features: ["3 générations", "Templates de base", "Aperçu en ligne"], cta: "Commencer", popular: false },
  { name: "Starter", price: "9€", period: "/mois", features: ["15 candidatures/mois", "PDF illimités", "Suivi candidatures", "3 templates CV"], cta: "Choisir Starter", popular: false },
  { name: "Pro", price: "19€", period: "/mois", features: ["Candidatures illimitées", "Préparation entretien", "4 templates CV", "Support prioritaire"], cta: "Choisir Pro", popular: true },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Floating background icons */}
      <div className="floating-icon top-32 left-[10%] text-6xl animate-float">📄</div>
      <div className="floating-icon top-60 right-[12%] text-5xl animate-float" style={{ animationDelay: "2s" }}>🎯</div>
      <div className="floating-icon top-[500px] left-[5%] text-4xl animate-float" style={{ animationDelay: "4s" }}>⚡</div>
      <div className="floating-icon top-[400px] right-[8%] text-5xl animate-float" style={{ animationDelay: "1s" }}>⭐</div>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial="hidden" animate="visible"
          >
            {["✦ CV adapté en 30 secondes", "✦ Lettre de motivation sur mesure", "✦ Préparation entretien IA"].map((badge, i) => (
              <motion.span key={i} custom={i} variants={fadeUp} className="pill-badge text-foreground/80">
                {badge}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="hero-title mb-6"
          >
            Décroche le job<br />
            <span className="text-accent-violet italic">que tu mérites</span>
          </motion.h1>

          <motion.p
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Colle une offre d'emploi. JobCraft réécrit ton CV, génère ta lettre de motivation et te prépare à l'entretien. En 30 secondes.
          </motion.p>

          <motion.div
            custom={5} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link
              to="/onboarding"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
            >
              ✦ Essayer gratuitement →
            </Link>
            <a
              href="#demo"
              className="px-8 py-4 rounded-full border-2 border-foreground/20 text-foreground font-bold text-lg hover:border-primary hover:text-primary transition-colors"
            >
              Voir une démo
            </a>
          </motion.div>

          <motion.p custom={6} variants={fadeUp} initial="hidden" animate="visible" className="text-sm text-muted-foreground">
            3 essais gratuits · Sans carte bancaire · PDF téléchargeable
          </motion.p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-14"
          >
            Ils ont <span className="text-accent-violet italic">décroché</span> leur job
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`${t.bg} rounded-3xl p-8 flex flex-col gap-4`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-foreground/10 flex items-center justify-center font-bold text-lg">{t.name}</div>
                  <span className="text-sm font-medium text-muted-foreground">{t.role}</span>
                </div>
                <p className="text-foreground/80 leading-relaxed">"{t.quote}"</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full w-fit">
                  ✓ {t.result}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalites" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-14"
          >
            Tout ce qu'il faut pour <span className="text-accent-violet italic">réussir</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`${f.bg} rounded-3xl p-8`}
              >
                <span className="text-4xl mb-4 block">{f.emoji}</span>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-14"
          >
            Un aperçu de la <span className="text-accent-violet italic">magie</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card rounded-3xl shadow-card overflow-hidden"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 bg-muted/50 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-full px-4 py-1 text-xs text-muted-foreground w-fit">jobcraft.ai/documents</div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex border-b border-border/50">
              <button className="px-6 py-3 text-sm font-semibold border-b-2 border-primary text-primary">CV</button>
              <button className="px-6 py-3 text-sm font-medium text-muted-foreground">Lettre de motivation</button>
              <button className="px-6 py-3 text-sm font-medium text-muted-foreground">Fiche entretien</button>
            </div>
            {/* Content */}
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">SC</div>
                <div>
                  <h3 className="text-xl font-bold">Sophie Carpentier</h3>
                  <p className="text-muted-foreground text-sm">Développeuse Full-Stack · 5 ans d'expérience</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-muted rounded-full w-full" />
                <div className="h-3 bg-muted rounded-full w-5/6" />
                <div className="h-3 bg-muted rounded-full w-4/5" />
                <div className="h-3 bg-primary/20 rounded-full w-3/4" />
                <div className="h-3 bg-muted rounded-full w-full" />
                <div className="h-3 bg-muted rounded-full w-2/3" />
              </div>
              <div className="flex gap-3 pt-4">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">React</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">TypeScript</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">Node.js</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">+92% ATS match</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-14"
          >
            Des prix <span className="text-accent-violet italic">simples</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`relative bg-card rounded-3xl p-8 shadow-card ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase">
                    Populaire
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground"
                      : "border-2 border-foreground/15 text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-foreground rounded-3xl p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-card mb-4">
            Prêt à décrocher<br />
            <span className="text-highlight italic">ton prochain job ?</span>
          </h2>
          <p className="text-card/60 mb-8 max-w-lg mx-auto">
            Rejoins des milliers de candidats qui utilisent déjà JobCraft AI pour booster leurs candidatures.
          </p>
          <Link
            to="/onboarding"
            className="inline-block px-8 py-4 rounded-full border-2 border-card/30 text-card font-bold text-lg hover:bg-card/10 transition-colors"
          >
            Commence maintenant →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
