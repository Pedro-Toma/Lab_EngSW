import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RestaurantCard({ restaurant }) {

    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!restaurant?.id) return;

        fetch(`http://localhost:8000/restaurants/${restaurant.id}/restaurant_image`)
        .then(res => {
            if (!res.ok) throw new Error('Imagem não encontrada');
            return res.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        })
        .catch(err => {
            console.error('Erro ao carregar imagem:', err);
            setImageUrl(null);
        });

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [restaurant.id]);


    return (
        <div className="restaurant-card" onClick={() => navigate(`/RestaurantProfile/${restaurant.id}`)}>
            <img src={imageUrl} className="home-res-image"></img>
            <h2>{restaurant.name}</h2>
            <p><strong>Endereço:</strong> {restaurant.address}</p>
            {restaurant.phone && <p><strong>Telefone:</strong> {restaurant.phone}</p>}

            <div className="payment-methods">
                <p><strong>Formas de pagamento:</strong></p>
                <ul>
                    {restaurant.money && <li>Dinheiro</li>}
                    {restaurant.pix && <li>Pix</li>}
                    {restaurant.credit && <li>Crédito</li>}
                    {restaurant.debit && <li>Débito</li>}
                    {restaurant.voucher && <li>Vale</li>}
                </ul>
            </div>

            <div className="opening-hours">
                <p><strong>Horários de Funcionamento:</strong></p>
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => (
                    (restaurant[`${day}_morning_opening`] || restaurant[`${day}_afternoon_opening`]) && (
                        <div key={day}>
                            <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>{" "}
                            {restaurant[`${day}_morning_opening`] && `${restaurant[`${day}_morning_opening`]} - ${restaurant[`${day}_morning_closing`]}`}{" "}
                            {restaurant[`${day}_afternoon_opening`] && `| ${restaurant[`${day}_afternoon_opening`]} - ${restaurant[`${day}_afternoon_closing`]}`}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default RestaurantCard;
