// Funcionalidades / Libs:
import { BrowserRouter } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Contexts Providers:
// import UserProvider from './contexts/userContext';

// Componentes:
import { AppRoutes } from './routes';

//Estilo Global:
import './styles/global.scss';
// import './App.scss'


export default function App() {

  return (
    <BrowserRouter>

      <AppRoutes />

    </BrowserRouter>
  )
}