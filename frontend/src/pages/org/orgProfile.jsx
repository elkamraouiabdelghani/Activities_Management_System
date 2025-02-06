import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../header";
import Footer from "../footer";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function OrgProfile(){
    
    const url = useNavigate();
    const [orgId, setOrgId] = useState(localStorage.getItem("user_id"));
    const [org, setOrg] = useState({});
    const [acts, setActs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/organisateurs/${orgId}`)
        .then(res => {
            setOrg(res.data.organisateur);
            setActs(res.data.organisateur.activites);
        })
        .catch(err => err?console.log(err.message):null);
    }, [orgId]);
    
    return(
        <div className="w-100 container-fluid p-0 m-0">
            <Header />

            <div className="container p-0 mx-auto my-5">
                <div className="w-100 row p-0 m-0">
                    <div className="col-lg-8">
                        <div className="d-flex align-items-center p-0 m-0">
                            {
                                org.image ? (
                                    <img className="rounded-circle m-0" style={{"width": "100px", "height":"100px"}} src={`http://localhost:8000/storage/${org.image}`} alt="user image" />
                                ):(
                                    <img className="rounded-circle m-0" style={{"width": "100px", "height":"100px"}} src="../../userpic.png" alt="organisateur image" />
                                )
                            }
                            <div className="mx-3">
                                <h4>{org.nom} {org.prenom}</h4>
                                <p className="m-0">{org.email}</p>
                                <p className="m-0">{org.NumeroTele}</p>
                            </div>
                        </div>
                        <div className="my-3 mx-4">
                            <p>{org.description}</p>
                        </div>
                        <hr />
                        <h2 className="mx-2 my-5 text-muted" style={{"fontFamily":"adamina"}}>Votre activites</h2>
                        <table className="table table-striped w-100 text-center">
                            <thead style={{"borderBottom": "1px solid black"}}>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Titre</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Description</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Categorie</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Date et Heure</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Image</th>
                            </thead>
                                {
                                    acts.length > 0 ? acts.map(act => (
                                        <tbody style={{"borderBottom": "1px solid black"}}>
                                            <td className="py-2">
                                                <Link to={`/Modifier Activite/${act.id}`}>{act.titre}</Link>
                                            </td>
                                            <td style={{"width": "20%"}}>{act.description}</td>
                                            <td>{act.categorie}</td>
                                            <td>{act.date}</td>
                                            <td>
                                                <img style={{"width":"100px", "height":"100px"}} src={`http://localhost:8000/storage/${act.image}`} alt="" />
                                            </td>
                                        </tbody>
                                    )) : (
                                        <tbody>
                                            <td className="fs-2 py-5 text-secondary" style={{"fontFamily":"adamina"}} colSpan={5}>Aucun Activite Maintenent</td>
                                        </tbody>
                                    )
                                }
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <div className="w-75 h-100 mx-auto userInf">
                            <div className="py-2 px-4 mx-2">
                                <Link to={`/Organisateur/informations`} className="d-block my-3">Modifier les informations</Link>
                                <Link to={`/Organisateur/profile/${org.id}/demandes`} className="d-block my-3">Voir les demandes d'inscription</Link>
                                <button className="m-0 p-0 text-danger border-0 text-decoration-underline bg-white" onClick={() => {
                                    Swal.fire({
                                        title: "Es-tu sûr?",
                                        text: "Vous ne pourrez pas revenir en arrière !",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Oui, supprimez-le !"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            axios.delete(`http://localhost:8000/api/organisateurs/${org.id}`);
                                            localStorage.removeItem("user_id");
                                            localStorage.removeItem("role");

                                            Swal.fire({
                                                title: "Supprimé!",
                                                text: "Votre compte été supprimé.",
                                                icon: "success"
                                            }).then(res => {
                                                if(res.isConfirmed){
                                                    url('/')
                                                }
                                            })
                                        }
                                    });
                                }}>Supprimer le compte</button>
                            </div>
                            <hr className="my-4 mx-auto" style={{"width": "90%"}} />
                            <div className="py-2 px-4 mx-2">
                                <p className="fs-5" style={{"fontFamily": "adamina"}}>
                                    Cree une nouvelle activite.
                                </p>
                                <Link to={'/Cree Activite'} className="d-block my-3">Ajouter activite</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default OrgProfile