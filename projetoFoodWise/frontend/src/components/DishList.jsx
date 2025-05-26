import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DishList() {
    const { restaurant_id } = useParams();
    const [dishes, setDishes] = useState([]);
    const [formData, setFormData] = useState({ name: "", ingredients: "", price: "" });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchDishes();
    }, [restaurant_id]);

    const fetchDishes = async () => {
        const response = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/menu`);
        const data = await response.json();
        setDishes(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `http://localhost:8000/restaurant/${restaurant_id}/menu`;
        const body = JSON.stringify(formData);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.detail || "Erro ao adicionar prato.");
                return;
            }

            const result = await response.json();
            setDishes([...dishes, result]);
            setFormData({ name: "", ingredients: "", price: "" });

        } catch (error) {
            console.error(error);
            alert("Erro na requisição.");
        }
    };

    const handleDelete = async (name) => {

        const response = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/menu`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            setDishes(dishes.filter(d => d.name !== name));
        } else {
            const err = await response.json();
            alert(err.detail || "Erro ao deletar prato.");
        }
    };

    return (
        <div className="dish-form">
            <div className="pratos">
                {dishes.map((dish) => (
                    <div className="prato">
                        <h1>{dish.name}</h1>
                        <p>Preço: R${dish.price.toFixed(2)}</p>
                        <p>{dish.ingredients}</p>
                        <button onClick={() => handleDelete(dish.name)}>Remover</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="dish-add">
                <h2>Adicionar novo prato</h2>
                <div className="name-price-dish">
                    <input type="text" name="name" placeholder="Nome" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    <input type="number" name="price" placeholder="Preço" step="0.01" value={formData.price}
                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || "" })} required />
                </div>
                <input type="text" name="ingredients" placeholder="Ingredientes" value={formData.ingredients}
                onChange={e => setFormData({ ...formData, ingredients: e.target.value })} required />
                <button type="submit">Adicionar prato</button>
            </form>
        </div>
    );
}

export default DishList;
