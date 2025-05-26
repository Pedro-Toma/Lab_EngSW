import { useParams } from "react-router-dom";
import { useState } from "react";

function FinancialFrame(){

    const { restaurant_id } = useParams()
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            month_year: formData.get("month_year"),
            num_customers_served: parseInt(formData.get("num_customers_served")) || 0,
            dishes_sold: parseInt(formData.get("dishes_sold")) || 0,
            gross_revenue: parseFloat(formData.get("gross_revenue")) || 0,
            net_revenue: parseFloat(formData.get("net_revenue")) || 0
        };
      
        try {
            const token = localStorage.getItem("token");

            const checkResponse = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/Financial_Info/${data.month_year}`, {
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
            
            const saveResponse = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/Financial_Info`, {
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
        <h1>Gestão Finaceira</h1>
        <form className="form-extra-data" onSubmit={handleSubmit}>

            <div className="info-fin-day">
                <label htmlFor="month_year">Mês e Ano:</label>
                <input type="month" id="month_year" name="month_year" required/>
            </div>

            <div className="info-fin-customers-served">
                <label htmlFor="num_customers_served">Número de Clientes Atendidos: </label>
                <input type="number" id="num_customers_served" name="num_customers_served" min="0"/>
            </div>

            <div className="info-fin-dishes-sold">
                <label htmlFor="dishes_sold">Número de Pedidos Feitos: </label>
                <input type="number" id="dishes_sold" name="dishes_sold" min="0"/>
            </div>

            <div className="info-fin-gross-revenue">
                <label htmlFor="gross_revenue">Faturamento Bruto: </label>
                <input type="number" id="gross_revenue" name="gross_revenue" min="0" step="0.01"/>
            </div>

            <div className="info-fin-net-revenue">
                <label htmlFor="net_revenue">Faturamento Total: </label>
                <input type="number" id="net_revenue" name="net_revenue" min="0" step="0.01"/>
            </div>

            <button type="submit">Enviar</button>

        </form>
    </div>
}

export default FinancialFrame