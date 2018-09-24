
let map;
let service;
let miUbicacion={};

initAuthentication=_=> {
    firebase.auth().signInAnonymously();
}
initMap=_=>{
    success = posicion => {
        let coordenadas = posicion.coords;
        miUbicacion = { lat: coordenadas.latitude, lng: coordenadas.longitude }
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: miUbicacion,
            disableDoubleClickZoom: true
        })
        let markadorLaboratoria = new google.maps.Marker({
            position: miUbicacion,
            map: map
        })
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: miUbicacion,
            radius: '5000',
            type: ['restaurant'],
            fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
            }, callback);
        initAuthentication();
    }
    error = error => {
        alert('Tenemos un problema al encontrar tu ubicacion');
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Tu navegador no soporta geolocalizacion');
    }
}
callback=(results, status) =>{    
    imageFirebase();
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            console.log('hola')
            createMarker(results[i]);
            verificationSesion(results[i]);
        }
    }
}

verificationSesion=dataPlace=> {
    let user = firebase.auth().currentUser;
    //primero verifio si ya inicio sesion
    let placesUser = firebase.database().ref('places');
    placesUser.once('value', data => {
        let dataUser = data.val();
        if (dataUser == null) {// carga por primera vez
            insertarFirebase(dataPlace);
        } else {
            for (const key in dataUser) {
                if (dataUser.hasOwnProperty(user.uid)) {
                    return
                }else {
                    insertarFirebase(dataPlace);
                }
            }
        }
    });
}
insertarFirebase = (data) => {
    let user = firebase.auth().currentUser;
    let photos = data.photos;  
    firebase.database().ref('places/' + user.uid).push({
        name: data.name,
        vicinity: data.vicinity,
        opening_hours: data.opening_hours?data.opening_hours.open_now:{},
        rating: data.rating?data.rating:{},
        photo:  photos?photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}):{},
        here: miUbicacion,
        latitude: data.geometry.location.lat(),
        longitude: data.geometry.location.lng(),
    });
}

createMarker=place=> {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location        
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

imageFirebase=()=>{
    let user = firebase.auth().currentUser;
    let imageURL = firebase.database().ref('places/'+ '0YIPWYvnC1VR2BhFpUGuiHoEKbf2');
    imageURL.off();
    imageURL.once('value', data => {
        let dataURL=data.val();
        for (const key in dataURL) {
            let image=dataURL[key].photo;
            console.log(image)
            viewPhotoPlace(image);
        }
    })
}
window.searchPlacesOfFirebase = (name) => {
    let user = firebase.auth().currentUser;
    let info;
    const dataUser = firebase.database().ref('/places/' +'0YIPWYvnC1VR2BhFpUGuiHoEKbf2').orderByChild('name').startAt(name).limitToFirst(6);
   return dataUser;
}
window.viewDataRestaurant = (uidRestaurant) => {
    let userId = firebase.auth().currentUser;
    const dataPostUser = firebase.database().ref('/places/' + '0YIPWYvnC1VR2BhFpUGuiHoEKbf2'+ '/' + uidRestaurant);
    dataPostUser.once('value', data => {
        let dataRestaurant = data.val();           
        viewInformation(dataRestaurant.name, dataRestaurant.opening_hours, dataRestaurant.rating, dataRestaurant.vicinity,dataRestaurant.photo, dataRestaurant.precio);
    });
}
