import WasteFrame from "../components/WasteFrame"
import { Link } from 'react-router-dom'

import ChevronsLeft from "../assets/chevronsLeft.png"

function WasteMonitoring(){
    return <div>
        <h1 className="logo-middle">FoodWise</h1>
        <WasteFrame />
        <div className="waste-links">
            <Link to="/" className="go-to-page"><img src={ChevronsLeft}/>Perfil do Gerente</Link>
            <Link to="/ManagementData" className="go-to-page"><img src={ChevronsLeft}/>Dados Gerenciais</Link>
        </div>
    </div>
}

export default WasteMonitoring