import HeaderManager from '../components/HeaderManager.jsx'
import ManagerFrame from '../components/ManagerFrame.jsx'
import {Link} from 'react-router-dom'

function ManagerProfile(){
    return <div className="manager-page">
        <div className="manager-profile">
            <HeaderManager />
            <ManagerFrame />
        </div>
        <Link to="/" id="manager-homepage-btn" className="home-page-btn">Página Inicial</Link>
    </div>
}

export default ManagerProfile