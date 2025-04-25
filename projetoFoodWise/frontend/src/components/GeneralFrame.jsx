import Cardapio
 from "./Cardapio"
function GeneralFrame(){

    return <div className="frame-general-data">
        <h1>Dados Gerais do Restaurante</h1>
        <form className="form-general-data" action="index.php" method="POST" enctype="multipart/form-data"> 

            <label htmlFor="username">Nome </label>
            <input type="text" id="username" placeholder="Nome" minlength="5" maxlength="15" required/>
            
            <label htmlFor="address">Endereço completo </label>
            <input type="text" id="address" placeholder="Rua" maxlength="40" required/>
            <input type="text" id="neighborhood" placeholder="Bairro" maxlength="40" required/>
            <input type="number" id="number" placeholder="Número"/>

            <label htmlFor="phone">Telefone </label>
            <input type="tel" id="phone" placeholder="ex: (ddd)1234-5678" pattern="\(\d{2}\)\d{4,5}-\d{4}" minlength="5" maxlength="15" required/>
            
            <h2>Formas de Pagamento </h2>
            <div className="payment">
                <label htmlFor="Dinheiro">Dinheiro </label>
                <input type="checkbox" id="Dinheiro" />

                <label htmlFor="Pix">Pix </label>
                <input type="checkbox" id="Pix" />

                <label htmlFor="Débito">Débito </label>
                <input type="checkbox" id="Débito" />

                <label htmlFor="Crédito">Crédito </label>
                <input type="checkbox" id="Crédito" />

                <label htmlFor="Vale">Vale </label>
                <input type="checkbox" id="Vale" />
            </div>

            <Cardapio />

            <div className="input-images">
                <label for="menu_image"></label>
                <input type="file" id="menu_image" accept="image/png, image/jpeg"/>

                <label for="restaurant_image"></label>
                <input type="file" id="restaurant_image" accept="image/png, image/jpeg"/>
            </div>
            
            <div className="reset-submit-btn">
                <input type="reset"/>
                <input type="submit"/>
            </div>
        </form>
    </div>
}

export default GeneralFrame