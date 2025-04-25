import {Link} from 'react-router-dom'

function ManagementFrame(){

    return <div className="frame-management-data">
            <h1>Dados Gerenciais</h1>
            <Link to="/ManagementData/OperationalInfo" className="link-btn">Informações Operacionais</Link>
            <Link to="/ManagementData/WasteMonitoring" className="link-btn">Monitoramento de Desperdício</Link>
            <Link to="/ManagementData/FinancialManagement" className="link-btn">Gestão Financeira</Link>
    </div>
}

export default ManagementFrame