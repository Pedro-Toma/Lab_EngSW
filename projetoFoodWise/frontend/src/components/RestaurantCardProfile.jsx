import {Link} from 'react-router-dom'

import trash from "../assets/trash.png"

function RestaurantCardProfile({name, image, restaurant_id, removeRestaurant}) {

    const res_image = `/assets/${image}.jpg`;

    return (
        <div className="restaurant-card-profile">
            <img className="restaurant-profile-img" src={res_image} />
            
            
            <div className="restaurant-info">
                <div className="restaurant-name-report">
                    <button className="restaurant-name-btn">{name}</button>
                    <button className="private-report-btn">Relatório Privado</button>
                </div>
                <div className="restaurant-data">
                    <Link to={`/ManagerProfile/${restaurant_id}/GeneralData`} className="general-data-btn">Dados Gerais</Link>
                    <Link to={`/ManagerProfile/${restaurant_id}/ManagementData`} className="management-data-btn">Dados Gerenciais</Link>
                    <button className="restaurant-delete-btn" onClick={() => removeRestaurant(restaurant_id)}><img src={trash}/></button>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCardProfile
