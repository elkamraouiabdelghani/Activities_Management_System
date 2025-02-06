import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AdminDemandes(){

    const url = useNavigate();
    const [demandes, setDemandes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/toOrg")
        .then(res => setDemandes(res.data))
        .catch(err => console.log(err))
    }, []);

    return (
        <div className="w-100 container-fluid p-0 m-0 espaceadmin">

            <div className="w-100 container-fluid p-3 m-0 bg-white d-flex justify-content-between">
                <div className="">
                    <Link to={'/'} className="text-decoration-none text-dark fw-bold adminlink">Accueil</Link>
                    <Link to={'/espace admin/Gerer les utilisateurs'} className="text-decoration-none text-dark fw-bold mx-3 adminlink">Gerer les utilisateurs</Link>
                    <Link to={'/espace admin/Gerer les organisateurs'} className="text-decoration-none text-dark fw-bold adminlink">Gerer les organisateurs</Link>
                </div>
                <div>
                    {
                        demandes.length > 0 ? 
                            <Link to={'/espace admin/demandes'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9949 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C12.6849 2 13.3538 2.0659 14 2.19142" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M23 5.5C23 7.433 21.433 9 19.5 9C17.567 9 16 7.433 16 5.5C16 3.567 17.567 2 19.5 2C21.433 2 23 3.567 23 5.5Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Link>
                        :
                            <Link>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9948 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Link>
                    }
                </div>
            </div>

                <div className="container mx-auto py-5 my-5 text-center">
                    <h1 style={{"fontFamily": "adamina"}}>Les demandes</h1>
                    <table className="table table-striped my-5 py-5">
                        <thead>
                            <th>Id de participant</th>
                            <th>Action</th>
                        </thead>
                        {
                            demandes.length > 0 ? demandes.map(demande => 
                                <tbody>
                                    <td>
                                        <Link style={{"backgroundColor": "lightgray"}}>{demande.participant_id}</Link>
                                    </td>
                                    <td>
                                        <Link onClick={() => {
                                            axios.delete(`http://localhost:8000/api/toOrg/${demande.id}`);

                                            url("/espace admin/demandes");
                                            // location.reload()
                                        }} className="btn btn-outline-danger text-black mx-1" style={{"backgroundColor": "lightgray"}}>Refuser</Link>
                                        <Link onClick={() => {
                                            const data = new FormData();
                                            
                                            data.append('participant_id', demande.participant_id);
                                    
                                            axios.post(`http://localhost:8000/api/organisateurs`, data)
                                            .then(res => console.log(res.data))
                                            .catch(err => console.log(err));

                                            url("/espace admin/demandes");
                                            // location.reload()
                                        }} className="btn btn-outline-success text-black mx-1" style={{"backgroundColor": "lightgray"}}>Accepter</Link>
                                    </td>
                                </tbody>
                            ):(
                                <tbody>
                                    <td colSpan={3}>
                                        <h1 style={{"backgroundColor": "lightgray", "fontFamily": "adamina"}}>Aucun demande maintenent</h1>
                                    </td>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                
        </div>
    )
}

export default AdminDemandes