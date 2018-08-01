
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

}
