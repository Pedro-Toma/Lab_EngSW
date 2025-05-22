import { Link } from "react-router-dom"
import OpInfoFrame from "../components/OpInfoFrame"

import ChevronsLeft from "../assets/chevronsLeft.png"

function InfoOp(){
    return <div>
        <h1 className="logo-middle">FoodWise</h1>
        <OpInfoFrame />
        <div className="extra-info-links">
            <Link to="/ManagerProfile" className="go-to-page"><img src={ChevronsLeft}/>Perfil do Gerente</Link>
            <Link to="/ManagerProfile/ManagementData" className="go-to-page"><img src={ChevronsLeft}/>Dados Gerenciais</Link>
        </div>
    </div>
}

export default InfoOp