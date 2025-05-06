import { Link } from "react-router-dom"

import HorarioFuncionamento from "../components/HorarioFuncionamento"
import RestaurantInfo from "../components/RestaurantInfo"

function RestaurantProfile(){

    const restaurant = { name: "Green Day", image: "GreenDay", address: "Rua Verde, 1820, Pinheiros", rating: "2", price: "2", sustentability: "4"}

    return <div className="restaurante-profile-page">
        <h1 className="logo">FoodWise</h1>
        <div className="restaurant-profile" restaurant={restaurant}>
            <HorarioFuncionamento />
            <RestaurantInfo restaurant={restaurant}/>
        </div>
        <Link to="/" id="restaurant-homepage-btn"className="home-page-btn">Página Inicial</Link>
    </div>
}

export default RestaurantProfile