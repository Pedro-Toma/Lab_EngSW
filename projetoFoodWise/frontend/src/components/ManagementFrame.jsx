import {Link,useParams} from 'react-router-dom'

function ManagementFrame(){

    const { restaurant_id } = useParams();

    return <div className="frame-management-data">
            <h1>Dados Gerenciais</h1>
            <Link to={`/ManagerProfile/${restaurant_id}/ManagementData/OperationalInfo`} className="link-btn">Informações Operacionais</Link>
            <Link to={`/ManagerProfile/${restaurant_id}/ManagementData/WasteMonitoring`} className="link-btn">Monitoramento de Desperdício</Link>
            <Link to={`/ManagerProfile/${restaurant_id}/ManagementData/FinancialManagement`} className="link-btn">Gestão Financeira</Link>
    </div>
}

export default ManagementFrame