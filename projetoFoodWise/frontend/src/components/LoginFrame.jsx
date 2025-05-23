import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginFrame(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const response = await fetch("http://localhost:8000/manager/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login realizado com sucesso!");
            console.log(data)
            localStorage.setItem("token", data.access_token); // guarda token
            navigate("/ManagerProfile");
        } else {
            alert(`Erro: ${data.detail || "Falha no login."}`);
        }
    };

    return <div className="frame-login">
        <form className="form-login" onSubmit={handleSubmit}> 
            <label htmlFor="email">Email </label>
            <input type="email" id="email" placeholder="email@gmail.com" required onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Senha </label>
            <input type="password" id="password" placeholder="senha" required onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit">Entrar</button>
        </form>
        <Link to="/" className="forgot-password">Esqueceu a Senha?</Link>
    </div>
}

export default LoginFrame