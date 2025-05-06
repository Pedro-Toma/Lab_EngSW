import GeneralFrame from "../components/GeneralFrame"
import { Link } from "react-router-dom"

import ChevronsLeft from "../assets/chevronsLeft.png"
import ChevronsRight from "../assets/chevronsRight.png"

function GeneralData(){
    return <div>
        <h1 className="logo-middle">FoodWise</h1>
        <GeneralFrame />
        <div className="general-links">
            <Link to="/ManagerProfile" className="go-to-page"><img src={ChevronsLeft}/>Perfil do Gerente</Link>
            <Link to="/ManagerProfile/ManagementData" className="go-to-page">Dados Gerenciais<img src={ChevronsRight}/></Link>
        </div>
    </div>
}

export default GeneralData