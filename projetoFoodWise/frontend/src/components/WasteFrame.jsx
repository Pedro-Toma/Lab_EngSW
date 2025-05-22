
function WasteFrame(){
    return <div className="frame_extra">
        <h1>Monitoramento de Desperdício</h1>
        <form className="form-extra-data" action="index.php" method="POST">

            <div className="waste-day">
                <label for="day">Data </label>
                <input type="date" id="day" />
            </div>

            <div className="waste-sold">
                <label for="qtySold">Quantidade Vendida (kg) </label>
                <input type="number" id="qtySold" min="0"/>
            </div>

            <div className="waste-wasted">
                <label for="qtyWasted">Quantidade Desperdiçada (kg) </label>
                <input type="number" id="qtyWasted" min="0"/>
            </div>

            <div className="waste-misuse">
                <label for="qtyMisuse">Itens Descartados por Mau Uso (kg) </label>
                <input type="number" id="qtyMisuse" min="0"/>
            </div>
        </form>
    </div>
}

export default WasteFrame