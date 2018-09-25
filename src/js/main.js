let popup=false;
let inputSearch = document.getElementById('foodType');
let listSearch = document.getElementsByClassName('content-search-location');

//search1 Restaurant
inputSearch.addEventListener('keyup', (e) => {
    document.getElementById('content-search-location').style.display = 'block';//modal lista coincidente
    let location = event.target.value;
    let objetLocation = searchPlacesOfFirebase(location);
    listarLocation(objetLocation);
    popup = true;
})
// list de restaurant
for (let index = 0; index < listSearch.length; index++) {
    listSearch[index].addEventListener('click', (e) => {
        let element = event.target;
        imageFirebase();
        viewDataRestaurant(element.id);        
        document.getElementById('body-splash-image').style.display = 'none';
        document.getElementById('content-search-location').style.display = 'none';//modal lista coincidente          
    }, false);
}
// funciones
const viewInformation = (name, open, calificacion, address,img, precio) => {
    document.getElementById('div_new_modal').style.display = 'block';
    document.getElementById('div_new_modal').innerHTML = '';
    document.getElementById('div_new_modal').innerHTML += modalElements(name, address, open, calificacion,img, precio);    
    eventsModal();
    stars(calificacion);//muestra las estrellas   
}
const listarLocation = data => {
    data.off('value')
    data.once('value', datos => {
        document.getElementById('content-search-location').innerHTML = '';
        let dataUser = datos.val();
        for (const key in dataUser) {
            document.getElementById('content-search-location').innerHTML += `<li id='${key}'>${dataUser[key].name}</li>`;
        }
    });
}
const viewPhotoPlace=(photos)=>{
    document.getElementById('content-image-places').innerHTML+=`
    <div class="content-image-places-location">
    <img src='${photos?photos:'http://2.bp.blogspot.com/-3IZnCz2U88w/T75fTN7LqMI/AAAAAAAAAMI/lrh07yZ4_l8/s1600/causa-rellena.jpg'}' alt='photo'>
    </div>`
   
}
document.onclick = e => {//controlando click en el documento
    if (popup == true) {
      if (document.getElementById('content-search-location').style.display == 'block' ) {
        e = e || event;
        let target = e.target || e.srcElement;
        let elemento = document.getElementById("content-search-location");
        let ver = document.getElementById("foodType");
        do {
          if (elemento == target) {
            return;
          }
          if (ver == target) {
            elemento.style.display = 'block';
            return;
          }
          target = target.parentNode;
        } while (target) {
          elemento.style.display = 'none';
        }
      }
    }
  }

