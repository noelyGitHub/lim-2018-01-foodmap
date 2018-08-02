
var map;
var service;
var infowindow;

var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
};
function initAuthentication() {

    firebase.auth().signInAnonymously().catch(function (error) { });
}
function initMap() {
    success = posicion => {
        let coordenadas = posicion.coords;
        miUbicacion = { lat: coordenadas.latitude, lng: coordenadas.longitude }
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: miUbicacion,
            disableDoubleClickZoom: true
        })
        let markadorLaboratoria = new google.maps.Marker({
            position: miUbicacion,
            map: map
        })
        var infoBoxDiv = document.createElement('div');
        var infoBox = new makeInfoBox(infoBoxDiv, map);
        infoBoxDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: miUbicacion,
            radius: '5000',
            type: ['restaurant'],
            fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours/open_now', 'geometry/location', 'plus_code/compound_code', 'vicinity'],
        }, callback);

        initAuthentication();

    }
    error = error => {
        alert('Tenemos un problema al encontrar tu ubicacion');
        console.log('error (' + error.code + '):' + error.message);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Tu navegador no soporta geolocalizacion');
    }
}

function insertData(data) {
    let user = firebase.auth().currentUser;
    let open;
        if(data.opening_hours==undefined){
            open=false;
        }else{
            open=data.opening_hours.open_now;
        }
        firebase.database().ref('places/' + user.uid).push({
            name: data.name,
            vicinity: data.vicinity,
            opening_hours: open,
            photos: {},
            rating: data.rating,
            here: miUbicacion,
        }); 
    
    /*  */
}
function callback(results, status) {
    console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            place = results[i];
            createMarker(results[i]);
            insertData(results[i]);
        }
    }    
    console.log(results)
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#000';
    controlUI.style.border = 'none';
    controlUI.style.borderRadius = '.4em';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.padding = '.5em 1em';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = '#fff';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.innerText = 'RESTAURANT CERCA DE TI';
    controlUI.appendChild(controlText);
}
window.searchLocationfirebase = (name) => {  
    console.log('holaaa');
    let user = firebase.auth().currentUser;
    let info;
    const dataUser = firebase.database().ref('/places/'+user.uid).orderByChild('name').startAt(name).limitToFirst(10);
    dataUser.on('value',data=>{
        console.log(data.val());
    })
    return dataUser;
  }
window.viewDataRestaurant=(uidRestaurant)=>{
    let userId = firebase.auth().currentUser;
    const dataPostUser = firebase.database().ref('/places/'+userId.uid+'/'+ uidRestaurant);
    dataPostUser.once('value', data => {
        let dataRestaurant=data.val();
        console.log(dataRestaurant);        
        viewInformation(dataRestaurant.name,dataRestaurant.opening_hours,dataRestaurant.rating,dataRestaurant.vicinity);
    });
}