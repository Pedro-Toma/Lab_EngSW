import HeaderManager from '../components/HeaderManager.jsx'
import ManagerFrame from '../components/ManagerFrame.jsx'
import {Link} from 'react-router-dom'

function ManagerProfile(){
    return <div className="manager-page">
        <h1 className="logo">FoodWise</h1>
        <div className="manager-profile">
            <img className="profile_image" src="./src/assets/icone_perfil.png" />
            <ManagerFrame />
        </div>
        <div className="container-home-btn">
            <Link to="/" id="manager-homepage-btn" className="home-page-btn">Página Inicial</Link>
        </div>
    </div>
}

export default ManagerProfile