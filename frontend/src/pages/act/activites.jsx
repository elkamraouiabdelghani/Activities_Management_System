import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../header";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";

function Activites(){

    const url = useNavigate();
    const [acts, setActs] = useState([]);
    const [categorie, setCategorie] = useState('');
    const [ville, setVille] = useState('');
    const [dateselect, setDateselect] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/activites`)
        .then(res => setActs(res.data))
        .catch(err => err?console.log(err.message):null);
    }, []);

    async function handelSearch(e){
        e.preventDefault();

        const formdata = new FormData();

        formdata.append('categorie', categorie);
        formdata.append('ville', ville);
        formdata.append('date', dateselect);

        axios.post(`http://localhost:8000/api/SearchActs`, formdata)
        .then(res => setActs(res.data))
        .catch(err => err?console.log(err.message):null);

        url('/Activites')
    }

    return(
        <div className="container-fluid p-0 m-0">
            <Header />

            <div className="container p-0 mx-auto my-5">

                <div>
                    <form className="d-flex justify-content-around" onSubmit={handelSearch}>
                        <select onChange={e => setCategorie(e.target.value)} className="border-0 fs-5">
                            <option selected>Categories</option>
                            <option value="sport" >Sport</option>
                            <option value="aventure" >Aventure</option>
                        </select>
                        <select onChange={e => setVille(e.target.value)} className="border-0 fs-5">
                            <option selected>Villes</option>
                            <option value="tanger" >Tanger</option>
                            <option value="tetouan" >Tetouan</option>
                            <option value="rabat" >Rabat</option>
                        </select>
                        <select onChange={e => setDateselect(e.target.value)} className="border-0 fs-5">
                            <option selected>Date</option>
                            <option value="demaine" >Demaine</option>
                            <option value="7jours" >Apres 7jours</option>
                            <option value="10jours" >Apres 15jours</option>
                        </select>
                        <input className="btn btn-outline-info text-dark fs-4 p-2" type="submit" value="Rechercher" />
                    </form>
                    <hr />
                    <div className="w-100 p-0 m-0">
                        <div className="w-100 row p-0 mx-auto my-5">
                            {
                                acts.length == 0 ? <h1 className="text-center my-5" style={{"fontFamily": "adamina"}}>Aucun Activite avec cet option</h1> :
                                acts.map(act => (
                                    <Link to={`/Activite/${act.id}`} className="card text-decoration-none col-3 mx-auto my-3 p-0 carteAct" style={{"width": "18rem"}}>
                                        <img style={{"width":"100%", "height":"200px"}} src={`http://localhost:8000/storage/${act.image}`} className="card-img-top" alt="..." />
                                        <div className="card-body text-center" style={{"backgroundColor": "#BABABA"}}>
                                            <h6 class="card-title">{act.nom}</h6>
                                            <p>{act.date}, {act.NombreJour}jour ({act.etat})</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Activites