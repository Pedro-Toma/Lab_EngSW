import { useParams } from "react-router-dom";
import { useState } from "react";

function OpInfoFrame(){

    const { restaurant_id } = useParams()
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            month_year: formData.get("month_year"),
            electric_bill: parseFloat(formData.get("electric_bill")) || 0,
            gas_bill: parseFloat(formData.get("gas_bill")) || 0,
            water_bill: parseFloat(formData.get("water_bill")) || 0,
            ingredient_total_cost: parseFloat(formData.get("ingredient_total_cost")) || 0
        };
      
        try {
            const token = localStorage.getItem("token");

            const checkResponse = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/Op_Info/${data.month_year}`, {
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
            
            const saveResponse = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/Op_Info`, {
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
        <h1>Informações Operacionais</h1>
        <form className="form-extra-data" onSubmit={handleSubmit}>

            <div className="info-op-day">
                <label htmlFor="month_year">Mês e Ano:</label>
                <input type="month" id="month_year" name="month_year" required/>
            </div>

            <div className="info-op-electric-bill">
                <label htmlFor="electric_bill">Conta de Energia: </label>
                <input type="number" id="electric_bill" name="electric_bill" min="0"/>
            </div>

            <div className="info-op-gas-bill">
                <label htmlFor="gas_bill">Conta de Gás: </label>
                <input type="number" id="gas_bill" name="gas_bill" min="0"/>
            </div>

            <div className="info-op-water-bill">
                <label htmlFor="water_bill">Conta de Água: </label>
                <input type="number" id="water_bill" name="water_bill" min="0"/>
            </div>

            <div className="info-op-ingredient-cost">
                <label htmlFor="ingredient_total_cost">Custo Total dos Ingredientes: </label>
                <input type="number" id="ingredient_total_cost" name="ingredient_total_cost" min="0"/>
            </div>

            <button type="submit">Enviar</button>
            
        </form>
    </div>
}

export default OpInfoFrame