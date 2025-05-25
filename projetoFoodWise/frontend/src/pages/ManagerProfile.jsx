import LogoutButton from '../components/LogoutButton.jsx';
import ManagerFrame from '../components/ManagerFrame.jsx'
import { Link,useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

function ManagerProfile(){

    const [restaurants, setRestaurants] = useState([]);
    const [managerId, setManagerId] = useState(null);
    const navigate = useNavigate();

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/Login", { replace: true });
            return;
        }
        const decoded = parseJwt(token);
        if (decoded) {
            setManagerId(decoded.id);
        } else {
            console.error("Token inválido");
            localStorage.removeItem("token");
            navigate("/Login", { replace: true });
        }
    }, []);

    async function fetchRestaurants(managerId) {
        const token = localStorage.getItem("token");

        if (!token) {
            return
        }

        const response = await fetch(`http://localhost:8000/manager/${managerId}/restaurants`,{
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        const data = await response.json();
        console.log("Restaurantes recebidos:", data);
        setRestaurants(data);
    }

    useEffect(() => {
        if (managerId) {
            fetchRestaurants(managerId);
        }
    }, [managerId]);

    const refreshRestaurants = () => {
        if(managerId) {
            fetchRestaurants(managerId);
        }
    };

    return <div className="manager-page">
        <h1 className="logo">FoodWise</h1>
        <div className="manager-profile">
            <img className="profile_image" src="./src/assets/icone_perfil.png" />
            <ManagerFrame restaurants={restaurants} refreshRestaurants={refreshRestaurants}/>
        </div>
        <div className="container-home-btn">
            <Link to="/" id="manager-homepage-btn" className="home-page-btn">Página Inicial</Link>
            <LogoutButton />
        </div>
    </div>
}

export default ManagerProfile