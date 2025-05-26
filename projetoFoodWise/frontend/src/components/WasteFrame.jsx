import { useParams } from "react-router-dom";
import { useState } from "react";

function WasteFrame(){

    const { restaurant_id } = useParams()
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            month_year: formData.get("month_year"),
            quantity_sold: parseFloat(formData.get("quantity_sold")) || 0,
            quantity_wasted: parseFloat(formData.get("quantity_wasted")) || 0,
            discarded_by_expiration: parseFloat(formData.get("discarded_by_expiration")) || 0,
            discarded_by_misuse: parseFloat(formData.get("discarded_by_misuse")) || 0,
        };
      
        try {
            const token = localStorage.getItem("token");

            const checkResponse = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/Waste_Info/${data.month_year}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }); 

            let method = '';

            if (checkResponse.ok) {
                method = 'PUT';
            } else if (checkResponse.status === 404) {
                method = 'POST';
            } else {
                throw new Error("Erro ao verificar dados existentes.");
            }
            
            const saveResponse = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/Waste_Info`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!saveResponse.ok) {
                const errorData = await saveResponse.json();
                throw new Error(errorData.detail || `Erro HTTP ${saveResponse.status}`);
            }

            alert("Dados salvos com sucesso!");
            e.target.reset()

        } catch (error) {
            setError(error.message);
            alert("Erro ao salvar: " + error.message);
        }
    }

    return <div className="frame_extra">
        <h1>Monitoramento de Desperdício</h1>
        <form className="form-extra-data" onSubmit={handleSubmit}>

            <div className="waste-day">
                <label htmlFor="month_year">Mês e Ano:</label>
                <input type="month" id="month_year" name="month_year" required/>
            </div>

            <div className="waste-sold">
                <label htmlFor="quantity_sold">Quantidade Vendida (kg) </label>
                <input type="number" id="quantity_sold" name="quantity_sold" min="0" step="0.01"/>
            </div>

            <div className="waste-wasted">
                <label htmlFor="quantity_wasted">Quantidade Desperdiçada (kg) </label>
                <input type="number" id="quantity_wasted" name="quantity_wasted" min="0" step="0.01"/>
            </div>

            <div className="waste-exp">
                <label htmlFor="discarded_by_expiration">Itens Descartados por Expiração (kg) </label>
                <input type="number" id="discarded_by_expiration" name="discarded_by_expiration" min="0" step="0.01"/>
            </div>

            <div className="waste-misuse">
                <label htmlFor="discarded_by_misuse">Itens Descartados por Mau Uso (kg) </label>
                <input type="number" id="discarded_by_misuse" name="discarded_by_misuse" min="0" step="0.01"/>
            </div>

            <button type="submit">Enviar</button>
            
        </form>
    </div>
}

export default WasteFrame