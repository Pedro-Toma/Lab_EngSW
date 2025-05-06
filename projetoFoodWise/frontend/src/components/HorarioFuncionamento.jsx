
function HorarioFuncionamento() {
    return <div className="tabela-container">
        <table className="horarios">
            <tbody>
                <tr>
                    <td>Segunda</td>
                    <td>Fechado</td>
                    <td>Fechado</td>
                </tr>
                <tr>
                    <td>Terça</td>
                    <td>12:00–23:00</td>
                    <td className="empty">-</td>
                </tr>
                <tr>
                    <td>Quarta</td>
                    <td>12:00–23:00</td>
                    <td className="empty">-</td>
                </tr>
                <tr>
                    <td>Quinta</td>
                    <td>12:00–23:00</td>
                    <td className="empty">-</td>
                </tr>
                <tr>
                    <td>Sexta</td>
                    <td>12:00–23:00</td>
                    <td className="empty">-</td>
                </tr>
                <tr>
                    <td>Sábado</td>
                    <td>8:00–13:00</td>
                    <td>15:00–23:00</td>
                </tr>
                <tr>
                    <td>Domingo</td>
                    <td>8:00–13:00</td>
                    <td>15:00–23:00</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default HorarioFuncionamento