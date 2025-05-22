
function FinancialFrame(){

    return <div className="frame_extra">
        <h1>Gestão Finaceira</h1>
        <form className="form-extra-data" action="index.php" method="POST">

            <div className="info-fin-day">
                <label for="day">Data </label>
                <input type="date" id="day" />
            </div>

            <div className="info-fin-customers-served">
                <label for="num_customers_served">Número de Clientes Atendidos: </label>
                <input type="number" id="num_customers_served" min="0"/>
            </div>

            <div className="info-fin-dishes-sold">
                <label for="dishes_sold">Número de Pedidos Feitos: </label>
                <input type="number" id="dishes_sold" min="0"/>
            </div>

            <div className="info-fin-gross-revenue">
                <label for="gross_revenue">Faturamento Bruto: </label>
                <input type="number" id="gross_revenue" min="0"/>
            </div>

            <div className="info-fin-net-revenue">
                <label for="net_revenue">Faturamento Total: </label>
                <input type="number" id="net_revenue" min="0"/>
            </div>
        </form>
    </div>
}

export default FinancialFrame