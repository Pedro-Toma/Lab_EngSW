
function HorarioFuncionamento({restaurant}) {
    return <>
        <div className="tabela-container">
            <table className="horarios">
                <tbody>
                    <tr>
                        <td>Segunda</td>
                        <td>{restaurant.monday_morning_opening && restaurant.monday_morning_closing ? `${restaurant.monday_morning_opening} - ${restaurant.monday_morning_closing}` : '-'}</td>
                        <td>{restaurant.monday_afternoon_opening && restaurant.monday_afternoon_closing ? `${restaurant.monday_afternoon_opening} - ${restaurant.monday_afternoon_closing}` : '-'}</td>
                    </tr>
                    <tr>
                        <td>Terça</td>
                        <td>{restaurant.tuesday_morning_opening && restaurant.tuesday_morning_closing ? `${restaurant.tuesday_morning_opening} - ${restaurant.tuesday_morning_closing}` : '-'}</td>
                        <td>{restaurant.tuesday_afternoon_opening && restaurant.tuesday_afternoon_closing ? `${restaurant.tuesday_afternoon_opening} - ${restaurant.tuesday_afternoon_closing}` : '-'}</td>
                    </tr>
                    <tr>
                        <td>Quarta</td>
                        <td>{restaurant.wednesday_morning_opening && restaurant.wednesday_morning_closing ? `${restaurant.wednesday_morning_opening} - ${restaurant.wednesday_morning_closing}` : '-'}</td>
                        <td>{restaurant.wednesday_afternoon_opening && restaurant.wednesday_afternoon_closing ? `${restaurant.wednesday_afternoon_opening} - ${restaurant.wednesday_afternoon_closing}` : '-'}</td>
                    </tr>
                    <tr>
                        <td>Quinta</td>
                        <td>{restaurant.thursday_morning_opening && restaurant.thursday_morning_closing ? `${restaurant.thursday_morning_opening} - ${restaurant.thursday_morning_closing}` : '-'}</td>
                        <td>{restaurant.thursday_afternoon_opening && restaurant.thursday_afternoon_closing ? `${restaurant.thursday_afternoon_opening} - ${restaurant.thursday_afternoon_closing}` : '-'}</td>
                    </tr>
                    <tr>
                        <td>Sexta</td>
                        <td>{restaurant.friday_morning_opening && restaurant.friday_morning_closing ? `${restaurant.friday_morning_opening} - ${restaurant.friday_morning_closing}` : '-'}</td>
                        <td>{restaurant.friday_afternoon_opening && restaurant.friday_afternoon_closing ? `${restaurant.friday_afternoon_opening} - ${restaurant.friday_afternoon_closing}` : '-'}</td>
                    </tr>
                    <tr>
                        <td>Sábado</td>
                        <td>{restaurant.saturday_morning_opening && restaurant.saturday_morning_closing ? `${restaurant.saturday_morning_opening} - ${restaurant.saturday_morning_closing}` : '-'}</td>
                        <td>{restaurant.saturday_afternoon_opening && restaurant.saturday_afternoon_closing ? `${restaurant.saturday_afternoon_opening} - ${restaurant.saturday_afternoon_closing}` : '-'}</td>
                    </tr>
                    <tr>
                        <td>Domingo</td>
                        <td>{restaurant.sunday_morning_opening && restaurant.sunday_morning_closing ? `${restaurant.sunday_morning_opening} - ${restaurant.sunday_morning_closing}` : '-'}</td>
                        <td>{restaurant.sunday_afternoon_opening && restaurant.sunday_afternoon_closing ? `${restaurant.sunday_afternoon_opening} - ${restaurant.sunday_afternoon_closing}` : '-'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

export default HorarioFuncionamento