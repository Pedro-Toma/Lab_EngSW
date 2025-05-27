import StarRating from "./StarRating"
import PriceIndex from "./PriceIndex"
import { Link } from "react-router-dom";

function RestaurantInfo({restaurant, imageUrl}){

    const res_image = `/assets/${restaurant.id}.jpg`;

    console.log(restaurant)
    return <div className="restaurant-info-container">
        <h1>{restaurant.name}</h1>
        <div className="restaurant-img-ratings">
            <div>
                <img className="restaurant-prof-img" src={imageUrl} />
            </div>
            <div className="restaurant-ratings">
                <h2>Avaliação: <StarRating rating={restaurant.rating} /></h2>
                <h2>Preço: <PriceIndex index={restaurant.price} /></h2>
                <h2 id="sustentability">Sustentabilidade: <StarRating rating={restaurant.sustentability} /></h2>
                <h2>Endereço: {restaurant.address}</h2>
                <Link to={`/RestaurantProfile/${restaurant.id}/Menu`} className="menu-report-btn-manager">Cardápio</Link>
            </div>
        </div>
    </div>
}

export default RestaurantInfo