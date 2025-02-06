import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';

function ModifierAct(){

    const {ActId} = useParams();
    const url = useNavigate();
    const [orgId, setOrgId] = useState(localStorage.getItem("user_id"));
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [categorie, setCategorie] = useState('');
    const [ville, setVille] = useState('');
    const [lieu, setLieu] = useState('');
    const [date, setDate] = useState(Date);
    const [HDebut, setHDebut] = useState('');
    const [HFin, setHFin] = useState('');
    const [NombrePlace, setNombrePlace] = useState(Number);
    const [NombreJour, setNombreJour] = useState(Number);
    const [etat, setEtat] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState('');
    const [err, setErr] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/activites/${ActId}`)
        .then(res => {
            setTitre(res.data.titre);
            setDescription(res.data.description);
            setCategorie(res.data.categorie);
            setVille(res.data.ville);
            setLieu(res.data.lieu);
            setDate(res.data.date);
            setHDebut(res.data.HDebut);
            setHFin(res.data.HFin);
            setNombreJour(res.data.NombreJour);
            setNombrePlace(res.data.NombrePlace);
            setPrix(res.data.prix)
        })
        .catch(err => console.log(err))
    }, []);

    async function handelSubmit(e){
        e.preventDefault();

        if(image == '' || etat == ''){
            setErr('Veuillez remplir tous les champs');
        }else{
            const formdata = new FormData();
    
            formdata.append('titre', titre);
            formdata.append('description', description);
            formdata.append('categorie', categorie);
            formdata.append('ville', ville);
            formdata.append('lieu', lieu);
            formdata.append('date', date);
            formdata.append('HDebut', HDebut);
            formdata.append('HFin', HFin);
            formdata.append('NombrePlace', NombrePlace);
            formdata.append('NombreJour', NombreJour);
            formdata.append('etat', etat);
            formdata.append('prix', prix);
            formdata.append('image', image);
            formdata.append('organisateur_id', orgId);
    
            await axios.post(`http://localhost:8000/api/activites/${ActId}`, formdata)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

            url(`/Organisateur/profile/${orgId}`);
        }
    }

    return(
        <div className="w-100 container-fluid p-0 m-0">
            <Header />
            
            <div className="container mx-auto my-5 pt-5 rounded bg-white">
                <h1 className="text-center" style={{"fontFamily": "adamina"}}>Modifier Activite</h1>
                <div className="w-100 text-danger text-center my-3" style={{"fontSize": ".9rem"}}>
                    <span>{err}</span>
                </div>
                <form className="my-5" onSubmit={handelSubmit} encType="multipart/form-data">
                    <div className="w-100 d-flex justify-content-around mb-3">
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="Titre" value={titre} onChange={e => setTitre(e.target.value)} />
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="Ville" value={ville} onChange={e => setVille(e.target.value)} />
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="Lieu" value={lieu} onChange={e => setLieu(e.target.value)} />
                    </div>
                    <div className="w-100 d-flex justify-content-around mb-3">
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="Categorie" value={categorie} onChange={e => setCategorie(e.target.value)} />
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="NPlace" value={NombrePlace} onChange={e => setNombrePlace(e.target.value)} />
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="NJour" value={NombreJour} onChange={e => setNombreJour(e.target.value)} />
                    </div>
                    <textarea name="Description" className="form-control mx-auto mb-3" style={{"width": "90%", "backgroundColor": "#F4F3F3"}} value={description} cols="30" rows="3" onChange={e => setDescription(e.target.value)} ></textarea>
                    <div className="w-100 d-flex justify-content-around mb-3">
                        <input type="date" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="Date" value={date} onChange={e => setDate(e.target.value)} />
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="HeureCom" value={HDebut} onChange={e => setHDebut(e.target.value)} />
                        <input type="text" className="form-control w-25" style={{"backgroundColor": "#F4F3F3"}} name="HeureFin" value={HFin} onChange={e => setHFin(e.target.value)} />
                    </div>
                    <div className="w-100 d-flex justify-content-around align-items-center mb-3">
                        <input type="file" className="form-control" style={{"backgroundColor": "#F4F3F3", "width": "35%"}} name="Image" onChange={e => setImage(e.target.files[0])} />
                            <div className="d-flex justify-content-center align-items-center" style={{"width": "20%"}}>
                                <div className="px-3">
                                    <input className="px-1" type="radio" name="etat" value="gratuite" onChange={e => setEtat(e.target.value)} />
                                    <span className="px-1">Gratuite</span>
                                </div>
                                <div className="px-3">
                                    <input className="px-1" type="radio" name="etat" value="payant" onChange={e => setEtat(e.target.value)} />
                                    <span className="px-1">Payant</span>
                                </div>
                            </div>
                        <input className="form-control" style={{"backgroundColor": "#F4F3F3", "width": "20%"}} type="text" name="prix" value={prix} onChange={e => setPrix(e.target.value)} />
                    </div>
                    <div className="w-100 d-flex justify-content-around py-4">
                        <Link className="btn btn-outline-success p-2" to={`/Organisateur/profile/${orgId}`}>Retourner</Link>
                        <input className="btn btn-outline-primary p-2" type="submit" value="Modifier" />
                        <button className="btn btn-outline-danger" onClick={() => {
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
                                    axios.delete(`http://localhost:8000/api/activites/${ActId}`);

                                    Swal.fire({
                                        title: "Supprimé!",
                                        text: "L'activite est supprimer.",
                                        icon: "success"
                                    }).then(res => {
                                        if(res.isConfirmed){
                                            url(`/Organisateur/profile/${orgId}`);
                                        }
                                    })
                                }
                            });
                        }}>Supprimer</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default ModifierAct