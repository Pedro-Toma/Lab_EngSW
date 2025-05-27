import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

function getLastMonths(n) {
    const result = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const month = date.toISOString().slice(0, 7);
        result.unshift(month);
    }
    return result;
}

function ReportChart({ restaurantId }) {
    const [data, setData] = useState([]);
    const [range, setRange] = useState(1);

    useEffect(() => {
        async function fetchJsonData(url) {
            const token = localStorage.getItem('token');
            try {
            const res = await fetch(url, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            });
            if (!res.ok) throw new Error('Erro na requisição');
            const json = await res.json();
            return json;
            } catch {
                return null;
            }
        }

        async function fetchMonthlyData() {
      
        const months = getLastMonths(range);

        const promises = months.map(async (month) => {
            const [op, waste, fin] = await Promise.all([
            fetchJsonData(`http://localhost:8000/restaurant/${restaurantId}/Op_Info/${month}`),
            fetchJsonData(`http://localhost:8000/restaurant/${restaurantId}/Waste_Info/${month}`),
            fetchJsonData(`http://localhost:8000/restaurant/${restaurantId}/Financial_Info/${month}`)
            ]);

            return {
                month,

                electric_bill: op?.electric_bill || 0,
                gas_bill: op?.gas_bill || 0,
                water_bill: op?.water_bill || 0,
                ingredient_total_cost: op?.ingredient_total_cost || 0,

                quantity_sold: waste?.quantity_sold || 0,
                quantity_wasted: waste?.quantity_wasted || 0,
                discarded_by_expiration: waste?.discarded_by_expiration || 0,
                discarded_by_misuse: waste?.discarded_by_misuse || 0,

                num_customers_served: fin?.num_customers_served || 0,
                gross_revenue: fin?.gross_revenue || 0,
                net_revenue: fin?.net_revenue || 0,
                dishes_sold: fin?.dishes_sold || 0,
            };
        });

        const result = await Promise.all(promises);
        console.log("Dados finais para o gráfico:", result.filter(Boolean));
        setData(result.filter(Boolean));
        }

        if (restaurantId) {
            fetchMonthlyData();
        }
    }, [restaurantId,range]);

    return (
        <>
            <div className="period-selector">
                <label>Visualizar Dados do(s):</label>
                <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
                    <option value={1}>Último mês</option>
                    <option value={3}>Últimos 3 meses</option>
                    <option value={6}>Últimos 6 meses</option>
                    <option value={12}>Últimos 12 meses</option>
                </select>
            </div>
            <div className="reports-container">

            <div className="report-card">
                <h2 className="report-title">Indicadores Financeiros</h2>
                <div className="report-chart-wrapper">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="gross_revenue" fill="#2E7D32" name="Receita Bruta (R$)" />
                        <Bar dataKey="net_revenue" fill="#66BB6A" name="Receita Líquida (R$)" />
                        <Bar dataKey="num_customers_served" fill="#42A5F5" name="Clientes Atendidos" />
                        <Bar dataKey="dishes_sold" fill="#FFA726" name="Pratos Vendidos" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="report-card">
            <h2 className="report-title">Custos Operacionais</h2>
                <div className="report-chart-wrapper">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ingredient_total_cost" fill="#A1887F" name="Custo dos Ingredientes (R$)" />
                        <Bar dataKey="electric_bill" fill="#FBC02D" name="Conta de Luz (R$)" />
                        <Bar dataKey="gas_bill" fill="#78909C" name="Conta de Gás (R$)" />
                        <Bar dataKey="water_bill" fill="#29B6F6" name="Conta de Água (R$)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="report-card">
                <h2 className="report-title">Desperdício de Alimentos</h2>
                <div className="report-chart-wrapper">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity_sold" fill="#1565C0" name="Quantidade Vendida (kg)" />
                        <Bar dataKey="quantity_wasted" fill="#C62828" name="Desperdício (kg)" />
                        <Bar dataKey="discarded_by_expiration" fill="#6A1B9A" name="Descartado por Vencimento (kg)" />
                        <Bar dataKey="discarded_by_misuse" fill="#E64A19" name="Descartado por Uso Indevido (kg)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </>
    );
}

export default ReportChart;