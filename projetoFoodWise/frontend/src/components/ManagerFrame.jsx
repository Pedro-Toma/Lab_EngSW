import RestaurantList from "./RestaurantList"

function ManagerFrame({restaurants, refreshRestaurants}){

    function addRestaurant() {
        console.log("Adicionar restaurante ainda não implementado");
    }

    async function removeRestaurant(id) {
        const token = localStorage.getItem("token")

        await fetch(`http://localhost:8000/restaurant/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    refreshRestaurants();
  }
    
    return <div className="frame_perfil">
        <h1>Meus Restaurantes</h1>
        <RestaurantList restaurants={restaurants} removeRestaurant={removeRestaurant}/>
        <button className="add-restaurant-btn" onClick={addRestaurant}><img src="src/assets/addCircle.png"/></button>
    </div>
}

export default ManagerFrame