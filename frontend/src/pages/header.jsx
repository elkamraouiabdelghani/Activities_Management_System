import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header(){

    const url = useNavigate();
    const [user_id, setUser_id] = useState(localStorage.getItem("user_id"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    return(
        <div className="w-100 container-fluid p-0 m-0">
            <nav class="navbar navbar-expand-lg bg-body-tertiary p-3" data-bs-theme="dark">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link to={'/'} class="navbar-brand text-center">
                        <img className="p-0 m-0" style={{"width":"40px", "height":"40px"}} src="./logo.png" alt="" />
                    </Link>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to={'/'} class="nav-link active text-white fw-bold" aria-current="page">Acceuil</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/Activites'} class="nav-link text-white">Activites</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/Organisateurs'} class="nav-link text-white">Organisateurs</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link text-white" to={'/A propos de nous'}>A propos de nous</Link>
                            </li>
                        </ul>
                        {
                            user_id ? 
                                <div class="btn-group">
                                    <button type="button" class="btn text-white dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                        {
                                            role ? role+" " : "Profile user"
                                        }
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-lg-end">
                                        <li>
                                            {
                                                user_id ? 
                                                    role == "organisateur" ? (
                                                        <Link to={`/Organisateur/profile/${user_id}`} class="dropdown-item" type="button">
                                                            Mon Compte
                                                        </Link>
                                                    ) : role == "participant" ? (
                                                        <Link to={`/Participant/profile/${user_id}`} class="dropdown-item" type="button">
                                                            Mon Compte
                                                        </Link>
                                                    ) : (
                                                        <Link to={`/espace admin`} class="dropdown-item" type="button">
                                                            Mon Compte
                                                        </Link>
                                                ) : (
                                                    <Link to={'/inscrire'} class="dropdown-item" type="button">
                                                        Mon Compte
                                                    </Link>
                                                )
                                            }
                                        </li>
                                        <li>
                                            <hr class="dropdown-divider" />
                                        </li>
                                        <li><button onClick={() => {
                                            localStorage.removeItem("user_id");
                                            localStorage.removeItem("role");
                                            
                                            url('/');
                                            location.reload();
                                        }} class="dropdown-item" type="button">Se deconnecter</button></li>
                                    </ul>
                                </div>
                            : <Link className="text-white" to={'/inscrire'}>Se Connecter</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header