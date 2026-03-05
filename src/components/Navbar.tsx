import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-[50px] bg-card/80 backdrop-blur-xl shadow-navbar border border-border/50">
        <Link to="/" className="flex items-center gap-2 px-4 py-1.5 font-bold text-lg text-foreground">
          <span className="text-primary">✦</span> JobCraft AI
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {isLanding ? (
            <>
              <a href="#fonctionnalites" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full">
                Fonctionnalités
              </a>
              <a href="#tarifs" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full">
                Tarifs
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full">
                Dashboard
              </Link>
              <Link to="/nouvelle-candidature" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full">
                Nouvelle candidature
              </Link>
            </>
          )}
        </div>

        {isLanding ? (
          <Link
            to="/onboarding"
            className="ml-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Commencer
          </Link>
        ) : (
          <Link
            to="/nouvelle-candidature"
            className="ml-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + Candidature
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
