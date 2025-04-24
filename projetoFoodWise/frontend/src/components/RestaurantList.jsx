import RestaurantCardProfile from "./RestaurantCardProfile"

function RestaurantList({restaurants}){
    return <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
            <RestaurantCardProfile key={index} 
                            name={restaurant.name} 
                            image={restaurant.image}
            />
        ))}
    </div>
}

export default RestaurantList