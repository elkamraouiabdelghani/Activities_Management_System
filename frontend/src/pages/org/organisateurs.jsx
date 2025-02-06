import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../header";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";

function Organisateurs(){

    const url = useNavigate();
    const [orgs, setOrgs] = useState([]);
    const [categorie, setCategorie] = useState('');
    const [ville, setVille] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8000/api/organisateurs")
        .then(res => setOrgs(res.data))
        .catch(err => err?console.log(err.message):null)
    }, []);

    function handelSearch(e){
        e.preventDefault();
    
        const formdata = new FormData();
        formdata.append('categorie', categorie);
        formdata.append('ville', ville);
    
        axios.post("http://localhost:8000/api/SearchOrgs", formdata)
        .then(res => setOrgs(res.data))
        .catch(err => err?console.log(err.message):null)            
    }

    // useEffect(() => {
    //     if(categorie && ville){
    //         setOrgs(
    //             orgs.filter(org => org.CategorieSpecia == categorie && org.ville == ville)
    //         )
    //     }else if(categorie && !ville){
    //         setOrgs(
    //             orgs.filter(org => org.CategorieSpecia == categorie)
    //         )
    //     }else if(ville && !categorie){
    //         setOrgs(
    //             orgs.filter(org => org.ville == ville)
    //         )
    //     }else{
    //         axios.get("http://localhost:8000/api/organisateurs")
    //         .then(res => setOrgs(res.data))
    //         .catch(err => err?console.log(err.message):null)
    //     }
    // }, [(categorie && ville) || (categorie || ville)]);

    return(
        <div className="container-fluid p-0 m-0">
            <Header />

            <div className="container p-0 mx-auto my-5">
                <div>
                    <form className="d-flex justify-content-around" onSubmit={handelSearch}>
                        <select className="border-0 fs-4" onChange={e => setCategorie(e.target.value)}>
                            <option selected>Categories</option>
                            <option value="sport">Sport</option>
                            <option value="aventeur">Aventeur</option>
                        </select>
                        <select className="border-0 fs-4" onChange={e => setVille(e.target.value)}>
                            <option selected>Villes</option>
                            <option value="Tanger">Tanger</option>
                            <option value="Tetouan">Tetouan</option>
                            <option value="Rabat">Rabat</option>
                        </select>
                        <input className="btn btn-outline-info text-dark fs-4 p-2" type="submit" value="Rechercher" />
                    </form>
                    <hr />
                    <div className="container mx-auto my-2 p-0">
                        {
                            orgs.length > 0 ? 
                                orgs.map(org => 
                                    <div className="w-100 rounded p-4 my-3" style={{
                                        "backgroundImage": `${org.GrandeImage?`url(http://localhost:8000/storage/${org.GrandeImage})`:'url(./logo_org.png)'}`,
                                        "backgroundRepeat": "no-repeat",
                                        "backgroundSize": "cover",
                                        "backgroundPosition": "center",
                                        "height":"200px"
                                    }}>
                                        <h3 style={{"fontFamily": "adamina"}}>{org.nom} {org.prenom}</h3>
                                        <p className="mx-4">{org.description}.</p>
                                        <Link to={`/Organisateur/${org.id}`} className="btn rounded p-2" style={{"backgroundColor": "lightgray"}}>Rejoignez-nous</Link>
                                    </div>
                                ) : 
                                <h1 className="text-center my-5 py-5" style={{"fontFamily":"adamina"}}>Aucun organisateur</h1>
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Organisateurs