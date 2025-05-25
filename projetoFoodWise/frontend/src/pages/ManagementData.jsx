import ManagementFrame from "../components/ManagementFrame.jsx"
import { Link,useParams } from 'react-router-dom'

import ChevronsLeft from "../assets/chevronsLeft.png"

function ManagementData(){
    const { restaurant_id } = useParams();
    return <>
        <h1 className="logo-middle">FoodWise</h1>
        <ManagementFrame />
        <div className="management-links">
            <Link to={`/ManagerProfile/${restaurant_id}/GeneralData`} className="go-to-page"><img src={ChevronsLeft}/>Dados Gerais</Link>
            <Link to="/ManagerProfile" className="go-to-page"><img src={ChevronsLeft}/>Perfil do Gerente</Link>
        </div>
    </>
}

export default ManagementData