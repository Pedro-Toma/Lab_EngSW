import { Link } from "react-router-dom";

function RegAccountFrame(){

    return <div className="frame-reg-account">
        <p>Já possui uma conta?</p>
        <Link to="/Login" className="register-link-login-page">Entrar</Link>
    </div>
}

export default RegAccountFrame