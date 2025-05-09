import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

import HorarioFuncionamento from "../components/HorarioFuncionamento"
import RestaurantInfo from "../components/RestaurantInfo"

function RestaurantProfile(){

    const [restaurant, setRestaurant] = useState(null)
    const [error, setError] = useState(null)
    const { id } = useParams();
    // const restaurant = { name: "Green Day", image: "GreenDay", address: "Rua Verde, 1820, Pinheiros", rating: "2", price: "2", sustentability: "4"}

    useEffect(() => {
        async function fetchRestaurant(){
            try{
                const response = await fetch(`http://localhost:8000/restaurant/${id}`, {
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

    }, [id])

    return <div className="restaurante-profile-page">
        <h1 className="logo">FoodWise</h1>
        <div className="restaurant-profile">
            <HorarioFuncionamento />
            {restaurant ? (
                <RestaurantInfo restaurant={restaurant} />
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