import { Link } from "react-router-dom";

function NewAccountFrame(){

    return <div className="frame-new-account">
        <p>Novo por aqui?</p>
        <Link to="/Register" className="register-link-login-page">Cadastre-se</Link>
    </div>
}

export default NewAccountFrame