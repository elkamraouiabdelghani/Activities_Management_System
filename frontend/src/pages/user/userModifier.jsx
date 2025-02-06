import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ModifierPar(){

    const url = useNavigate();
    const [parId, setParId] = useState(localStorage.getItem("user_id"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [par, setPar] = useState({});
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tele, setTele] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ville, setVille] = useState("");
    const [TypeActPre, setTypeActPre] = useState("");
    const [image, setImage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/participants/${parId}`)
        .then(res => setPar(res.data.participant))
        .catch(err => err?console.log(err.message):null)
    }, [parId]);

    useEffect(()=>{
        setNom(par.nom);
        setPrenom(par.prenom);
        setTele(par.NumeroTele);
        setEmail(par.email);
        setPassword(par.password);
        setVille(par.ville);
        setTypeActPre(par.TypeActPre);
        setImage(par.image)
    }, [par]);

    function handelSubmit(e){
        e.preventDefault();

        const formdata = new FormData();

        formdata.append('nom', nom.charAt(0).toUpperCase() + nom.slice(1));
        formdata.append('prenom', prenom.charAt(0).toUpperCase() + prenom.slice(1));
        formdata.append('NumeroTele', tele);
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('ville', ville);
        formdata.append('TypeActPre', TypeActPre);
        formdata.append('image', image);

        axios.post(`http://localhost:8000/api/participants/${parId}`, formdata)
        .then(res => console.log(res))
        .catch(err => err?console.log(err.message):null);

        url(`/Participant/profile/${parId}`)
    }

    return (
        <div className="w-100 container-fluid p-0 m-0">
            <Header />

            <div className="container mx-auto my-5 p-5 rounded" style={{"backgroundColor":"lightgray"}}>
                <h1 className="text-center" style={{"fontFamily":"adamina"}}>Modifier les informations personnel</h1>

                <form onSubmit={handelSubmit} encType="multipart/form-data">
                    <div className="w-100 mb-3 d-flex justify-content-between">
                        <div style={{"width":"45%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="prenom">Prenom</label>
                            <input className="w-100 form-control" type="text" value={prenom} placeholder="prenom ..." onChange={e=>setPrenom(e.target.value)} />
                        </div>
                        <div style={{"width":"45%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="nom">Nom</label>
                            <input className="w-100 form-control" type="text" name="nom" value={nom} placeholder="nom ..." onChange={e=>setNom(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-100 mb-3 d-flex justify-content-between">
                        <div style={{"width":"30%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="tele">Numero de telephone</label>
                            <input className="form-control" type="text" name="tele" value={tele} placeholder="+212000000000" onChange={e=>setTele(e.target.value)} />
                        </div>
                        <div style={{"width":"30%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="ville">Ville</label>
                            <input className="w-100 form-control" type="text" name="ville" value={ville} placeholder="ville ..." onChange={e=>setVille(e.target.value)} />
                        </div>
                        <div style={{"width":"30%"}}>
                            <label className="py-2 px-3 fw-bold" htmlFor="adress">Type Activites preferer</label>
                            <input className="w-100 form-control" type="text" name="adress" value={TypeActPre} placeholder="adress ..." onChange={e=>setTypeActPre(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="profImg">Image de profile</label>
                        <input className="w-100 form-control" type="file" name="image" onChange={e=>setImage(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="email">Email adresse</label>
                        <input className="form-control" type="email" name="email" value={email} placeholder="exemple@gmail.com" onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="py-2 px-3 fw-bold" htmlFor="mdp">Mot de passe</label>
                        <input className="form-control" type="password" name="mdp" placeholder="**********" onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <div className="w-100 d-flex justify-content-around">
                        <button className="btn btn-outline-success" onClick={()=>{
                            url(`/Participant/profile/${parId}`)
                        }}>Retourner</button>
                        <input className="btn btn-outline-dark rounded" type="submit" value="Modifier" />
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default ModifierPar;