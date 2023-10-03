// Funcionalidades / Libs:
import { useState, useCallback, useEffect } from "react";
import API_URL from '../../API/api';
import { Link } from "react-router-dom";

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
    const [errorInput, setErrorInput] = useState(null);

    const [repositorios, setRepositorios] = useState([]);
    const [loadingRepos, setLoadingRepos] = useState(false);

    // Busca ao iniciar:
    useEffect(()=> {
        const reposLocal = localStorage.getItem('reposStorage');
        // console.log(reposLocal);

        if(reposLocal !== null) {
            setRepositorios(JSON.parse(reposLocal));
        }
    }, []);

    // Salva no local ao ter alterações:
    useEffect(()=> {
        localStorage.setItem('reposStorage', JSON.stringify(repositorios))
    }, [repositorios]);

    const handleSubmit = useCallback((e)=> {
        e.preventDefault();

        setLoadingRepos(true);  

        async function submit() {
            try {
                const hasRepo = repositorios.find(repo => repo.name === inputRepo.trim()); //vai receber na const T ot F;
                if(hasRepo) {
                    throw new Error('Repositorio Duplicado!');
                }
                
                const response = await API_URL.get(`repos/${inputRepo}`);
            
                const data = {
                    name: response.data.full_name,
                    page: response.data.homepage,
                }

                setRepositorios([...repositorios, data]);
                setInputRepo('');

            } catch(erro) {

                setErrorInput(true);
                console.log(erro);

            } finally {

                setLoadingRepos(false);
                // setInputRepo('');
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
                    className={`input input-bordered shadow ${errorInput && 'input-error'}`}
                    value={inputRepo}
                    onChange={(e)=> {
                        setErrorInput(null); 
                        setInputRepo(e.target.value);
                    }}
                    required
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
                                
                                <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>{repo.name}</Link>
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