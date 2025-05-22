
function OpInfoFrame(){

    return <div className="frame_extra">
        <h1>Informações Operacionais</h1>
        <form className="form-extra-data" action="index.php" method="POST">

            <div className="info-op-day">
                <label for="day">Data </label>
                <input type="date" id="day" />
            </div>

            <div className="info-op-electric-bill">
                <label for="electric_bill">Conta de Energia: </label>
                <input type="number" id="electric_bill" min="0"/>
            </div>

            <div className="info-op-gas-bill">
                <label for="gas_bill">Conta de Gás: </label>
                <input type="number" id="gas_bill" min="0"/>
            </div>

            <div className="info-op-water-bill">
                <label for="water_bill">Conta de Água: </label>
                <input type="number" id="water_bill" min="0"/>
            </div>

            <div className="info-op-ingredient-cost">
                <label for="ingredient_total_cost">Custo Total dos Ingredientes: </label>
                <input type="number" id="ingredient_total_cost" min="0"/>
            </div>
        </form>
    </div>
}

export default OpInfoFrame