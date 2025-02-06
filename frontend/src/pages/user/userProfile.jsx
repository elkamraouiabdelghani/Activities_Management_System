import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../header";
import Footer from "../footer";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function UserProfile(){

    const [userId, setUserId] = useState(localStorage.getItem("user_id"));
    const url = useNavigate();
    const [user, setUser] = useState({});
    const [acts, setActs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/participants/${userId}`)
        .then(res => {
            setUser(res.data.participant);
            setActs(res.data.activites);
        })
        .catch(err => err?console.log(err.message):null)
    }, [userId]);

    function handelSubmit(e){
        e.preventDefault()

        axios.post(`http://localhost:8000/api/toOrg`, {'participant_id': userId})
        .then(res => {
            const message = res.data.message;
            if(!message){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Votre demande à êtes envoyer avec succès",
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message
                });
            }
        })
        .catch(err => err?console.log(err.message):null)
    }
    
    return(
        <div className="w-100 container-fluid p-0 m-0">
            <Header />

            <div className="container p-0 mx-auto my-5">
                <div className="w-100 row p-0 m-0">
                    <div className="col-8">
                        <div className="d-flex align-items-center p-0 m-0">
                            {
                                user.image ? (
                                    <img className="rounded-circle m-0" style={{"width": "100px", "height":"100px"}} src={`http://localhost:8000/storage/${user.image}`} alt="user image" />
                                ):(
                                    <img className="rounded-circle m-0" style={{"width": "100px", "height":"100px"}} src="../../userpic.png" alt="organisateur image" />
                                )
                            }
                            <div className="mx-3">
                                <h4>{user.nom} {user.prenom}</h4>
                                <p className="m-0">{user.email}</p>
                                <p className="m-0">{user.NumeroTele}</p>
                            </div>
                        </div>
                        <hr />
                        <h2 className="mx-2 my-5 text-muted" style={{"fontFamily":"adamina"}}>Les activites qui vous avez inscrit</h2>
                        <table className="table table-striped w-100 text-center">
                            <thead>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Titre</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Categorie</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Date et Heure</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Etat d'activiter</th>
                                <th className="fs-4" style={{"fontFamily":"adamina"}}>Annuler</th>
                            </thead>
                                {
                                    acts.length > 0 ? acts.map(act => (
                                        <tbody>
                                            <td>{act.titre}</td>
                                            <td>{act.categorie}</td>
                                            <td>{act.date}</td>
                                            <td>{act.etat}</td>
                                            <td>
                                                <Link onClick={() => {
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
                                                            const data = new FormData();
                                            
                                                            data.append('activite_id', act.id);
                                                            data.append('participant_id', userId);
                                                    
                                                            axios.post(`http://localhost:8000/api/inscriptions/delete`, data)
                                                            .then(res => console.log(res.data))
                                                            .catch(err => console.log(err));

                                                            Swal.fire({
                                                                title: "Supprimé!",
                                                                text: "Votre activité été supprimé.",
                                                                icon: "success"
                                                            }).then(async res => {
                                                                if(res.isConfirmed){
                                                                    window.location.reload();
                                                                }
                                                            })
                                                        }
                                                    });
                                                }} className="text-decoration-underline text-danger">Annuler</Link>
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
                    <div className="col-4">
                        <div className="w-75 h-100 mx-auto userInf">
                            <div className="py-2 px-4 mx-2">
                                <Link to={'/Participant/Modifier informations'} className="d-block my-3">Modifier les informations</Link>
                                <button className="text-danger border-0 text-decoration-underline bg-white p-0 m-0" onClick={() => {
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
                                            axios.delete(`http://localhost:8000/api/participants/${user.id}`);
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
                                    Tu veux etre un organisateur ?
                                    Envoyer la demande !
                                </p>

                                <form onSubmit={handelSubmit}>
                                    <input className="btn border-info py-2 px-3" type="submit" value="Envoyer" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default UserProfile