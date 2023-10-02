// Funcionalidades / Libs:
import { useState, useCallback } from "react";
import API_URL from '../../API/api';

// Contexts:
// import { UserContext } from "../../contexts/userContext";

// Components:
// import { Header } from '../../components/Header';
// import { ModalMedia } from "../../components/Modal/ModalMedia/modalMedia";

// Assets:
import { FaGithub, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

// Estilo:
import './main.scss';

export default function Main() {
    const [inputRepo, setInputRepo] = useState('');

    const [repositorios, setRepositorios] = useState([]);
    const [loadingRepos, setLoadingRepos] = useState(false);


    const handleSubmit = useCallback((e)=> {
        e.preventDefault();

        setLoadingRepos(true);  

        async function submit() {
                      
            try {
                const response = await API_URL.get(`repos/${inputRepo}`);
            
                const data = {
                    name: response.data.full_name,
                    page: response.data.homepage,
                }

                setRepositorios([...repositorios, data]);
            } finally {
                setLoadingRepos(false);
                setInputRepo('');
            }
        }
        submit();        

    }, [inputRepo, repositorios]);

    const handleDelete = useCallback((repoName)=> {
        const find = repositorios.filter(item => item.name !== repoName); 
        
        setRepositorios(find);
    }, [repositorios]);

    
    return (
        <main className='Page-Main'>
            <div className="grid">

            <div className="card">
                <h1>
                    <FaGithub size={25}/>
                    <span>Repositorios Favoritos</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    placeholder='Adicionar Repositorio' 
                    className="input input-bordered shadow"
                    value={inputRepo}
                    onChange={(e)=> setInputRepo(e.target.value)}
                    />

                    <button 
                    type="submit" 
                    className={`btn btn-primary shadow ${loadingRepos && 'load'}`}>
                        {loadingRepos ? 
                            <span className="loading loading-spinner"></span>
                        :
                            <FaPlus size={20}/>
                        }
                    </button>
                </form>

                <ul>
                    {repositorios.map((repo)=> (
                        <li key={repo.name}>
                            <div>
                                <div className="tooltip" data-tip="Deletar">
                                    <button 
                                    onClick={()=> handleDelete(repo.name)} className="btn btn-square btn-outline">
                                        <AiOutlineClose size={15}/>
                                    </button>
                                </div>
                                
                                <span>{repo.name}</span>
                            </div>

                            <a href={repo.page} target="blank">
                                <FaExternalLinkAlt size={20}/>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>     

            </div>
        </main>
    )        
}