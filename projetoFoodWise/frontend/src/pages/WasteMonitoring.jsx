import WasteFrame from "../components/WasteFrame"
import { Link } from 'react-router-dom'

import ChevronsLeft from "../assets/chevronsLeft.png"

function WasteMonitoring(){
    return <div>
        <h1 className="logo-middle">FoodWise</h1>
        <WasteFrame />
        <div className="extra-info-links">
            <Link to="/ManagerProfile" className="go-to-page"><img src={ChevronsLeft}/>Perfil do Gerente</Link>
            <Link to="/ManagerProfile/ManagementData" className="go-to-page"><img src={ChevronsLeft}/>Dados Gerenciais</Link>
        </div>
    </div>
}

export default WasteMonitoring