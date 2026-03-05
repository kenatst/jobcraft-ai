import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const credits = 12;

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-[700px]">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-[50px] bg-card/80 backdrop-blur-xl shadow-navbar border border-border/50">
        <Link to="/" className="flex items-center gap-2 px-2 font-bold text-lg text-foreground shrink-0">
          <span className="text-primary">✦</span>
          <span className="hidden sm:inline">JobCraft AI</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {isLanding ? (
            <>
              <a href="#fonctionnalites" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Fonctionnalités
              </a>
              <a href="#tarifs" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/nouvelle-candidature" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Nouvelle candidature
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isLanding && (
            <span className="hidden sm:inline-flex pill-badge text-primary font-semibold text-xs">
              {credits} crédits
            </span>
          )}

          {isLanding ? (
            <Link to="/onboarding" className="btn-primary text-sm !py-2 !px-5">
              Commencer
            </Link>
          ) : (
            <Link to="/nouvelle-candidature" className="btn-primary text-sm !py-2 !px-5">
              + Candidature
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 bg-card rounded-3xl shadow-card border border-border/50 p-4 space-y-1">
          {isLanding ? (
            <>
              <a href="#fonctionnalites" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors">Fonctionnalités</a>
              <a href="#tarifs" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors">Tarifs</a>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors">Dashboard</Link>
              <Link to="/nouvelle-candidature" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors">Nouvelle candidature</Link>
              <Link to="/settings" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors">⚙️ Paramètres</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
