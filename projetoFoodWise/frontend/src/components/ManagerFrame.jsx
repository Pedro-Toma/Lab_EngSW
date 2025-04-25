import RestaurantList from "./RestaurantList"

function ManagerFrame(){

    function addRestaurant() {
        console.log("Restaurante Adicionado")
    }

    const restaurants = [
        { id: 1, name: "Green Day", image: "src/assets/GreenDay.jpg"},
        { id: 2, name: "DOM", image: "src/assets/dom.jpg"}
    ]
    
    return <div className="frame_perfil">
        <h1>Meus Restaurantes</h1>
        <RestaurantList restaurants={restaurants}/>
        <button className="add-restaurant-btn" onClick={addRestaurant}><img src="src/assets/addCircle.png"/></button>
    </div>
}

export default ManagerFrame