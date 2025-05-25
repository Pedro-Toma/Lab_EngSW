import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

import HorarioFuncionamento from "../components/HorarioFuncionamento"
import RestaurantInfo from "../components/RestaurantInfo"

function RestaurantProfile(){

    const [restaurant, setRestaurant] = useState(null)
    const [error, setError] = useState(null)
    const { restaurant_id } = useParams();
    
    useEffect(() => {
        async function fetchRestaurant(){
            try{
                const response = await fetch(`http://localhost:8000/restaurant/${restaurant_id}`, {
                    method: 'GET',
                    cache: 'no-store'
                })
                if (!response.ok) {
                    setError(`HTTP error: ${response.status}`)
                    throw new Error(`HTTP error: ${response.status}`)
                } 
                const data = await response.json()
                setRestaurant(data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchRestaurant()

    }, [restaurant_id])

    return <div className="restaurante-profile-page">
        <h1 className="logo">FoodWise</h1>
        <div className="restaurant-profile">
            {restaurant ? (
                <>
                    <HorarioFuncionamento restaurant={restaurant}/>
                    <RestaurantInfo restaurant={restaurant} />
                </>
            ) : error ? (
                <p> {error} </p>
            ) : (
                <p> Loading... </p>
            )}
        </div>
        <Link to="/" id="restaurant-homepage-btn"className="home-page-btn">Página Inicial</Link>
    </div>
}

export default RestaurantProfile