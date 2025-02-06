import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

function OrgModifier(){

    const url = useNavigate();
    const [orgId, setOrgId] = useState(localStorage.getItem("user_id"));
    const [org, setOrg] = useState({});
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [tele, setTele] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ville, setVille] = useState("");
    const [adress, setAdress] = useState("");
    const [categorie, setCategories] = useState("");
    const [description, setDescription] = useState("");
    const [profImg, setProfImg] = useState('');
    const [arrImg, setArrImg] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/organisateurs/${orgId}`)
        .then(res => {
            setOrg(res.data.organisateur);
        })
        .catch(err => err?console.log(err.message):null);
    }, [orgId]);

    useEffect(()=>{
        setNom(org.nom);
        setPrenom(org.prenom);
        setTele(org.NumeroTele);
        setEmail(org.email);
        setPassword(org.password);
        setVille(org.ville);
        setAdress(org.adress);
        setCategories(org.CategorieSpecia);
        setDescription(org.description);
        setProfImg(org.image);
        setArrImg(org.GrandeImage);
    }, [org]);
    
    function handelSubmit(e){
        e.preventDefault();

        const formdata = new FormData();

        formdata.append('nom', nom.charAt(0).toUpperCase() + nom.slice(1));
        formdata.append('prenom', prenom.charAt(0).toUpperCase() + prenom.slice(1));
        formdata.append('NumeroTele', tele);
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('ville', ville);
        formdata.append('adress', adress);
        formdata.append('CategorieSpecia', categorie);
        formdata.append('description', description);
        formdata.append('image', profImg);
        formdata.append('GrandeImage', arrImg);

        axios.post(`http://localhost:8000/api/organisateurs/${orgId}`, formdata)
        .then(res => console.log(res.data))
        .catch(err => err?console.log(err.message):null);

        url("/Organisateur/profile/"+orgId)
    }

    return (
        <div className="w-100 container-fluid p-0 m-0">
            <Header />

            <div className="container mx-auto my-5 p-5 bg-white rounded">
                <h1 className="text-center" style={{"fontFamily":"adamina"}}>Modifier les informations personnel</h1>

                <form onSubmit={handelSubmit} encType="multipart/form-data">
                    <div className="w-100 mb-3 d-flex justify-content-between">
                        <div style={{"width":"45%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="prenom">Prenom</label>
                            <input className="w-100 form-control" style={{"backgroundColor": "lightgray"}} type="text" value={prenom} placeholder="prenom ..." onChange={e=>setPrenom(e.target.value)} />
                        </div>
                        <div style={{"width":"45%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="nom">Nom</label>
                            <input className="w-100 form-control" style={{"backgroundColor": "lightgray"}} type="text" name="nom" value={nom} placeholder="nom ..." onChange={e=>setNom(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="tele">Numero de telephone</label>
                        <input className="form-control" style={{"backgroundColor": "lightgray"}} type="text" name="tele" value={tele} placeholder="+212000000000" onChange={e=>setTele(e.target.value)} />
                    </div>
                    <div className="w-100 mb-3 d-flex justify-content-between">
                        <div style={{"width":"30%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="ville">Ville</label>
                            <input className="w-100 form-control" style={{"backgroundColor": "lightgray"}} type="text" name="ville" value={ville} placeholder="ville ..." onChange={e=>setVille(e.target.value)} />
                        </div>
                        <div style={{"width":"30%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="adress">Adress</label>
                            <input className="w-100 form-control" style={{"backgroundColor": "lightgray"}} type="text" name="adress" value={adress} placeholder="adress ..." onChange={e=>setAdress(e.target.value)} />
                        </div>
                        <div style={{"width":"30%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="categories">Categorie(s)</label>
                            <input className="w-100 form-control" style={{"backgroundColor": "lightgray"}} type="text" name="categories" value={categorie} placeholder="categories ..." onChange={e=>setCategories(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="description">Description</label>
                        <textarea className="form-control" style={{"backgroundColor": "lightgray"}} name="description" value={description} placeholder="description ..." cols="30" rows="3" onChange={e=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="w-100 mb-3 d-flex justify-content-between">
                        <div style={{"width":"45%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="profImg">Image de profile</label>
                            <input className="w-100 form-control" style={{"backgroundColor": "lightgray"}} type="file" name="image" onChange={e=>setProfImg(e.target.files[0])} required/>
                        </div>
                        <div style={{"width":"45%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="arrImg">Image d'arriere</label>
                            <input className="w-100 form-control" style={{"backgroundColor": "lightgray"}} type="file" name="ArrImg" onChange={e=>setArrImg(e.target.files[0])} required/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="email">Email adresse</label>
                        <input className="form-control" style={{"backgroundColor": "lightgray"}} type="email" name="email" value={email} placeholder="exemple@gmail.com" onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="mdp">Mot de passe</label>
                        <input className="form-control" style={{"backgroundColor": "lightgray"}} type="password" name="mdp" placeholder="**********" onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <div className="w-100 d-flex justify-content-around">
                        <button onClick={() => {
                            url("/Organisateur/profile/"+orgId)
                        }} className="btn btn-outline-success">Retourner</button>
                        <input className="btn btn-outline-primary rounded" type="submit" value="Modifier" />
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default OrgModifier;