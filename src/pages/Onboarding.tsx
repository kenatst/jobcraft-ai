import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const templates = [
  { id: "classique", name: "Classique", desc: "Sobre, noir et blanc, efficace", colors: ["#1a1a1a", "#ffffff", "#666"] },
  { id: "moderne", name: "Moderne", desc: "Accent coloré, deux colonnes", colors: ["#C85C3E", "#ffffff", "#1a1a1a"] },
  { id: "minimaliste", name: "Minimaliste", desc: "Beige, typographie élégante", colors: ["#F5EFE8", "#1a1a1a", "#C85C3E"] },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ name: "", targetRole: "", experience: "", skills: "", education: "" });
  const [selectedTemplate, setSelectedTemplate] = useState("moderne");
  const [uploadMode, setUploadMode] = useState<"upload" | "manual">("manual");

  const handleNext = () => {
    if (step === 1) {
      localStorage.setItem("jobcraft_profile", JSON.stringify(profile));
      setStep(2);
    } else {
      localStorage.setItem("jobcraft_template", selectedTemplate);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</div>
          <div className={`h-0.5 w-16 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Créons ton <span className="text-accent-violet italic">profil</span>
            </h1>
            <p className="text-center text-muted-foreground mb-10">Upload ton CV ou remplis les infos manuellement</p>

            <div className="flex gap-3 justify-center mb-8">
              <button onClick={() => setUploadMode("upload")} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${uploadMode === "upload" ? "bg-primary text-primary-foreground" : "bg-card shadow-card text-foreground"}`}>
                📎 Upload CV
              </button>
              <button onClick={() => setUploadMode("manual")} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${uploadMode === "manual" ? "bg-primary text-primary-foreground" : "bg-card shadow-card text-foreground"}`}>
                ✍️ Remplir manuellement
              </button>
            </div>

            {uploadMode === "upload" ? (
              <div className="bg-card rounded-3xl shadow-card p-10 text-center border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                <p className="text-4xl mb-3">📄</p>
                <p className="font-semibold mb-1">Glisse ton CV ici</p>
                <p className="text-sm text-muted-foreground">PDF ou Word, 5 Mo max</p>
              </div>
            ) : (
              <div className="bg-card rounded-3xl shadow-card p-8 space-y-5">
                {[
                  { key: "name", label: "Nom complet", placeholder: "Sophie Carpentier" },
                  { key: "targetRole", label: "Poste visé", placeholder: "Développeuse Full-Stack" },
                  { key: "experience", label: "Expériences clés", placeholder: "3 ans chez Acme Corp en tant que dev React...", textarea: true },
                  { key: "skills", label: "Compétences", placeholder: "React, TypeScript, Node.js, PostgreSQL..." },
                  { key: "education", label: "Formation", placeholder: "Master Informatique, Université Paris-Saclay" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold mb-1.5">{field.label}</label>
                    {field.textarea ? (
                      <textarea
                        value={(profile as any)[field.key]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      />
                    ) : (
                      <input
                        value={(profile as any)[field.key]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <button onClick={handleNext} className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
                Analyser mon profil →
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Choisis ton <span className="text-accent-violet italic">template</span>
            </h1>
            <p className="text-center text-muted-foreground mb-10">Tu pourras toujours en changer plus tard</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`bg-card rounded-3xl shadow-card p-6 text-left transition-all ${
                    selectedTemplate === t.id ? "ring-2 ring-primary scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                >
                  {/* Mini preview */}
                  <div className="rounded-2xl overflow-hidden mb-4 border border-border" style={{ background: t.colors[1] }}>
                    <div className="p-4 space-y-2">
                      <div className="h-3 rounded-full w-1/2" style={{ background: t.colors[0] }} />
                      <div className="h-2 rounded-full w-3/4" style={{ background: t.colors[2], opacity: 0.3 }} />
                      <div className="h-2 rounded-full w-2/3" style={{ background: t.colors[2], opacity: 0.3 }} />
                      <div className="h-2 rounded-full w-1/2" style={{ background: t.colors[2], opacity: 0.3 }} />
                      <div className="mt-3 h-2 rounded-full w-1/3" style={{ background: t.colors[0] }} />
                      <div className="h-2 rounded-full w-full" style={{ background: t.colors[2], opacity: 0.2 }} />
                      <div className="h-2 rounded-full w-5/6" style={{ background: t.colors[2], opacity: 0.2 }} />
                    </div>
                  </div>
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button onClick={handleNext} className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
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
