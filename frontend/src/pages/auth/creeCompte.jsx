import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function CreeCompte(){

    const url = useNavigate();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [NTele, setTele] = useState("");
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState("");

    function handelSubmit(e){
        e.preventDefault();

        if(nom != "" && prenom != "" && NTele != "" && email != "" && mdp != ""){
            const formdata = new FormData();
            formdata.append("nom", nom.charAt(0).toUpperCase() + nom.slice(1));
            formdata.append("prenom", prenom.charAt(0).toUpperCase() + prenom.slice(1));
            formdata.append("NumeroTele", NTele);
            formdata.append("email", email);
            formdata.append("password", mdp);
            formdata.append("role", 'participant');
    
            axios.post("http://localhost:8000/api/auth/register", formdata)
            .then(async result => {
                await result.data.message == "Inscription réussie" ? url('/inscrire') : setError(result.data.error);
            })
            .catch(err => console.log("error: "+err.message));
        }else{
            setError('Veuillez remplir tous les champs');
        }

    }

    return(
        <div className="w-100 container-fluid p-5 m-0 creeCompte">
            <div className="mx-auto my-3 p-5 rounded bg-white creeCompteParent">
                <form onSubmit={handelSubmit}>
                    <h1 className="text-center" style={{"fontFamily": "adamina"}}>Cree Compte</h1>
                    <div className="w-100 mb-3 d-flex justify-content-between">
                        <div>
                            <label className="py-2 px-3 fw-bold" htmlFor="prenom">Prenom</label>
                            <input className="form-control" style={{"backgroundColor": "lightgray"}} type="text" name="prenom" id="prenom" placeholder="prenom ..." onChange={e=>setPrenom(e.target.value)} />
                        </div>    
                        <div>
                            <label className="py-2 px-3 fw-bold" htmlFor="nom">Nom</label>
                            <input className="form-control" style={{"backgroundColor": "lightgray"}} type="text" name="nom" id="nom" placeholder="nom ..." onChange={e=>setNom(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="tele">Numero de telephone</label>
                        <input className="form-control" style={{"backgroundColor": "lightgray"}} type="text" name="tele" id="tele" placeholder="+212000000000" onChange={e=>setTele(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="email">Email adresse</label>
                        <input className="form-control" style={{"backgroundColor": "lightgray"}} type="email" name="email" id="email" placeholder="exemple@gmail.com" onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="mdp">Mot de passe</label>
                        <input className="form-control" style={{"backgroundColor": "lightgray"}} type="password" name="mdp" id="mdp" placeholder="**********" onChange={e=>setMdp(e.target.value)} />
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <input className="btn btn-outline-dark rounded" type="submit" value="Cree Compte" />
                    </div>
                    <div className="w-100 text-danger text-center my-3" style={{"fontSize": ".9rem"}}>
                        <span>{error}</span>
                    </div>
                </form>
                <hr />
                <div className="w-100 text-center">
                    <Link to={'/inscrire'}>Inscrire</Link>
                </div>
            </div>
        </div>
    )
}

export default CreeCompte