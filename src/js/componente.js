modalElements = (name, address, open, calificacion) => {
    return `
    <div id='form_modal' class='form_modal'>    
        <div class='headerPopup'>    
        <span class='icon-cross' id='cancelar'></span>
            <h4>${name}</h4>
        </div>
        <div class='content-img'>
            <img src='http://2.bp.blogspot.com/-3IZnCz2U88w/T75fTN7LqMI/AAAAAAAAAMI/lrh07yZ4_l8/s1600/causa-rellena.jpg'>
        </div>
        <label class='messageApp'>No vayas!!</label>
        <div class="box-input"> 
        <table id="search">
            <tr>    
                <td>Precios</td>
                <td>+20 soles</td>
            </tr> 
            <tr>    
                <td>Servicio</td>
                <td>Domicilio</td>
            </tr> 
            <tr>    
                <td>Direccion</td>
                <td>${address}</td>
            </tr> 
            <tr>    
                <td>Estado</td>
                <td>${open}</td>
            </tr> 
            <tr>    
                <td>Calificacion</td>
                <td>${calificacion}</td>
            </tr>
           </table>
            
        </div>
        <div class="contain-button-search">                    
            <button type="button" name="button" class='cancelar'id="pedirAhora">Pedir Ahora</button>                      
        </div>
    </div>
`;
}