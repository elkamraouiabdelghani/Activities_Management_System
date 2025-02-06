import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Footer from "./footer";
import Header from "./header";

function Acceuil(){

    const [role, setRole] = useState(localStorage.getItem("role"));
    const [user_id, setUser_id] = useState(localStorage.getItem("user_id"));
    const [pars, setPars] = useState({});
    const [acts, setActs] = useState([]);
    const [allActs, setAllActs] = useState([]);

    useEffect(() => {
        const dateforma = new Date();
        const annee = dateforma.getFullYear();
        const mois = String(dateforma.getMonth() + 1).padStart(2, '0');
        const jour = String(dateforma.getDate()).padStart(2, '0');
        const aujourdhui = `${annee}-${mois}-${jour}`;

        axios.get(`http://localhost:8000/api/activites`)
        .then(res => {
            setAllActs(res.data);
            const data = res.data.sort((a, b)=> new Date(a.date) - new Date(b.date));
            setActs(data.filter(a => a.date >= aujourdhui).slice(0, 3));
        })
        .catch(err => err?console.log(err.message):null);
    }, []);

    // user_id ? 
    //     role == 'participant' ? 
    //         useEffect(() => {
    //             axios.get("http://localhost:8000/api/participants/"+user_id)
    //             .then(res => setPars(res.data.participant))
    //             .catch(err => err?console.log(err.message):null)
    //         }, [user_id])
    //     : console.log("c'est pas participant")
    // : console.log("aucun user")

    return(
        <div className="w-100 p-0 m-0">
            <Header />

            <div className="slider container-fluid p-0 m-0">
                <div className="w-0 m-0 py-5"
                    style={{
                        "height":"600px",
                        "backgroundImage": "url('./act5.jpg')",
                        "backgroundAttachment":"fixed",
                        "backgroundRepeat":"no-repeat",
                        "backgroundSize":"cover",
                        "backgroundPosition":"center",
                        "opacity":"0.6"
                    }}
                >
                    <div className="d-flex justify-content-end p-5">
                        <div className="m-5 p-5">
                            <h1 style={{"color":"black", "fontFamily":"adamina"}}>Rester c'est exister. <br /> Voyager c'est vivre.</h1>
                            {
                                user_id ? 
                                    <div className="d-flex justify-content-end mt-4">
                                        <Link to={'/Activites'} className="btn btn-secondary text-dark">Voir Activites</Link>
                                    </div> :
                                    <div className="d-flex justify-content-end mt-4">
                                        <Link to={'/inscrire'} className="btn btn-dark">Se Connecter</Link>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="container p-0 py-5 mx-auto my-5 text-center">
                <h1 className="mt-3" style={{"fontFamily": "adamina"}}>Activités qui auront lieu prochainement</h1>

                <div className="w-100 row p-0 mx-auto my-5">
                    {
                        acts.length == 0 ? <h1>Aucun Activite</h1> : 
                        acts.map(act => (
                            <Link to={`/Activite/${act.id}`} class="card col-3 p-0 mx-auto my-2 text-center text-decoration-none carteAct" style={{"width": "18rem"}}>
                                <img style={{"width":"100%", "height":"200px"}} src={`http://localhost:8000/storage/${act.image}`} class="card-img-top" alt="Activite image" />
                                <div class="card-body" style={{"backgroundColor": "#BABABA"}}>
                                    <h6 class="card-title m-0">{act.titre}</h6>
                                    <p className="m-0">{act.ville} - {act.lieu}</p>
                                    <p className="m-0">{act.date} ({act.etat})</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>

                <Link to={'/Activites'} className="btn btn-outline-secondary border border-dark rounded-5 px-4 py-2 mb-3 text-dark">Voir plus</Link>
            </div>

            <div className="container-fluid p-0 py-5 mx-auto my-5 services">
                <h1 className="text-center" style={{"fontFamily": "adamina"}}>Nos Services</h1>
                <div className="serviceWidth row p-0 mx-auto mt-5">
                    <div className="col-md-4 text-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200" color="#000000" fill="none">
                                <path d="M11.9982 2C8.99043 2 7.04018 4.01899 4.73371 4.7549C3.79589 5.05413 3.32697 5.20374 3.1372 5.41465C2.94743 5.62556 2.89186 5.93375 2.78072 6.55013C1.59143 13.146 4.1909 19.244 10.3903 21.6175C11.0564 21.8725 11.3894 22 12.0015 22C12.6135 22 12.9466 21.8725 13.6126 21.6175C19.8116 19.2439 22.4086 13.146 21.219 6.55013C21.1078 5.93364 21.0522 5.6254 20.8624 5.41449C20.6726 5.20358 20.2037 5.05405 19.2659 4.75499C16.9585 4.01915 15.0061 2 11.9982 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9 13C9 13 10 13 11 15C11 15 14.1765 10 17 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h1>Sécurité</h1>
                        <p>Les organisateurs vous protégeons pendant l'aventure.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200" color="#000000" fill="none">
                                <path d="M10 12.3333C10 12.0233 10 11.8683 10.0341 11.7412C10.1265 11.3961 10.3961 11.1265 10.7412 11.0341C10.8683 11 11.0233 11 11.3333 11H12.6667C12.9767 11 13.1317 11 13.2588 11.0341C13.6039 11.1265 13.8735 11.3961 13.9659 11.7412C14 11.8683 14 12.0233 14 12.3333V13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13V12.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.8016 13C14.1132 12.9095 14.4666 12.8005 14.88 12.673L19.0512 11.3866C20.5358 10.9288 21.2624 10.131 21.4204 8.74977C21.4911 8.13198 21.5265 7.82308 21.4768 7.57022C21.3349 6.84864 20.7289 6.26354 19.9213 6.06839C19.6383 6 19.283 6 18.5724 6H5.42757C4.717 6 4.36172 6 4.07871 6.06839C3.27111 6.26354 2.6651 6.84864 2.52323 7.57022C2.47351 7.82308 2.50886 8.13198 2.57956 8.74977C2.73764 10.131 3.46424 10.9288 4.94882 11.3866L9.11996 12.673C9.53336 12.8005 9.88684 12.9095 10.1984 13" stroke="currentColor" stroke-width="1.5" />
                                <path d="M3.46283 11L3.26658 13.1723C2.91481 17.0662 2.73892 19.0131 3.86734 20.2566C4.99576 21.5 6.93851 21.5 10.824 21.5H13.176C17.0615 21.5 19.0042 21.5 20.1327 20.2566C21.2611 19.0131 21.0852 17.0662 20.7334 13.1723L20.5372 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.5 5.5L15.4227 5.23509C15.0377 3.91505 14.8452 3.25503 14.3869 2.87752C13.9286 2.5 13.3199 2.5 12.1023 2.5H11.8977C10.6801 2.5 10.0714 2.5 9.61309 2.87752C9.15478 3.25503 8.96228 3.91505 8.57727 5.23509L8.5 5.5" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                        </div>
                        <h1>Besoins</h1>
                        <p>Chaque organisateur fournit les besoins de l'activité</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200" color="#000000" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                <path d="M9.5 9.5L12.9999 12.9996M16 8L11 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h1>Temps</h1>
                        <p>Vous allez passer le meilleur moment</p>
                    </div>
                </div>
            </div>

            {/* <div className="container p-0 py-5 mx-auto my-5 text-center">
                {
                        <div className="w-100 d-flex justify-content-around p-0 mx-auto my-5">
                            {
                                    allActs.map(act => {
                                        act.ville == pars.ville ? (
                                            <Link to={`/Activite/${act.id}`} class="card w-25 text-center text-decoration-none" style={{"width": "18rem"}}>
                                                <img src="./sliderImg/slide1.jpg" class="card-img-top" alt="..." />
                                                <div class="card-body" style={{"backgroundColor": "#BABABA"}}>
                                                    <h6 class="card-title m-0">{act.titre}</h6>
                                                    <p className="m-0">{act.ville} - {act.lieu}</p>
                                                    <p className="m-0">{act.date} ({act.etat})</p>
                                                </div>
                                            </Link>
                                        ) : 
                                        <h1>Aucun activite dans votre ville</h1>
                                    })
                            }
                        </div>
                }
            </div> */}

            <div className="container p-0 py-5 mx-auto my-5">
                <div className="row p-0 m-0">
                    <div className="col-lg-6 mb-3 p-3">
                        <p className="fs-1" style={{"fontFamily": "adamina"}}>
                            Ici vous pouvez faire vos activités 
                            préférées, vivre des beaux moments 
                            avec des nouvelles personnes et 
                            des organisateurs fiables.
                        </p>
                        <Link to={'/Organisateurs'} className="btn btn-outline-secondary border border-dark rounded-5 px-4 py-2 mt-5 mx-3 text-dark">Voir les organisateurs</Link>
                    </div>
                    <div className="col-lg-6">
                        <img className="w-100" src="./org.jpg" alt="org" />
                    </div>
                </div>
            </div>

            <div className="container p-0 py-5 mx-auto my-5">
                <h1 className="text-center my-5 pb-5" style={{"fontFamily":"adamina"}}>Commentaires</h1>
                <div className="row p-0 m-0">
                    <div className="col-md-5"></div>
                    <div className="col-sm-4 col-md-2 text-center">
                        <img className="w-50 mx-auto rounded-circle" src="./comImg/Mich Stark.jpg" alt="" />
                    </div>
                    <div className="col-sm-8 col-md-5">
                        <h1 className="fw-bold">Mich Stark</h1>
                        <p className="mx-5">
                            C'était tellement merveilleux d'essayer de nouvelles 
                            activités et je me suis même fait de nouveaux amis 
                            grâce à cette expérience unique.
                        </p>
                    </div>
                    <div className="col-12 my-4"></div>
                    {/*  */}
                    <div className="col-sm-8 col-md-5">
                        <h1 className="fw-bold text-end">Iris Joe</h1>
                        <p className="mx-5">
                            Avant, j'avais du mal à trouver des gens pour faire 
                            des activités ensemble, mais maintenant avec 
                            GetYourActivity c'est plus facile.
                        </p>
                    </div>
                    <div className="col-sm-4 col-md-2 text-center">
                        <img className="w-50 mx-auto rounded-circle" src="./comImg/Iris Joe.jpg" alt="" />
                    </div>
                    <div className="col-md-5"></div>
                    <div className="col-12 my-4"></div>
                    {/*  */}
                    <div className="col-md-5"></div>
                    <div className="col-sm-4 col-md-2 text-center">
                        <img className="w-50 mx-auto rounded-circle" src="./comImg/Aline.jpg" alt="" />
                    </div>
                    <div className="col-sm-8 col-md-5">
                        <h1 className="fw-bold">Aline</h1>
                        <p className="mx-5">
                            J'ai passé de merveilleux moments à faire mes 
                            activités préférées, avec mes amis, et l'organisation 
                            était de grande qualité.
                        </p>
                    </div>
                    <div className="col-12 my-4"></div>
                    {/*  */}
                    <div className="col-sm-8 col-md-5">
                        <h1 className="fw-bold text-end">Tony</h1>
                        <p className="mx-5">
                            C'était une belle nuit au sommet de la montagne, 
                            même si nous étions fatigués par l'escalade, 
                            le temps était magnifique.  Après nous être reposés, 
                            je leur ai chanté une chanson.
                        </p>
                    </div>
                    <div className="col-sm-4 col-md-2 text-center">
                        <img className="w-50 mx-auto rounded-circle" src="./comImg/Tony.jpg" alt="" />
                    </div>
                    <div className="col-md-5"></div>
                </div>
            </div>

            <div className="container p-0 my-5 mx-auto">
                <div className="d-flex justify-content-around align-items-center">
                    <div className="mx-1">
                        <h1 className="text-dark" style={{"fontFamily":"adamina"}}>GetYourActivity</h1>
                        <img src="./logo.png" alt="logo" />
                    </div>
                    <div className="mx-1">
                        <form>
                            <textarea className="form-control" cols="90" rows="6" placeholder="Ajouter Votre Commentaire !"></textarea>
                            <div className="d-flex justify-content-end">
                                <input className="btn btn-outline-success text-dark m-3" style={{"width":"20%"}} type="submit" value="Envoyer" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Acceuil