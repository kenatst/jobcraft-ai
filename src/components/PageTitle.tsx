import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
    "/": "JobCraft AI — Décroche le job que tu mérites",
    "/onboarding": "Créer mon profil — JobCraft AI",
    "/dashboard": "Mes candidatures — JobCraft AI",
    "/nouvelle-candidature": "Nouvelle candidature — JobCraft AI",
    "/settings": "Paramètres — JobCraft AI",
    "/profil": "Mon profil — JobCraft AI",
};

const PageTitle = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const base = "JobCraft AI";
        // Check exact match first
        if (pageTitles[pathname]) {
            document.title = pageTitles[pathname];
        } else if (pathname.startsWith("/candidature/")) {
            document.title = `Candidature — ${base}`;
        } else if (pathname.startsWith("/preparation-entretien/")) {
            document.title = `Préparation entretien — ${base}`;
        } else {
            document.title = base;
        }
    }, [pathname]);

    return null;
};

export default PageTitle;
