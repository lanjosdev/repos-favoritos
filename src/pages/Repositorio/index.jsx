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

    const [filters, setFilters] = useState([
        {state: 'all', label: 'Todos', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fecahdas', active: false}
    ]);
    const [filterIdx, setFilterIdx] = useState(0);

    const [page, setPage] = useState(1);
    const [notNext, setNotNext] = useState(false);


    useEffect(()=> {

        async function carregaDadosRepo() {
            const [repositorioData, issueData] = await Promise.all([
                API_URL.get(`/repos/${nameRepo}`),
                API_URL.get(`/repos/${nameRepo}/issues`, {
                    params: {
                        state: filters.find((f) => f.active).state, // 'all'
                        per_page: 5
                    }
                })
            ]);

            setRepositorio(repositorioData.data);
            setIssues(issueData.data);
            setLoadingDados(false);
        }
        carregaDadosRepo();

    }, [nameRepo, filters]);


    function handleFilter(idx) {
        console.log(idx);
        console.log(filters[idx].state);
        
        setFilterIdx(idx);
        setPage(1);
        setNotNext(false);        
    }


    useEffect(()=> {
        async function loadIssue() {
            const response = await API_URL.get(`/repos/${nameRepo}/issues`, {
                params: {
                    state: filters[filterIdx].state,
                    page: page,
                    per_page: 5
                },
            });
            // console.log(response.data);

            if(issues !== null) {
                if(response.data === issues) {
                    setNotNext(true);
                    // console.log('dentro');
                    return;
                }
                // console.log('fora');
            }
            
            setIssues(response.data);
        }
        loadIssue();
    }, [filterIdx, filters, nameRepo, page]);

    function handlePage(action) {
        setPage(action === 'next' ? page + 1 : page - 1);
    }


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
                
                {issues.length !== 0 && (
                <div className="filter-list">
                    {filters.map((filter, idx)=> (
                        <button 
                        key={filter.label} 
                        className={`${filterIdx === idx && 'active'}`}
                        // className={`${filter.active && 'active'}`}
                        onClick={()=> handleFilter(idx)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
                )}

                <ul className="IssuesList">
                    {issues.map(issue=> (
                        <li key={issue.id}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />

                            <div>
                                <strong>
                                    <a href={issue.html_url} target="_blank" rel="noreferrer">{issue.title}</a>
                                    {/* <br /> */}
                                    {issue.labels.map(label=> (
                                        <span key={label.id}>{label.name}</span>
                                    ))}
                                </strong>

                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {issues.length !== 0 && (
                <div className="page-actions">
                    <button 
                    onClick={()=> handlePage('back')}
                    disabled={page === 1}
                    >
                        Voltar                                       
                    </button>

                    <button 
                    onClick={()=> handlePage('next')}
                    disabled={notNext}
                    >
                        Próxima
                    </button>
                </div>
                )}


                </>

                )}

            </div>

            </div>
        </main>
    )
}