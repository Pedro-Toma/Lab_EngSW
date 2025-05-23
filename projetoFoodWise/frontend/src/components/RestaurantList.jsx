import RestaurantCardProfile from "./RestaurantCardProfile"

function RestaurantList({restaurants,removeRestaurant}){
    return <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
            <RestaurantCardProfile key={index} 
                            name={restaurant.name} 
                            image={restaurant.image}
                            removeRestaurant={() => removeRestaurant(restaurant.id)}
            />
        ))}
    </div>
}

export default RestaurantList