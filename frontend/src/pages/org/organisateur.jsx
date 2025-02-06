import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../header";
import Footer from "../footer";

function Organisateur(){

    const {OrgId} = useParams();
    const [org, setOrg] = useState({});
    const [acts, setActs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/organisateurs/${OrgId}`)
        .then(res => {
            setOrg(res.data.organisateur);
            setActs(res.data.activites)
        })
        .catch(err => err?console.log(err.message):null)
    }, [OrgId]);

    return(
        <div className="container-fluid p-0 m-0" >
            <Header />

            <div className="container p-0 mx-auto my-0">
                <div className="w-100 p-0" style={{"marginBottom":"100px"}}>
                    {
                        org.GrandeImage?(
                            <img className="w-100" style={{"height":"200px"}} src={`http://localhost:8000/storage/${org.GrandeImage}`} alt="image arrier" />
                        ):(
                            <img className="w-100" src="../logo_org.png" alt="image arrier" />
                        )
                    }
                    <div className="d-flex align-items-center orgDon">
                        <div className="mx-5">
                            {
                                org.image?(
                                    <img className="rounded-circle m-0" style={{"width": "100px", "height":"100px"}} src={`http://localhost:8000/storage/${org.image}`} alt="image arrier" />
                                ):(
                                    <img className="rounded-circle m-0" style={{"width": "100px", "height":"100px"}} src="../../userpic.png" alt="image arrier" />
                                )
                            }
                        </div>
                        <div>
                            <h4>{org.nom}</h4>
                            <p className="m-0">{org.email}</p>
                            <p className="m-0">{org.NumeroTele}</p>
                            <div className="d-flex my-3">
                                <Link className="mx-2 text-decoration-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.18182 10.3333C5.20406 10.3333 5 10.5252 5 11.4444V13.1111C5 14.0304 5.20406 14.2222 6.18182 14.2222H8.54545V20.8889C8.54545 21.8081 8.74951 22 9.72727 22H12.0909C13.0687 22 13.2727 21.8081 13.2727 20.8889V14.2222H15.9267C16.6683 14.2222 16.8594 14.0867 17.0631 13.4164L17.5696 11.7497C17.9185 10.6014 17.7035 10.3333 16.4332 10.3333H13.2727V7.55556C13.2727 6.94191 13.8018 6.44444 14.4545 6.44444H17.8182C18.7959 6.44444 19 6.25259 19 5.33333V3.11111C19 2.19185 18.7959 2 17.8182 2H14.4545C11.191 2 8.54545 4.48731 8.54545 7.55556V10.3333H6.18182Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    </svg>
                                </Link>
                                <Link className="mx-2 text-decoration-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Link>
                                <Link className="mx-2 text-decoration-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                        <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Link>
                                <Link className="mx-2 text-decoration-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        <path d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118" stroke="currentColor" stroke-width="1.5" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mx-5" style={{"position":"relative", "top":"50px"}}>
                        <p className="fs-5 m-4">{org.description}.</p>
                    </div>
                </div>

                <div className="w-100 p-0 my-5" style={{"fontFamily": "adamina"}}>
                    <h1 className="text-muted">Nos Activites</h1>
                    <div className="w-100 p-0 m-0">
                        <div className="w-100 row p-0 mx-auto my-5">
                            {
                                acts.map(act => (
                                    <Link to={`/Activite/${act.id}`} class="card col-3 text-decoration-none mx-auto my-3 p-0 text-center carteAct" style={{"width": "18rem"}}>
                                        <img style={{"width":"100%", "height":"200px"}} src={`http://localhost:8000/storage/${act.image}`} class="card-img-top" alt="image d'activite" />
                                        <div class="card-body" style={{"backgroundColor": "#BABABA"}}>
                                            <h6 class="card-title">{act.nom}</h6>
                                            <p>a {act.date}, {act.nombreJour}jour ({act.etat})</p>
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

export default Organisateur