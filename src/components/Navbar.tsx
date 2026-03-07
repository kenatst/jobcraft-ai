import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, Settings, LayoutDashboard, FilePlus, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const credits = 12;

  const appLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/nouvelle-candidature", label: "Nouvelle candidature", icon: FilePlus },
    { to: "/profil", label: "Profil", icon: User },
    { to: "/settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-[700px]">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-[50px] bg-card/80 backdrop-blur-xl shadow-navbar border border-border/50">
        <Link to={isLanding ? "/" : "/dashboard"} className="flex items-center gap-2 px-2 font-display font-extrabold text-lg text-foreground shrink-0 tracking-tight">
          <span className="text-primary">✦</span>
          <span className="hidden sm:inline">JobCraft AI</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {isLanding ? (
            <>
              <a href="#fonctionnalites" className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50">
                Fonctionnalités
              </a>
              <a href="#tarifs" className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50">
                Tarifs
              </a>
            </>
          ) : (
            <>
              {appLinks.slice(0, 2).map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-sm font-semibold transition-colors rounded-full flex items-center gap-1.5 ${
                    isActive(link.to)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <link.icon size={14} />
                  {link.label}
                </Link>
              ))}
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

          {!isLanding && (
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/profil"
                className={`p-2 rounded-full transition-colors ${isActive("/profil") ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
                aria-label="Profil"
              >
                <User size={18} />
              </Link>
              <Link
                to="/settings"
                className={`p-2 rounded-full transition-colors ${isActive("/settings") ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
                aria-label="Paramètres"
              >
                <Settings size={18} />
              </Link>
            </div>
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 bg-card rounded-3xl shadow-wow border border-border/50 p-4 space-y-1 absolute w-full"
          >
            {isLanding ? (
              <>
                <a href="#fonctionnalites" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-bold rounded-xl hover:bg-muted transition-colors">Fonctionnalités</a>
                <a href="#tarifs" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-bold rounded-xl hover:bg-muted transition-colors">Tarifs</a>
              </>
            ) : (
              <>
                {appLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                      isActive(link.to) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  >
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;