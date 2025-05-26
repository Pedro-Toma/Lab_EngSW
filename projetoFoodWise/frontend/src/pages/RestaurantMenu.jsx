import { Link,useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import DishList from '../components/DishList';

function RestaurantMenu(){

        const [imageUrl, setImageUrl] = useState(null);
        const { restaurant_id } = useParams();
        const [dishes, setDishes] = useState([]);

        useEffect(() => {
            async function fetchImage() {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8000/restaurants/${restaurant_id}/menu_image`, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }  
                })
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                }
                }
            fetchImage();
        }, [restaurant_id]);

    const handleAddDish = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = parseFloat(e.target.price.value);
        const ingredients = e.target.ingredients.value;

        if (!name.trim()) return;

        const token = localStorage.getItem("token");
        const newDish = { name, price, ingredients };

        try {
            const response = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/menu`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newDish)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro ao adicionar prato: ${errorData.detail}`);
                return;
            }

            const createdDish = await response.json();
            setDishes([...dishes, createdDish]);
            e.target.reset();

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de rede ou servidor.");
        }
    };

    return <div>
        <h1 className="logo">FoodWise</h1>
        <div className="menu-container">
            <div className="menu-side">
                <img src={imageUrl}></img>
                <div className="menu-links">
                    <Link to="/ManagerProfile" className="home-page-btn">Manager Profile</Link>
                    <Link to="/" className="home-page-btn">Página Inicial</Link>
                </div>
            </div>
            <div className="frame-menu">
                <h1>Menu</h1>
                <DishList />
            </div>
        </div>
    </div>
}

export default RestaurantMenu