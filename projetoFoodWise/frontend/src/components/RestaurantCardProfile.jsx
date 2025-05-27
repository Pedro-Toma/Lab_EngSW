import { Link,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react';

import trash from "../assets/trash.png"

function RestaurantCardProfile({name, image, restaurant_id, removeRestaurant}) {

    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchImage() {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/restaurants/${restaurant_id}/restaurant_image`, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    'Authorization': `Bearer ${token}`
                }  
            })
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            }
            }
        fetchImage();
    }, [restaurant_id]);

    return (
        <div className="restaurant-card-profile">
            <img className="restaurant-profile-img" src={imageUrl} onClick={() => navigate(`/RestaurantProfile/${restaurant_id}`)}/>
            
            
            <div className="restaurant-info">
                <div className="restaurant-name-report">
                    <button className="restaurant-name-btn" onClick={() => navigate(`/RestaurantProfile/${restaurant_id}`)}>{name}</button>
                    <Link to={`/RestaurantProfile/${restaurant_id}/Menu`} className="menu-report-btn-manager">Cardápio</Link>
                    <Link to={`/RestaurantProfile/${restaurant_id}/ReportPage`} className="menu-report-btn-manager">Relatório</Link>
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
