import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Inscrire(){

    const url = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState('');

    function handelSubmit(e){
        e.preventDefault();

        if(email != "" && mdp != ""){
            const data = new FormData();
            data.append("email", email);
            data.append("password", mdp);
    
            axios.post("http://localhost:8000/api/auth/login", data)
            .then(async result => {
                if(result.data.message == "Connexion reussite") {
                    localStorage.setItem("user_id", result.data.user_id);
                    localStorage.setItem("role", result.data.role);
 
                    url('/')
                }else{
                    setError(result.data.error)
                }
            })
            .catch(err => console.log("error: "+err.message));
        }else{
            setError("Veuillez remplir tous les champs");
        }
    }

    return(
        <div className="w-100 container-fluid p-5 m-0 inscrire">
            <div className="row p-0 m-0 my-5 py-5">
                <div className="col-md-6 my-2 px-5">
                    <div className="text-center p-0 m-0">
                        <img className="p-0 m-0" style={{"width":"150px", "height":"150px"}} src="../../bg-logo.png" alt="" />
                    </div>
                    <p className="fs-1" style={{"fontFamily": "adamina"}}>
                        Bienvenue sur le monde des activités une autre fois.
                        Connectez-vous pour nouveaux activités !
                    </p>
                </div>
                <div className="col-md-6 my-2">
                    <div className="w-100 mx-auto p-5 border rounded bg-white">
                        <form onSubmit={handelSubmit}>
                            <h1 className="text-center" style={{"fontFamily": "adamina"}}>Se connecter</h1>
                            <div className="mb-3">
                                <label className="py-2 px-3 fw-bold" htmlFor="email">Email adresse</label>
                                <input className="form-control" style={{"backgroundColor": "lightgray"}} type="email" name="email" id="email" placeholder="exemple@gmail.com" onChange={e=>setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="py-2 px-3 fw-bold" htmlFor="mdp">Mot de passe</label>
                                <input className="form-control" style={{"backgroundColor": "lightgray"}} type="password" name="mdp" id="mdp" placeholder="**********" onChange={e=>setMdp(e.target.value)} />
                            </div>
                            <div className="w-100 d-flex justify-content-center">
                                <input className="btn btn-outline-dark rounded" type="submit" value="Se connecter" />
                            </div>
                            <div className="w-100 text-danger text-center my-3" style={{"fontSize": ".9rem"}}>
                                <span>{error}</span>
                            </div>
                        </form>
                        <hr />
                        <div className="w-100 text-center">
                            <Link to={'/cree compte'}>Cree compte</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inscrire