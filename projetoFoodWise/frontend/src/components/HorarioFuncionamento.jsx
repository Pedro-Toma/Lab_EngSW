
function HorarioFuncionamento({restaurant}) {
    return <div className="tabela-container">
        <table className="horarios">
            <tbody>
                <tr>
                    <td>Segunda</td>
                    <td>{restaurant.monday_morning_hours}</td>
                    <td>{restaurant.monday_afternoon_hours}</td>
                </tr>
                <tr>
                    <td>Terça</td>
                    <td>{restaurant.tuesday_morning_hours}</td>
                    <td>{restaurant.tuesday_afternoon_hours}</td>
                </tr>
                <tr>
                    <td>Quarta</td>
                    <td>{restaurant.wednesday_morning_hours}</td>
                    <td>{restaurant.wednesday_afternoon_hours}</td>
                </tr>
                <tr>
                    <td>Quinta</td>
                    <td>{restaurant.thursday_morning_hours}</td>
                    <td>{restaurant.thursday_afternoon_hours}</td>
                </tr>
                <tr>
                    <td>Sexta</td>
                    <td>{restaurant.friday_morning_hours}</td>
                    <td>{restaurant.friday_afternoon_hours}</td>
                </tr>
                <tr>
                    <td>Sábado</td>
                    <td>{restaurant.saturday_morning_hours}</td>
                    <td>{restaurant.saturday_afternoon_hours}</td>
                </tr>
                <tr>
                    <td>Domingo</td>
                    <td>{restaurant.sunday_morning_hours}</td>
                    <td>{restaurant.sunday_afternoon_hours}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default HorarioFuncionamento