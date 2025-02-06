import React from "react";
import Footer from "./footer";
import Header from "./header";

function ProposDeNous(){
    return(
        <div className="w-100 container-fluid p-0 m-0">
            <Header />

            <div className="w-100 p-0 m-0">
                <div className="w-100 container">
                    <h1 className="text-center py-5" style={{"fontFamily": "adamina"}}>GetYourActivity</h1>
                    <div className="mx-auto text-center p-3 proposNous">
                        <p className="fs-4" style={{"fontFamily": "adamina"}}>
                            Sur notre site web, nous proposons une multitude d'activités organisées 
                            par divers organisateurs passionnés. Chacun de nos organisateurs 
                            apporte son expertise et sa touche personnelle, garantissant ainsi une 
                            expérience unique et enrichissante pour nos utilisateurs. Explorez notre 
                            catalogue varié et laissez-vous inspirer par la diversité des activités 
                            disponibles, conçues pour vous faire vivre des moments inoubliables.
                        </p>
                    </div>
                    <div className="mx-auto text-center py-5 proposNous">
                        <img className="rounded" width={100} src="./myPic.jpeg" alt="AdminPic" />
                        <h3 className="py-3" style={{"fontFamily": "adamina"}}>Abdel ghani El kamraoui</h3>
                        <p className="py-2 fs-5">
                            Developpeur et stagiaire en ISMONTIC, il realise cette plateforme 
                            pour le PFF. Il espre que vous aimez l'idee, design, 
                            la securite ect ...
                        </p>
                        <p className="py-2 fs-4">
                            <span className="fw-bold">GetYourActivity</span> vous propose vos activités préférées et une 
                            variété d'autres activités pour essayer de nouvelles activités, 
                            tout cela grâce à des organisateurs de confiance, 
                            qui travaillent sous notre supervision.
                        </p>
                        <p className="py-2 fs-4">
                            <span className="fw-bold">Contacte:</span> <br />
                            info@GetYourActivity.com <br />
                            +212 609090909
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ProposDeNous