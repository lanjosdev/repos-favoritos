// Funcionalidades / Libs:
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import API_URL from "../../API/api";

// Assets:
import { FaArrowLeft } from 'react-icons/fa';

// Estilo:
import './repositorio.scss';


export default function Repositorio() {
    const { nameRepo } = useParams();

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loadingDados, setLoadingDados] = useState(true);

    useEffect(()=> {

        async function carregaDadosRepo() {
            const [repositorioData, issueData] = await Promise.all([
                API_URL.get(`/repos/${nameRepo}`),
                API_URL.get(`/repos/${nameRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);

            setRepositorio(repositorioData.data);
            setIssues(issueData.data);
            setLoadingDados(false);
        }
        carregaDadosRepo();

    }, [nameRepo]);

    return (
        <main className="Page-repositorio">
            <div className="grid">

            <div className={`card ${loadingDados && 'flex justify-center items-center'}`}>
                {loadingDados ? (

                <h1 className="my-32">Carregando dados...</h1>

                ) : (
                
                <>
                <Link to='/'>
                    <FaArrowLeft size={25}/>
                </Link>

                <div className="owner">
                    <img 
                    src={repositorio.owner.avatar_url} 
                    alt={repositorio.owner.login} 
                    />

                    <h1>{repositorio.name}</h1>
                    
                    <p>{repositorio.description}</p>
                </div>
                </>

                )}

            </div>

            </div>
        </main>
    )
}