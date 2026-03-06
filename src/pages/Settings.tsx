import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";
import TemplateSelector from "@/components/TemplateSelector";

const Settings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "", targetRole: "", email: "", phone: "", city: "",
    experience: "", skills: "", education: "", linkedin: "", portfolio: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("jobcraft_profile");
    if (saved) setProfile(JSON.parse(saved));
    const tmpl = localStorage.getItem("jobcraft_template");
    if (tmpl) setSelectedTemplate(Number(tmpl));
  }, []);

  const saveProfile = () => {
    localStorage.setItem("jobcraft_profile", JSON.stringify(profile));
    toast.success("Profil sauvegardé ✓");
  };

  const saveTemplate = () => {
    localStorage.setItem("jobcraft_template", String(selectedTemplate));
    toast.success("Template mis à jour ✓");
  };

  const clearAllData = () => {
    if (window.confirm("⚠️ Supprimer toutes les données ? Cette action est irréversible.")) {
      localStorage.removeItem("jobcraft_profile");
      localStorage.removeItem("jobcraft_template");
      localStorage.removeItem("jobcraft_applications");
      toast.success("Données supprimées");
      navigate("/");
    }
  };

  const profileFields = [
    { key: "name", label: "Nom complet", placeholder: "Sophie Carpentier" },
    { key: "targetRole", label: "Poste visé", placeholder: "Développeuse Full-Stack" },
    { key: "email", label: "Email", placeholder: "sophie@email.com" },
    { key: "phone", label: "Téléphone", placeholder: "+33 6 12 34 56 78" },
    { key: "city", label: "Ville", placeholder: "Paris, France" },
    { key: "experience", label: "Expériences clés", placeholder: "3 ans chez Acme Corp...", textarea: true },
    { key: "skills", label: "Compétences", placeholder: "React, TypeScript, Node.js..." },
    { key: "education", label: "Formation", placeholder: "Master Informatique", textarea: true },
    { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/sophie" },
    { key: "portfolio", label: "Portfolio / GitHub", placeholder: "github.com/sophie-dev" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">← Retour au dashboard</Link>

          <h1 className="text-3xl md:text-5xl font-extrabold font-display mb-4">
            Para<span className="text-accent italic">mètres</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-12">Gère ton profil, template et préférences</p>

          {/* Profile */}
          <SectionCard title="👤 Mon profil" desc="Ces informations sont utilisées pour personnaliser tes CV et lettres.">
            <div className="space-y-4">
              {profileFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold mb-1.5">{field.label}</label>
                  {field.textarea ? (
                    <textarea
                      value={(profile as Record<string, string>)[field.key] || ""}
                      onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  ) : (
                    <input
                      value={(profile as Record<string, string>)[field.key] || ""}
                      onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  )}
                </div>
              ))}
            </div>
            <button onClick={saveProfile} className="btn-primary text-sm mt-6">Sauvegarder le profil</button>
          </SectionCard>

          {/* Template */}
          <SectionCard title="🎨 Template CV" desc="Choisis parmi 100 templates. Double-clique pour prévisualiser.">
            <TemplateSelector
              selected={selectedTemplate}
              onSelect={setSelectedTemplate}
              compact
            />
            <button onClick={saveTemplate} className="btn-primary text-sm mt-6">Appliquer ce template</button>
          </SectionCard>

          {/* Subscription */}
          <SectionCard title="💳 Mon abonnement" desc="Gérez votre plan actuel.">
            <div className="flex items-center gap-4">
              <span className="pill-badge text-primary font-bold">Plan Gratuit</span>
              <p className="text-sm text-muted-foreground">3 générations / mois</p>
            </div>
            <button className="btn-outline text-sm mt-4">Gérer mon abonnement</button>
          </SectionCard>

          {/* Danger Zone */}
          <div className="bg-destructive/5 border-2 border-destructive/20 rounded-[2rem] p-8 mt-8">
            <h2 className="text-xl font-extrabold font-display text-destructive mb-2">🚨 Zone de danger</h2>
            <p className="text-sm text-destructive/70 mb-6">Supprimer toutes tes données. Cette action est irréversible.</p>
            <button onClick={clearAllData} className="px-6 py-3 rounded-full bg-destructive text-destructive-foreground font-bold text-sm hover:brightness-90 transition-all">
              Supprimer toutes mes données
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => (
  <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border border-border/30 p-8 mb-8">
    <h2 className="text-xl font-extrabold font-display mb-1">{title}</h2>
    <p className="text-sm text-muted-foreground mb-6">{desc}</p>
    {children}
  </div>
);

export default Settings;
