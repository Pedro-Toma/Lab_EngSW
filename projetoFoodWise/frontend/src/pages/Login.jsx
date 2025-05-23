import {Link} from 'react-router-dom'
import LoginFrame from '../components/LoginFrame'
import NewAccountFrame from '../components/NewAccountFrame'

function Login(){
    return <div>
        <h1 className="logo-log-reg">FoodWise</h1>
        <LoginFrame/>
        <NewAccountFrame/>
        <Link to="/" className="return-home">Voltar a página inicial</Link>
    </div>
}

export default Login