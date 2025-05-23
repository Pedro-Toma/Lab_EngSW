import {Link} from 'react-router-dom'
import RegisterFrame from '../components/RegisterFrame'
import RegAccountFrame from '../components/RegAccountFrame'

function Register(){
    return <div>
        <h1 className="logo-log-reg">FoodWise</h1>
        <RegisterFrame/>
        <RegAccountFrame/>
        <Link to="/" className="return-home">Voltar a página inicial</Link>
    </div>
}

export default Register