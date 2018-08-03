const eventsModal = () => {
    document.getElementById('cancelar').addEventListener('click', () => {
        document.getElementById('div_new_modal').innerHTML = '';
        document.getElementById('div_new_modal').style.display='none';
    });
    document.getElementById('pedirAhora').addEventListener('click', () => {
        document.getElementById('div_new_modal').innerHTML = '';
        document.getElementById('div_new_modal').style.display='none';
    });
    
}
const stars=(calificacion, status)=>{
    let statusAtention=document.getElementById('status');
    if(status==true){
        statusAtention.innerHTML='Abierto';
    }else{
        statusAtention.innerHTML='Cerrado';
    }
    for (let index = 0; index < Math.round(calificacion); index++) {
        document.getElementById('stars').innerHTML+=`<span class='icon-star-full'></span>`;        
    }
    for (let index = 0; index < 5- Math.round(calificacion); index++) {
        document.getElementById('stars').innerHTML+=`<span class='icon-star-empty'></span>`;        
    }
    if(calificacion==undefined){
        for (let index = 0; index < 5; index++) {
            document.getElementById('stars').innerHTML+=`<span class='icon-star-empty'></span>`;        
        }

    }
}