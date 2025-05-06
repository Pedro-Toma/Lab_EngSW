import { Link } from "react-router-dom"

function HomePage(){
    
    return <>
    <h1>Essa é a página inicial</h1>
    <Link to="/ManagerProfile" className="home-page-btn">Manager Profile</Link>
    <Link to="/id/RestaurantProfile" className="home-page-btn">Restaurante</Link>
    </>
}

export default HomePage