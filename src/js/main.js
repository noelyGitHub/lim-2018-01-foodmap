let inputSearch = document.getElementById('foodType');
let listSearch = document.getElementsByClassName('content-search-location');
inputSearch.addEventListener('keyup', (e) => {
    document.getElementById('content-search-location').style.display = 'block';//modal lista coincidente
    let location = event.target.value;
    let objetLocation = searchLocationfirebase(location);
    listarLocation(objetLocation);
    popup = true;
})
for (let index = 0; index < listSearch.length; index++) {
    listSearch[index].addEventListener('click', (e) => {
        let element = event.target;
        viewDataRestaurant(element.id);
        document.getElementById('content-search-location').style.display = 'none';//modal lista coincidente  
        
    }, false);
}
// funciones
const viewInformation = (name, open, calificacion, address) => {
    document.getElementById('div_new_modal').style.display = 'block';
    document.getElementById('div_new_modal').innerHTML = '';
    document.getElementById('div_new_modal').innerHTML += modalElements(name, address, open, calificacion);
    eventsModal();
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

