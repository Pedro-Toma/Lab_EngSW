import { useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom"
import RestaurantHomeList from "../components/RestaurantHomeList.jsx"

function HomePage(){
    
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearchLoading, setIsSearchLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [notFound, setNotFound] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        async function checkToken() {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/validate-token", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Erro ao validar token:", error);
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        }

        checkToken();
    }, []);

    useEffect(() => {
        const fetchRestaurants = async () => {
            if (debouncedSearch.trim() === '') {
                setRestaurants([]);
                setNotFound(false);
                return;
            }

            setIsSearchLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8000/restaurants/search?name=${encodeURIComponent(debouncedSearch)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                console.log(data);

                if (response.ok && data.length > 0) {
                    setRestaurants(data);
                    setNotFound(false);
                } else {
                    setRestaurants([]);
                    setNotFound(true);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                setRestaurants([]);
                setNotFound(true);
            } finally {
                setIsSearchLoading(false);
            }
        };

        fetchRestaurants();
    }, [debouncedSearch]);

    const handleSearch = (e) => {
        const input = e.target.value;
        setSearchTerm(input);
    };

    if (isLoading) {
        return <h1 className="loading">Carregando ...</h1>;
    }

    return <div className="home-page-container">
        <div className ="header">
            <h1 className="logo">FoodWise</h1>
            <div className="home-links">
                {isLoggedIn ? (
                    <>
                        <Link to="/ManagerProfile" className="home-page-btn">Perfil do Gerente</Link>
                    </>
                ) : (
                    <>
                        <Link to="/Login" className="home-page-btn">Entrar</Link>
                        <Link to="/Register" className="home-page-btn">Registrar</Link>
                    </>
                )}
            </div>
        </div>
        <div>
            <h1 className="slogan">"Menos desperdício, mais sustentabilidade, maior rentabilidade!"</h1>
        </div>
        <div>
            <h2 className="res-reg">Restaurantes Cadastrados</h2>
        </div>
        <div className="res-reg-container">
            <input className="res-reg-btn" type="text" value={searchTerm} onChange={handleSearch} placeholder="Veja se o restaurante que você procura já está cadastrado"/>
            <div className="search-result">
                {isSearchLoading && searchTerm.trim() !== "" ? (
                    <h1>Carregando...</h1>
                ) : notFound && searchTerm.trim() !== "" ? (
                    <p>Restaurante não encontrado.</p>
                ) : (
                    <RestaurantHomeList restaurants={restaurants} />
                )}
            </div>
        </div>

        <div className="invite">
            <h1>Junte-se ao FoodWise e transforme seu restaurante!</h1>
            <p>Cadastre-se agora e tenha acesso a insights valiosos para reduzir desperdícios, aumentar a rentabilidade e adotar práticas sustentáveis no seu restaurante.
 Descubra onde seu restaurante pode economizar sem comprometer a qualidade.  Aprenda estratégias inteligentes para reduzir o desperdício de alimentos. Torne seu negócio mais sustentável e atraente para clientes conscientes.
 Faça parte dessa mudança! Cadastre-se agora e comece a revolucionar sua gestão.</p>
        </div>
        <div className="reg-container">
            <button className="register" onClick={() => navigate("/Register")}>Cadastre-se</button>
        </div>
        <div className="about-us">
            <h1>Sobre Nós</h1>
            <p>Bem-vindo ao FoodWise! Nosso objetivo é ajudar gerentes de restaurantes a reduzir o desperdício de alimentos e adotar práticas mais sustentáveis.
Acreditamos que pequenas mudanças podem causar um grande impacto, tanto para o meio ambiente quanto para a rentabilidade do seu negócio. Por isso, oferecemos conteúdos, ferramentas e estratégias para tornar a gestão do seu restaurante mais eficiente, sustentável e consciente.
Junte-se a nós nessa missão e transforme seu restaurante em um exemplo de responsabilidade e inovação no setor alimentício!</p>
        </div>
    </div>
}

export default HomePage