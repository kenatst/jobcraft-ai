import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 py-16">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="text-primary">✦</span> JobCraft AI
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              L'IA qui décroche tes entretiens. CV, lettres de motivation et préparation sur mesure.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Produit</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">Sniper CV</Link></li>
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">Lettre Parfaite</Link></li>
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">Prépa Entretien</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Ressources</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Légal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">CGU</Link></li>
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link to="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Fait avec ❤️ en France · © {new Date().getFullYear()} JobCraft AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
