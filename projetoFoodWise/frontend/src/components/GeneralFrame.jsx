import Cardapio from "./Cardapio"
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import menu from '../assets/ImagemMenu.png';
import restaurante from '../assets/ImagemRestaurante.png';

function GeneralFrame(){

    const [managerId, setManagerId] = useState(null)
    const [error, setError] = useState(null)
    const { restaurant_id } = useParams()
    const navigate = useNavigate()
    const [menuImage, setMenuImage] = useState(null);
    const [restaurantImage, setRestaurantImage] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        neighborhood: "",
        number: "",
        phone: "",
        money: false,
        pix: false,
        credit: false,
        debit: false,
        voucher: false,
        monday_morning_opening: "",
        monday_morning_closing: "",
        monday_afternoon_opening: "",
        monday_afternoon_closing: "",
        tuesday_morning_opening: "",
        tuesday_morning_closing: "",
        tuesday_afternoon_opening: "",
        tuesday_afternoon_closing: "",
        wednesday_morning_opening: "",
        wednesday_morning_closing: "",
        wednesday_afternoon_opening: "",
        wednesday_afternoon_closing: "",
        thursday_morning_opening: "",
        thursday_morning_closing: "",
        thursday_afternoon_opening: "",
        thursday_afternoon_closing: "",
        friday_morning_opening: "",
        friday_morning_closing: "",
        friday_afternoon_opening: "",
        friday_afternoon_closing: "",
        saturday_morning_opening: "",
        saturday_morning_closing: "",
        saturday_afternoon_opening: "",
        saturday_afternoon_closing: "",
        sunday_morning_opening: "",
        sunday_morning_closing: "",
        sunday_afternoon_opening: "",
        sunday_afternoon_closing: ""
    })

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

    useEffect(() => {
        async function fetchRestaurant(){
            if (restaurant_id == -1) return
            try{
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8000/restaurant/${restaurant_id}`, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }       
                })
                if (!response.ok) {
                    setError(`HTTP error: ${response.status}`)
                    throw new Error(`HTTP error: ${response.status}`)
                } 
                const data = await response.json()
                
                const [address, neighborhood, number] = data.address.split(",").map(s => s.trim());

                setFormData({
                    name: data.name || "",
                    address: address,
                    neighborhood: neighborhood,
                    number: number,
                    phone: data.phone || "",
                    money: data.money || false,
                    pix: data.pix || false,
                    credit: data.credit || false,
                    debit: data.debit || false,
                    voucher: data.voucher || false,
                    monday_morning_opening: data.monday_morning_opening || "",
                    monday_morning_closing: data.monday_morning_closing || "",
                    monday_afternoon_opening: data.monday_afternoon_opening || "",
                    monday_afternoon_closing: data.monday_afternoon_closing || "",
                    tuesday_morning_opening: data.tuesday_morning_opening || "",
                    tuesday_morning_closing: data.tuesday_morning_closing || "",
                    tuesday_afternoon_opening: data.tuesday_afternoon_opening || "",
                    tuesday_afternoon_closing: data.tuesday_afternoon_closing || "",
                    wednesday_morning_opening: data.wednesday_morning_opening || "",
                    wednesday_morning_closing: data.wednesday_morning_closing || "",
                    wednesday_afternoon_opening: data.wednesday_afternoon_opening || "",
                    wednesday_afternoon_closing: data.wednesday_afternoon_closing || "",
                    thursday_morning_opening: data.thursday_morning_opening || "",
                    thursday_morning_closing: data.thursday_morning_closing || "",
                    thursday_afternoon_opening: data.thursday_afternoon_opening || "",
                    thursday_afternoon_closing: data.thursday_afternoon_closing || "",
                    friday_morning_opening: data.friday_morning_opening || "",
                    friday_morning_closing: data.friday_morning_closing || "",
                    friday_afternoon_opening: data.friday_afternoon_opening || "",
                    friday_afternoon_closing: data.friday_afternoon_closing || "",
                    saturday_morning_opening: data.saturday_morning_opening || "",
                    saturday_morning_closing: data.saturday_morning_closing || "",
                    saturday_afternoon_opening: data.saturday_afternoon_opening || "",
                    saturday_afternoon_closing: data.saturday_afternoon_closing || "",
                    sunday_morning_opening: data.sunday_morning_opening || "",
                    sunday_morning_closing: data.sunday_morning_closing || "",
                    sunday_afternoon_opening: data.sunday_afternoon_opening || "",
                    sunday_afternoon_closing: data.sunday_afternoon_closing || ""
                });


            } catch (err) {
                setError(err.message)
            }
        }
    
        fetchRestaurant()
    
    }, [restaurant_id])

    function handleChange(e) {
        const { name, type, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            manager_id: managerId,
            name: formData.get("name"),
            address: `${formData.get("address")}, ${formData.get("neighborhood")}, ${formData.get("number")}`,
            phone: formData.get("phone"),
            money: formData.get("money") === "on",
            pix: formData.get("pix") === "on",
            credit: formData.get("credit") === "on",
            debit: formData.get("debit") === "on",
            voucher: formData.get("voucher") === "on",
            monday_morning_opening: formData.get("monday_morning_opening"),
            monday_morning_closing: formData.get("monday_morning_closing"),
            monday_afternoon_opening: formData.get("monday_afternoon_opening"),
            monday_afternoon_closing: formData.get("monday_afternoon_closing"),
            tuesday_morning_opening: formData.get("tuesday_morning_opening"),
            tuesday_morning_closing: formData.get("tuesday_morning_closing"),
            tuesday_afternoon_opening: formData.get("tuesday_afternoon_opening"),
            tuesday_afternoon_closing: formData.get("tuesday_afternoon_closing"),
            wednesday_morning_opening: formData.get("wednesday_morning_opening"),
            wednesday_morning_closing: formData.get("wednesday_morning_closing"),
            wednesday_afternoon_opening: formData.get("wednesday_afternoon_opening"),
            wednesday_afternoon_closing: formData.get("wednesday_afternoon_closing"),
            thursday_morning_opening: formData.get("thursday_morning_opening"),
            thursday_morning_closing: formData.get("thursday_morning_closing"),
            thursday_afternoon_opening: formData.get("thursday_afternoon_opening"),
            thursday_afternoon_closing: formData.get("thursday_afternoon_closing"),
            friday_morning_opening: formData.get("friday_morning_opening"),
            friday_morning_closing: formData.get("friday_morning_closing"),
            friday_afternoon_opening: formData.get("friday_afternoon_opening"),
            friday_afternoon_closing: formData.get("friday_afternoon_closing"),
            saturday_morning_opening: formData.get("saturday_morning_opening"),
            saturday_morning_closing: formData.get("saturday_morning_closing"),
            saturday_afternoon_opening: formData.get("saturday_afternoon_opening"),
            saturday_afternoon_closing: formData.get("saturday_afternoon_closing"),
            sunday_morning_opening: formData.get("sunday_morning_opening"),
            sunday_morning_closing: formData.get("sunday_morning_closing"),
            sunday_afternoon_opening: formData.get("sunday_afternoon_opening"),
            sunday_afternoon_closing: formData.get("sunday_afternoon_closing"),
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/restaurant/${restaurant_id === '-1' ? '' : restaurant_id}`, {
                method: restaurant_id === '-1' ? 'POST' : 'PUT',  // criar novo ou atualizar
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }); 
            console.log(data)
            const responseData = await response.json();
            let finalRestaurantId = restaurant_id;
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            if (restaurant_id === '-1') {
                finalRestaurantId = responseData.id;
            } else {
                finalRestaurantId = restaurant_id
                alert("Dados atualizados com sucesso!");
            }

            const formImages = new FormData();
            if (menuImage) formImages.append("menu_image", menuImage);
            if (restaurantImage) formImages.append("restaurant_image", restaurantImage);

            const responseImages = await fetch(`http://localhost:8000/restaurants/${finalRestaurantId}/images`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formImages,
            });

            if (!responseImages.ok) {
                throw new Error("Erro ao atualizar imagens");
            }

        } catch (error) {
            setError(error.message);
            alert("Erro ao salvar: " + error.message);
        }
    }

    return <div className="frame-general-data">
        <h1>Dados Gerais do Restaurante</h1>
        <form className="form-general-data" onSubmit={handleSubmit}> 

            <label htmlFor="name">Nome </label>
            <input type="text" id="name" name="name" placeholder="Nome" minLength="2" maxLength="15" value={formData.name} onChange={handleChange} required/>
            
            <label htmlFor="address">Endereço completo </label>
            <input type="text" id="address" name="address" placeholder="Rua" maxLength="40" value={formData.address} onChange={handleChange} required/>
            <input type="text" id="neighborhood" name="neighborhood" placeholder="Bairro" maxLength="40" value={formData.neighborhood} onChange={handleChange} required/>
            <input type="number" id="number" name="number" placeholder="Número" onChange={handleChange} value={formData.number} required/>

            <label htmlFor="phone">Telefone </label>
            <input type="tel" id="phone" name="phone" placeholder="ex: (ddd)1234-5678" pattern="\(\d{2}\)\d{4,5}-\d{4}" minLength="5" maxLength="15" value={formData.phone} onChange={handleChange} required/>
            
            <h2>Formas de Pagamento </h2>
            <div className="payment">
                <label htmlFor="money">Dinheiro </label>
                <input type="checkbox" id="money" name="money" checked={formData.money} onChange={handleChange} />

                <label htmlFor="pix">Pix </label>
                <input type="checkbox" id="pix" name="pix" checked={formData.pix} onChange={handleChange}/>

                <label htmlFor="debit">Débito </label>
                <input type="checkbox" id="debit" name="debit" checked={formData.debit} onChange={handleChange}/>

                <label htmlFor="credit">Crédito </label>
                <input type="checkbox" id="credit" name="credit" checked={formData.credit} onChange={handleChange}/>

                <label htmlFor="voucher">Vale </label>
                <input type="checkbox" id="voucher" name="voucher" checked={formData.voucher} onChange={handleChange}/>
            </div>
            <h2>Horário de Funcionamento</h2>
            <div className="working-hours">
                <div className="day">
                    <h1>Segunda</h1>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="monday_morning_opening">Manhã<br />Abertura</label>
                            <input
                                type="time"
                                id="monday_morning_opening"
                                name="monday_morning_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.monday_morning_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="monday_morning_closing">Manhã<br />Fechamento</label>
                            <input
                                type="time"
                                id="monday_morning_closing"
                                name="monday_morning_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.monday_morning_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="monday_afternoon_opening">Tarde<br />Abertura</label>
                            <input
                                type="time"
                                id="monday_afternoon_opening"
                                name="monday_afternoon_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.monday_afternoon_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="monday_afternoon_closing">Tarde<br />Fechamento</label>
                            <input
                                type="time"
                                id="monday_afternoon_closing"
                                name="monday_afternoon_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.monday_afternoon_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="day">
                    <h1>Terça</h1>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="tuesday_morning_opening">Manhã<br />Abertura</label>
                            <input
                                type="time"
                                id="tuesday_morning_opening"
                                name="tuesday_morning_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.tuesday_morning_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="tuesday_morning_closing">Manhã<br />Fechamento</label>
                            <input
                                type="time"
                                id="tuesday_morning_closing"
                                name="tuesday_morning_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.tuesday_morning_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="tuesday_afternoon_opening">Tarde<br />Abertura</label>
                            <input
                                type="time"
                                id="tuesday_afternoon_opening"
                                name="tuesday_afternoon_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.tuesday_afternoon_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="tuesday_afternoon_closing">Tarde<br />Fechamento</label>
                            <input
                                type="time"
                                id="tuesday_afternoon_closing"
                                name="tuesday_afternoon_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.tuesday_afternoon_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="day">
                    <h1>Quarta</h1>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="wednesday_morning_opening">Manhã<br />Abertura</label>
                            <input
                                type="time"
                                id="wednesday_morning_opening"
                                name="wednesday_morning_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.wednesday_morning_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="wednesday_morning_closing">Manhã<br />Fechamento</label>
                            <input
                                type="time"
                                id="wednesday_morning_closing"
                                name="wednesday_morning_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.wednesday_morning_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="wednesday_afternoon_opening">Tarde<br />Abertura</label>
                            <input
                                type="time"
                                id="wednesday_afternoon_opening"
                                name="wednesday_afternoon_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.wednesday_afternoon_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="wednesday_afternoon_closing">Tarde<br />Fechamento</label>
                            <input
                                type="time"
                                id="wednesday_afternoon_closing"
                                name="wednesday_afternoon_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.wednesday_afternoon_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="day">
                    <h1>Quinta</h1>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="thursday_morning_opening">Manhã<br />Abertura</label>
                            <input
                                type="time"
                                id="thursday_morning_opening"
                                name="thursday_morning_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.thursday_morning_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="thursday_morning_closing">Manhã<br />Fechamento</label>
                            <input
                                type="time"
                                id="thursday_morning_closing"
                                name="thursday_morning_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.thursday_morning_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="thursday_afternoon_opening">Tarde<br />Abertura</label>
                            <input
                                type="time"
                                id="thursday_afternoon_opening"
                                name="thursday_afternoon_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.thursday_afternoon_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="thursday_afternoon_closing">Tarde<br />Fechamento</label>
                            <input
                                type="time"
                                id="thursday_afternoon_closing"
                                name="thursday_afternoon_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.thursday_afternoon_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="day">
                    <h1>Sexta</h1>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="friday_morning_opening">Manhã<br />Abertura</label>
                            <input
                                type="time"
                                id="friday_morning_opening"
                                name="friday_morning_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.friday_morning_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="friday_morning_closing">Manhã<br />Fechamento</label>
                            <input
                                type="time"
                                id="friday_morning_closing"
                                name="friday_morning_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.friday_morning_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="friday_afternoon_opening">Tarde<br />Abertura</label>
                            <input
                                type="time"
                                id="friday_afternoon_opening"
                                name="friday_afternoon_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.friday_afternoon_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="friday_afternoon_closing">Tarde<br />Fechamento</label>
                            <input
                                type="time"
                                id="friday_afternoon_closing"
                                name="friday_afternoon_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.friday_afternoon_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="day">
                    <h1>Sábado</h1>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="saturday_morning_opening">Manhã<br />Abertura</label>
                            <input
                                type="time"
                                id="saturday_morning_opening"
                                name="saturday_morning_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.saturday_morning_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="saturday_morning_closing">Manhã<br />Fechamento</label>
                            <input
                                type="time"
                                id="saturday_morning_closing"
                                name="saturday_morning_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.saturday_morning_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="saturday_afternoon_opening">Tarde<br />Abertura</label>
                            <input
                                type="time"
                                id="saturday_afternoon_opening"
                                name="saturday_afternoon_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.saturday_afternoon_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="saturday_afternoon_closing">Tarde<br />Fechamento</label>
                            <input
                                type="time"
                                id="saturday_afternoon_closing"
                                name="saturday_afternoon_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.saturday_afternoon_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="day">
                    <h1>Domingo</h1>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="sunday_morning_opening">Manhã<br />Abertura</label>
                            <input
                                type="time"
                                id="sunday_morning_opening"
                                name="sunday_morning_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.sunday_morning_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="sunday_morning_closing">Manhã<br />Fechamento</label>
                            <input
                                type="time"
                                id="sunday_morning_closing"
                                name="sunday_morning_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.sunday_morning_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="morning-afternoon">
                        <div className="hours">
                            <label htmlFor="sunday_afternoon_opening">Tarde<br />Abertura</label>
                            <input
                                type="time"
                                id="sunday_afternoon_opening"
                                name="sunday_afternoon_opening"
                                min="00:00"
                                max="23:59"
                                value={formData.sunday_afternoon_opening}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="hours">
                            <label htmlFor="sunday_afternoon_closing">Tarde<br />Fechamento</label>
                            <input
                                type="time"
                                id="sunday_afternoon_closing"
                                name="sunday_afternoon_closing"
                                min="00:00"
                                max="23:59"
                                value={formData.sunday_afternoon_closing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="input-images">
                <label htmlFor="menu_image"><img src={menu}></img></label>
                <input type="file" id="menu_image" accept="image/png, image/jpeg" onChange={(e) => setMenuImage(e.target.files[0])}/>

                <label htmlFor="restaurant_image"><img src={restaurante}></img></label>
                <input type="file" id="restaurant_image" accept="image/png, image/jpeg" onChange={(e) => setRestaurantImage(e.target.files[0])}/>
            </div>
            
            <div className="reset-submit-btn">
                <input type="reset"/>
                <input type="submit"/>
            </div>
        </form>
    </div>
}

export default GeneralFrame