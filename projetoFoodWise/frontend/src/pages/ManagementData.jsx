import ManagementFrame from "../components/ManagementFrame.jsx"
import {Link} from 'react-router-dom'

import ChevronsLeft from "../assets/chevronsLeft.png"

function ManagementData(){
    return <>
        <h1 className="logo-middle">FoodWise</h1>
        <ManagementFrame />
        <div className="management-links">
            <Link to="/GeneralData" className="go-to-page"><img src={ChevronsLeft}/>Dados Gerais</Link>
            <Link to="/" className="go-to-page"><img src={ChevronsLeft}/>Perfil do Gerente</Link>
        </div>
    </>
}

export default ManagementData