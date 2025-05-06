import StarRating from "./StarRating"
import PriceIndex from "./PriceIndex"

function RestaurantInfo({restaurant}){

    const res_image = `/assets/${restaurant.image}.jpg`;

    return <div className="restaurant-info-container">
        <h1>{restaurant.name}</h1>
        <div className="restaurant-img-ratings">
            <div>
                <img className="restaurant-prof-img" src={res_image} />
            </div>
            <div className="restaurant-ratings">
                <h2>Avaliação: <StarRating rating={restaurant.rating} /></h2>
                <h2>Preço: <PriceIndex index={restaurant.price} /></h2>
                <h2 id="sustentability">Sustentabilidade: <StarRating rating={restaurant.sustentability} /></h2>
                <h2>Endereço: {restaurant.address}</h2>
                <button className="menu-btn">Cardápio</button>
            </div>
        </div>
    </div>
}

export default RestaurantInfo