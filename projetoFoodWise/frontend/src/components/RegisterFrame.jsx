import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterFrame(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        const res = await fetch("http://localhost:8000/manager/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Cadastro realizado com sucesso!");
            navigate("/Login");
        } else {
            alert(data.detail || "Erro no cadastro");
        }
    };

    return <div className="frame-register">
        <form className="form-register" onSubmit={handleSubmit}> 
            <label htmlFor="email">Email </label>
            <input type="email" id="email" placeholder="email@gmail.com" required onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Senha </label>
            <input type="password" id="password" placeholder="senha" required onChange={(e) => setPassword(e.target.value)}/>

            <label htmlFor="password-confirmation">Confirmar Senha </label>
            <input type="password" id="password-confirmation" placeholder="senha" required onChange={(e) => setConfirmPassword(e.target.value)}/>

            <button type="submit">Realizar Cadastro</button>
        </form>
    </div>
}

export default RegisterFrame