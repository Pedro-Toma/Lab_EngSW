import Header from '../components/Header.jsx'
import ManagerFrame from '../components/ManagerFrame.jsx'
import {Link} from 'react-router-dom'

function ManagerProfile(){
    return <>
        <Header />
        <ManagerFrame />
        <Link to="/HomePage" className="home-page-btn">Página Inicial</Link>
    </>
}

export default ManagerProfile