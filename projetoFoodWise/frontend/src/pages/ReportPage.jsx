import ReportChart from '../components/ReportChart';
import { Link,useParams } from "react-router-dom";
import { useState,useEffect } from 'react';

function ReportPage() {

  const { restaurant_id } = useParams()
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchName() {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/restaurant/${restaurant_id}/name`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }  
      })
      if (response.ok) {
        const data = await response.json()
        console.log("Nome recebido da API:", data.name);
        setName(data.name)
      } else{
        console.log("Erro ao pegar nome de restaurante.")
      }
      setIsLoading(false);
    }
    fetchName();
  }, [restaurant_id]);

  return (
    <div className="page-container">
      {(isLoading) ? 
      <div className="loading-name"> Carregando restaurante...</div> :
      <> 
        <Link to="/ManagerProfile" className="go-to-page-rep">Perfil do Gerente</Link>
        <h1 className="page-title">Painel de Relatórios — {name}</h1>
        <ReportChart restaurantId={restaurant_id} />
      </>}
    </div>
  );
}

export default ReportPage;
