import { useEffect, useState} from "react";
import { Link } from "react-router-dom"

function HomePage(){
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkToken(){
            const token = localStorage.getItem("token");    
            if(!token){
                setIsLoading(false);
                return
            }

            try {
                const response = await fetch("http://localhost:8000/validate-token", {
                method: "GET",
                headers: {
                "Authorization": `Bearer ${token}`,
                },
                });
                
                if (response.ok){
                    setIsLoggedIn(true);
                } else{
                    localStorage.removeItem("token");
                    setIsLoading(false);
                }
            } catch (error){
                console.error("Erro ao validar token:", error);
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        }
        checkToken();
    }, []);

    if (isLoading) {
        return <>
            <h1>Essa é a página inicial</h1>
            <Link to="/RestaurantProfile/11" className="home-page-btn">Restaurante</Link>
            <Link to="/Login" className="home-page-btn">Entrar</Link>
            <Link to="/Register" className="home-page-btn">Registrar</Link>
        </>
    }

    return <>
        <h1>Essa é a página inicial</h1>
        {isLoggedIn ? (
            <>
                <Link to="/RestaurantProfile/11" className="home-page-btn">Restaurante</Link>
                <Link to="/ManagerProfile" className="home-page-btn">ManagerProfile</Link>
                <Link to="/Login" className="home-page-btn">Entrar</Link>
                <Link to="/Register" className="home-page-btn">Registrar</Link>
            </>
        ) : (
            <>
                <Link to="/RestaurantProfile/1" className="home-page-btn">Restaurante</Link>
                <Link to="/Login" className="home-page-btn">Entrar</Link>
                <Link to="/Register" className="home-page-btn">Registrar</Link>
            </>
        )}
    </>
}

export default HomePage