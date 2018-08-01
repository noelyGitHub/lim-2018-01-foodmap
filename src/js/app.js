
var map;
var service;
var infowindow;

function initMap() {
    success = posicion => {
        let coordenadas = posicion.coords;
        miUbicacion = { lat: coordenadas.latitude, lng: coordenadas.longitude }
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: miUbicacion,
        })
        let markadorLaboratoria = new google.maps.Marker({
            position: miUbicacion,
            map: map
        })

        var request = {
            location: miUbicacion,
            radius: '500',
            type: ['restaurant']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
        console.log(service);
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


function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

/* 
initMap = () => {
    let miUbicacion = {};
    success = posicion => {
        let coordenadas = posicion.coords;
        miUbicacion = { lat: coordenadas.latitude, lng: coordenadas.longitude }
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: miUbicacion,
        })
        let markadorLaboratoria = new google.maps.Marker({
            position: miUbicacion,
            map: map
        })
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

} */
