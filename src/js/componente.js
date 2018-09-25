modalElements = (name, address, open, calificacion,img, precio) => {
    
    return `
    <div id='form_modal' class='form_modal'>    
        <div class='headerPopup'>    
        <span class='icon-cross' id='cancelar'></span>
            <h4>${name}</h4>
        </div>
        <div class='content-img'>
            <img src='${img?img:'http://2.bp.blogspot.com/-3IZnCz2U88w/T75fTN7LqMI/AAAAAAAAAMI/lrh07yZ4_l8/s1600/causa-rellena.jpg'}'>
        </div>
        <label class='messageApp'>Podria ser la mejor opción!!</label>
        <div class="box-input"> 
        <table id="search">
            <tr>    
                <td>Precios</td>
                <td>+${precio} soles</td>
            </tr> 
            <tr>    
                <td>Teléfono</td>
                <td>930926642</td>
            </tr> 
            <tr>    
                <td>Direccion</td>
                <td>${address}</td>
            </tr> 
            <tr>    
                <td>Estado</td>
                <td id='status'></td>
            </tr> 
            <tr>    
                <td>Calificacion</td>
                <td><ol id='stars'></ol></td>
            </tr>
           </table>
            
        </div>
        <div class="contain-button-search">                    
            <button type="button" name="button" class='cancelar'id="pedirAhora">Pedir Ahora</button>                      
        </div>
    </div>
`;
}