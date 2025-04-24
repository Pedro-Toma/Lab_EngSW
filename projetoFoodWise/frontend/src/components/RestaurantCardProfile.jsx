import {Link} from 'react-router-dom'

function RestaurantCardProfile(Props) {
    return (
        <div className="restaurant-card-profile">
            <img className="restaurant-profile-img" src={Props.image} />
            
            
            <div className="restaurant-info">
                <div className="restaurant-name-report">
                    <button className="restaurant-name-btn">{Props.name}</button>
                    <button className="private-report-btn">Relatório Privado</button>
                </div>
                <div className="restaurant-data">
                    <Link to="/GeneralData" className="general-data-btn">Dados Gerais</Link>
                    <Link to="/ManagementData" className="management-data-btn">Dados Gerenciais</Link>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCardProfile
