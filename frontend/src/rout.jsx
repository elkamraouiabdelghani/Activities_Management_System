import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EspaceAdmin from "./admin/accueil";
import GererUser from "./admin/gererUser";
import GererOrg from "./admin/gererOrg";
import Acceuil from "./pages/accueil";
import ProposDeNous from "./pages/proposDeNous";
import Inscrire from "./pages/auth/inscrire";
import CreeCompte from "./pages/auth/creeCompte";
import Organisateurs from "./pages/org/organisateurs";
import Organisateur from "./pages/org/organisateur";
import Activites from "./pages/act/activites";
import Activite from "./pages/act/activite";
import OrgProfile from "./pages/org/orgProfile";
import UserProfile from "./pages/user/userProfile";
import CreeAct from "./pages/act/CreeActivite";
import ActsOrg from "./admin/actsOrg";
import Demandes from "./pages/org/demandes";
import AdminDemandes from "./admin/demandes";
import OrgModifier from "./pages/org/orgModifier";
import ModifierPar from "./pages/user/userModifier";
import ModifierAct from "./pages/act/actModifier";
import ActsUser from "./admin/actsUser";

function Rout(){
    return(
        <BrowserRouter>
            <Routes>
                {/* Espace Admin */}
                <Route path="/espace admin" element={<EspaceAdmin />} />
                <Route path="/espace admin/demandes" element={<AdminDemandes />} />
                <Route path="/espace admin/Gerer les utilisateurs" element={<GererUser />} />
                <Route path="/espace admin/Gerer les utilisateurs/:UserId" element={<ActsUser />} />
                <Route path="/espace admin/Gerer les organisateurs" element={<GererOrg />} />
                <Route path="/espace admin/Gerer les organisateurs/:OrgId" element={<ActsOrg />} />
                {/* Authentification */}
                <Route path="/inscrire" element={<Inscrire />} />
                <Route path="/cree compte" element={<CreeCompte />} />
                {/* Espace Public */}
                <Route path="/" element={<Acceuil />} /> {/* Ajouter une parameter optionnel */}
                {/* organisateurs */}
                <Route path="/Organisateurs" element={<Organisateurs />} />
                <Route path="/Organisateur/:OrgId" element={<Organisateur />} />
                <Route path="/Organisateur/profile/:OrgId" element={<OrgProfile />} />
                <Route path="/Organisateur/informations" element={<OrgModifier />} />
                <Route path="/Organisateur/profile/:OrgId/demandes" element={<Demandes />} />
                {/* activites */}
                <Route path="/Activites" element={<Activites />} />
                <Route path="/Activite/:ActId" element={<Activite />} />
                <Route path="/Cree Activite" element={<CreeAct />} />
                <Route path="/Modifier Activite/:ActId" element={<ModifierAct />} />
                {/* users */}
                <Route path="/Participant/profile/:UserId" element={<UserProfile />} />
                <Route path="/Participant/Modifier informations" element={<ModifierPar />} />
                <Route path="/A propos de nous" element={<ProposDeNous />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rout