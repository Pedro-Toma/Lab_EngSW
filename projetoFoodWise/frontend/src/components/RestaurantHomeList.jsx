import React from 'react';
import RestaurantCard from './RestaurantCard.jsx';

function RestaurantHomeList({ restaurants }) {
    console.log(restaurants)
    return (
        <div className="restaurant-list">
            {restaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );
}

export default RestaurantHomeList;
