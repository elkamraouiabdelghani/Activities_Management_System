import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../header";
import Footer from "../footer";

function Demandes(){

    const url = useNavigate();
    const {OrgId} = useParams();
    const [demandes, setDemandes] = useState([]);
    const [pars, setPars] = useState([]);
    const [acts, setActs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/demandes/${OrgId}`)
        .then(res => {setDemandes(res.data)})
        .catch(err => err?console.log(err.message):null);

        axios.get("http://localhost:8000/api/participants")
        .then(res => setPars(res.data))
        .catch(err => err?console.log(err.message):null);

        axios.get(`http://localhost:8000/api/activites`)
        .then(res => setActs(res.data))
        .catch(err => err?console.log(err.message):null);
    }, [OrgId]);

    return (
        <div className="w-100 container-fluid p-0 m-0">
            <Header />

                <div className="container mx-auto py-5 my-5 text-center">
                    <h1 style={{"fontFamily": "adamina"}}>Les demandes d'inscription</h1>
                    <table className="table table-striped my-5 py-5">
                        <thead>
                            <th>Id d'activite</th>
                            <th>Id de participant</th>
                            <th>Action</th>
                        </thead>
                        {
                            demandes.length > 0 ? demandes.map(demande => 
                                <tbody>
                                    <td>
                                        <Link to={`/Activite/${demande.activite_id}`}>{
                                            acts.map(act => {
                                                if(act.id == demande.activite_id){
                                                    return act.titre;
                                                }
                                            })
                                        }</Link>
                                    </td>
                                    <td>
                                        <Link>{
                                            pars.map(par => {
                                                if(par.id == demande.participant_id){
                                                    return par.email;
                                                }
                                            })
                                        }</Link>
                                    </td>
                                    <td>
                                        <Link onClick={async () => {
                                            axios.delete(`http://localhost:8000/api/demandes/${demande.id}`);

                                            // url(`/Organisateur/profile/${OrgId}/demandes`);
                                            // location.reload()
                                        }} className="btn btn-outline-danger text-black mx-1">Refuser</Link>
                                        <Link onClick={() => {
                                            const data = new FormData();
                                            
                                            data.append('activite_id', demande.activite_id);
                                            data.append('participant_id', demande.participant_id);
                                    
                                            axios.post(`http://localhost:8000/api/inscriptions`, data)
                                            .then(() => {
                                                // url(`/Organisateur/profile/${OrgId}/demandes`);
                                                // location.reload()
                                            })
                                            .catch(err => console.log(err));

                                        }} className="btn btn-outline-success text-black mx-1">Accepter</Link>
                                    </td>
                                </tbody>
                            ):(
                                <tbody>
                                    <td colSpan={3}>
                                        <h1 style={{"fontFamily": "adamina"}}>Aucun demande maintenent</h1>
                                    </td>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                
            <Footer />
        </div>
    )
}

export default Demandes