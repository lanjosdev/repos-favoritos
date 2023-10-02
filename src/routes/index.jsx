// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Main from '../pages/Main';
import Repositorio from "../pages/Repositorio";

// Components:


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Main/> } />
            <Route path='/repositorio/:nameRepo' element={ <Repositorio/> } />            
        </Routes>        
    )
}