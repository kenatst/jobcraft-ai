import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const templates = [
    { id: "classique", name: "Classique", desc: "Sobre, noir et blanc, efficace", colors: ["#1a1a1a", "#ffffff", "#666"] },
    { id: "moderne", name: "Moderne", desc: "Accent coloré, deux colonnes", colors: ["#C85C3E", "#ffffff", "#1a1a1a"] },
    { id: "minimaliste", name: "Minimaliste", desc: "Beige, typographie élégante", colors: ["#F5EFE8", "#1a1a1a", "#C85C3E"] },
];

const Settings = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: "", targetRole: "", experience: "", skills: "", education: "" });
    const [selectedTemplate, setSelectedTemplate] = useState("moderne");

    useEffect(() => {
        const savedProfile = localStorage.getItem("jobcraft_profile");
        if (savedProfile) setProfile(JSON.parse(savedProfile));
        const savedTemplate = localStorage.getItem("jobcraft_template");
        if (savedTemplate) setSelectedTemplate(savedTemplate);
    }, []);

    const saveProfile = () => {
        localStorage.setItem("jobcraft_profile", JSON.stringify(profile));
        toast.success("Profil sauvegardé ✓");
    };

    const saveTemplate = () => {
        localStorage.setItem("jobcraft_template", selectedTemplate);
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
        { key: "experience", label: "Expériences clés", placeholder: "3 ans chez Acme Corp en tant que dev React...", textarea: true },
        { key: "skills", label: "Compétences", placeholder: "React, TypeScript, Node.js, PostgreSQL..." },
        { key: "education", label: "Formation", placeholder: "Master Informatique, Université Paris-Saclay" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">
                        ← Retour au dashboard
                    </Link>

                    <h1 className="text-3xl md:text-5xl font-extrabold font-display mb-4">
                        Para<span className="text-accent italic">mètres</span>
                    </h1>
                    <p className="text-muted-foreground text-lg mb-12">Gère ton profil, template et préférences</p>

                    {/* Profile Section */}
                    <Section title="👤 Mon profil" description="Ces informations sont utilisées pour personnaliser tes CV et lettres.">
                        <div className="space-y-5">
                            {profileFields.map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm font-semibold mb-1.5">{field.label}</label>
                                    {field.textarea ? (
                                        <textarea
                                            value={(profile as Record<string, string>)[field.key]}
                                            onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                                            placeholder={field.placeholder}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                        />
                                    ) : (
                                        <input
                                            value={(profile as Record<string, string>)[field.key]}
                                            onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button onClick={saveProfile} className="btn-primary text-sm mt-6">
                            Sauvegarder le profil
                        </button>
                    </Section>

                    {/* Template Section */}
                    <Section title="🎨 Template CV" description="Le template utilisé pour générer tes CV.">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {templates.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setSelectedTemplate(t.id)}
                                    className={`rounded-2xl p-5 text-left transition-all border ${selectedTemplate === t.id ? "ring-2 ring-primary border-primary scale-[1.02] shadow-wow-sm" : "border-border/50 hover:scale-[1.01]"
                                        }`}
                                >
                                    <div className="rounded-xl overflow-hidden mb-3 border border-border" style={{ background: t.colors[1] }}>
                                        <div className="p-3 space-y-1.5">
                                            <div className="h-2.5 rounded-full w-1/2" style={{ background: t.colors[0] }} />
                                            <div className="h-1.5 rounded-full w-3/4" style={{ background: t.colors[2], opacity: 0.3 }} />
                                            <div className="h-1.5 rounded-full w-2/3" style={{ background: t.colors[2], opacity: 0.3 }} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-sm">{t.name}</h3>
                                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                                </button>
                            ))}
                        </div>
                        <button onClick={saveTemplate} className="btn-primary text-sm mt-6">
                            Appliquer ce template
                        </button>
                    </Section>

                    {/* Danger Zone */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-[2rem] p-8 mt-8">
                        <h2 className="text-xl font-extrabold font-display text-red-700 mb-2">🚨 Zone de danger</h2>
                        <p className="text-sm text-red-600/80 mb-6">Supprimer toutes tes données (profil, candidatures). Cette action est irréversible.</p>
                        <button
                            onClick={clearAllData}
                            className="px-6 py-3 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors"
                        >
                            Supprimer toutes mes données
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <div className="bg-card/80 backdrop-blur-md rounded-[2rem] shadow-wow-sm border border-white/40 p-8 mb-8">
        <h2 className="text-xl font-extrabold font-display mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
        {children}
    </div>
);

export default Settings;
