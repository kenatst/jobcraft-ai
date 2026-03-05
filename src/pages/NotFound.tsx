import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-16 px-6 flex flex-col items-center justify-center min-h-[80vh] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          {/* Animated astronaut */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-[120px] mb-6 select-none"
          >
            🧑‍🚀
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-extrabold font-display text-primary/20 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display mb-4">
            Page <span className="text-accent italic">introuvable</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            On dirait que cette page a été aspirée dans un trou noir. Pas de panique, ton Dashboard t'attend.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-outline px-8 py-3.5 text-sm"
            >
              ← Retour à l'accueil
            </Link>
            <Link
              to="/dashboard"
              className="btn-primary px-8 py-3.5 text-sm"
            >
              Aller au Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
