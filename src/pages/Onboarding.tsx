import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BackgroundIcons from "@/components/BackgroundIcons";
import TemplateSelector from "@/components/TemplateSelector";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: "", targetRole: "", email: "", phone: "", city: "",
    experience: "", skills: "", education: "", linkedin: "", portfolio: "",
  });
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [uploadMode, setUploadMode] = useState<"upload" | "manual">("manual");

  // Redirect if already onboarded
  useEffect(() => {
    const saved = localStorage.getItem("jobcraft_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.trim()) {
          navigate("/dashboard", { replace: true });
        }
      } catch {}
    }
  }, [navigate]);

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skillTags.includes(skillInput.trim())) {
        setSkillTags([...skillTags, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeTag = (tag: string) => setSkillTags(skillTags.filter(t => t !== tag));

  const handleNext = () => {
    if (step === 1) {
      const fullProfile = { ...profile, skills: skillTags.join(', ') };
      localStorage.setItem("jobcraft_profile", JSON.stringify(fullProfile));
      setStep(2);
    } else {
      localStorage.setItem("jobcraft_template", String(selectedTemplate));
      navigate("/dashboard");
    }
  };

  const isStep1Valid = profile.name.trim() && profile.targetRole.trim();

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundIcons />
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto relative z-10">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold transition-all ${step >= 1 ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-muted text-muted-foreground"}`}>1</div>
            <span className={`text-xs font-semibold ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>Profil</span>
          </div>
          <div className={`h-1 w-20 rounded-full transition-all ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold transition-all ${step >= 2 ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-muted text-muted-foreground"}`}>2</div>
            <span className={`text-xs font-semibold ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>Template</span>
          </div>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display text-center mb-4">
              Créons ton <span className="text-accent italic">profil</span>
            </h1>
            <p className="text-center text-muted-foreground mb-10">Upload ton CV ou remplis les infos manuellement</p>

            <div className="flex gap-3 justify-center mb-8">
              <button onClick={() => setUploadMode("upload")} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${uploadMode === "upload" ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-card border border-border/50 text-muted-foreground"}`}>
                📎 Upload CV
              </button>
              <button onClick={() => setUploadMode("manual")} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${uploadMode === "manual" ? "bg-primary text-primary-foreground shadow-wow-sm" : "bg-card border border-border/50 text-muted-foreground"}`}>
                ✍️ Remplir manuellement
              </button>
            </div>

            {uploadMode === "upload" ? (
              <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border-2 border-dashed border-primary/30 p-12 text-center cursor-pointer hover:border-primary transition-colors">
                <p className="text-5xl mb-4">📄</p>
                <p className="font-bold text-lg mb-1">Glisse ton CV ici</p>
                <p className="text-sm text-muted-foreground mb-4">PDF ou Word · Max 5 Mo</p>
                <button className="btn-outline text-sm">Ou choisir un fichier</button>
              </div>
            ) : (
              <div className="bg-card/80 rounded-[2rem] shadow-wow-sm border border-border/30 p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Nom complet *", placeholder: "Sophie Carpentier" },
                    { key: "targetRole", label: "Poste visé *", placeholder: "Développeuse Full-Stack" },
                    { key: "email", label: "Email professionnel", placeholder: "sophie@email.com", type: "email" },
                    { key: "phone", label: "Téléphone", placeholder: "+33 6 12 34 56 78", type: "tel" },
                    { key: "city", label: "Ville", placeholder: "Paris, France" },
                    { key: "linkedin", label: "LinkedIn (optionnel)", placeholder: "linkedin.com/in/sophie", type: "url" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold mb-1.5">{field.label}</label>
                      <input
                        value={(profile as Record<string, string>)[field.key]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        type={field.type || "text"}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5">Expériences clés</label>
                  <textarea
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    placeholder="3 ans chez Acme Corp en tant que dev React. Gestion d'une équipe de 5 personnes..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>

                {/* Skill tags */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Compétences techniques</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skillTags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1.5">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-destructive">×</button>
                      </span>
                    ))}
                  </div>
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Tape une compétence et appuie sur Entrée..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5">Formation</label>
                  <textarea
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    placeholder="Master Informatique, Université Paris-Saclay"
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5">Portfolio / GitHub (optionnel)</label>
                  <input
                    value={profile.portfolio}
                    onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                    placeholder="github.com/sophie-dev"
                    type="url"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={handleNext}
                disabled={!isStep1Valid}
                className="btn-primary text-sm hover:shadow-wow-lg hover:-translate-y-1 transition-all"
              >
                Analyser mon profil →
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display text-center mb-4">
              Choisis ton <span className="text-accent italic">template</span>
            </h1>
            <p className="text-center text-muted-foreground mb-10">
              100 templates disponibles · Double-clique pour preview · Tu pourras toujours en changer
            </p>

            <TemplateSelector
              selected={selectedTemplate}
              onSelect={setSelectedTemplate}
            />

            <div className="mt-10 text-center">
              <button onClick={handleNext} className="btn-primary text-sm hover:shadow-wow-lg hover:-translate-y-1 transition-all">
                Accéder au dashboard →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;