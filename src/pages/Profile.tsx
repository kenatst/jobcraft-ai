import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";

interface ProfileData {
  name: string;
  targetRole: string;
  email?: string;
  phone?: string;
  city?: string;
  experience: string;
  skills: string;
  education: string;
  linkedin?: string;
  portfolio?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [appCount, setAppCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("jobcraft_profile");
    if (saved) setProfile(JSON.parse(saved));
    const apps = JSON.parse(localStorage.getItem("jobcraft_applications") || "[]");
    setAppCount(apps.length);
  }, []);

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const skillsList = profile?.skills?.split(",").map(s => s.trim()).filter(Boolean) || [];

  if (!profile || !profile.name) {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundIcons /><Navbar />
        <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-5xl mb-4">👤</p>
            <h1 className="text-2xl font-bold mb-2">Pas encore de profil</h1>
            <p className="text-muted-foreground mb-8">Crée ton profil pour commencer</p>
            <Link to="/onboarding" className="btn-primary text-sm">Créer mon profil →</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">← Retour au dashboard</Link>

          <div className="bg-card/80 rounded-[2rem] shadow-wow-lg border border-border/30 p-10 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-3xl font-extrabold text-primary border-2 border-primary/20">
                {getInitials(profile.name)}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl font-extrabold font-display">{profile.name}</h1>
                <p className="text-lg text-muted-foreground">{profile.targetRole}</p>
                {profile.city && <p className="text-sm text-muted-foreground mt-1">📍 {profile.city}</p>}
                <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                  <span className="pill-badge text-primary font-semibold text-xs">{appCount} candidature{appCount !== 1 ? "s" : ""}</span>
                  <span className="pill-badge text-accent font-semibold text-xs">{skillsList.length} compétences</span>
                </div>
              </div>
              <Link to="/settings" className="btn-outline text-sm px-5 py-2.5 shrink-0">✏️ Modifier</Link>
            </div>
          </div>

          {skillsList.length > 0 && (
            <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border border-border/30 p-8 mb-8">
              <h2 className="text-xl font-extrabold font-display mb-5">🛠 Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {profile.experience && (
            <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border border-border/30 p-8 mb-8">
              <h2 className="text-xl font-extrabold font-display mb-5">💼 Expérience</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{profile.experience}</p>
            </div>
          )}

          {profile.education && (
            <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border border-border/30 p-8 mb-8">
              <h2 className="text-xl font-extrabold font-display mb-5">🎓 Formation</h2>
              <p className="text-foreground/80 leading-relaxed">{profile.education}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
