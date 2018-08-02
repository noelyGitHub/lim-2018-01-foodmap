/* agregar datos a partir de un marcador 
<!DOCTYPE html >
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <title>From Info Windows to a Database: Saving User-Added Form Data</title>
    <style>
      #map {
        height: 100%;
      }
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map" height="460px" width="100%"></div>
    <div id="form">
      <table>
      <tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>
      <tr><td>Address:</td> <td><input type='text' id='address'/> </td> </tr>
      <tr><td>Type:</td> <td><select id='type'> +
                 <option value='bar' SELECTED>bar</option>
                 <option value='restaurant'>restaurant</option>
                 </select> </td></tr>
                 <tr><td></td><td><input type='button' value='Save' onclick='saveData()'/></td></tr>
      </table>
    </div>
    <div id="message">Location saved</div>
    <script>
      var map;
      var marker;
      var infowindow;
      var messagewindow;

      function initMap() {
        var california = {lat: 37.4419, lng: -122.1419};
        map = new google.maps.Map(document.getElementById('map'), {
          center: california,
          zoom: 13
        });

        infowindow = new google.maps.InfoWindow({
          content: document.getElementById('form')
        });

        messagewindow = new google.maps.InfoWindow({
          content: document.getElementById('message')
        });

        google.maps.event.addListener(map, 'click', function(event) {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: map
          });


          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
        });
      }

      function saveData() {
        var name = escape(document.getElementById('name').value);
        var address = escape(document.getElementById('address').value);
        var type = document.getElementById('type').value;
        var latlng = marker.getPosition();
        var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
                  '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

        downloadUrl(url, function(data, responseCode) {

          if (responseCode == 200 && data.length <= 1) {
            infowindow.close();
            messagewindow.open(map, marker);
          }
        });
      }

      function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request.responseText, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
      }

      function doNothing () {
      }

    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html> */

/*
var map;
var service;
var infowindow;

var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
};
function initAuthentication(onAuthSuccess) {

    firebase.auth().signInAnonymously().then(function (data) {
        if (data) {                   
            data.sender = data.uid;
            console.log('', data);
            onAuthSuccess();
        }

    }
      
    ).catch(function (error) { });
}
function initMap() {
    success = posicion => {
        let coordenadas = posicion.coords;
        miUbicacion = { lat: coordenadas.latitude, lng: coordenadas.longitude }
        console.log(miUbicacion);
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: miUbicacion,
            styles: [{
                featureType: 'poi',
                stylers: [{ visibility: 'on' }]  // Desactivar los puntos de interés.
            }, {
                featureType: 'transit.station',
                stylers: [{ visibility: 'on' }]  // Turn off bus stations, train stations, etc.
            }],
            disableDoubleClickZoom: true
        })
        let markadorLaboratoria = new google.maps.Marker({
            position: miUbicacion,
            map: map
        })
        // firebase
        var infoBoxDiv = document.createElement('div');
        var infoBox = new makeInfoBox(infoBoxDiv, map);
        infoBoxDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
        /* Data object to be written to Firebase.
         // Listen for clicks and add the location of the click to firebase.
         map.addListener('click', function(e) {
            data.lat = e.latLng.lat();
            data.lng = e.latLng.lng();
            addToFirebase(data);
          });
        // Create a heatmap.
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: [],
            map: map,
            radius: 16
        }); 
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: miUbicacion,
            radius: '5000',
            type: ['restaurant'],
            fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours/open_now', 'geometry/location','plus_code/compound_code','vicinity'],
            //formatted_address, geometry, icon, id, name, permanently_closed, photos, place_id, plus_code, scope,types
        }, callback);
        
       // initAuthentication(initFirebase.bind(undefined, heatmap));

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

function initFirebase(heatmap) {

    // 10 minutes before current time.
    var startTime = new Date().getTime() - (60 * 10 * 1000);

    // Reference to the clicks in Firebase.
    var clicks = firebase.database().ref().child('clicks');

    // Listener for when a click is added.
    clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
        function (snapshot) {

            // Get that click from firebase.
            var newPosition = snapshot.val();
            var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
            var elapsed = new Date().getTime() - newPosition.timestamp;

            // Add the point to  the heatmap.
            heatmap.getData().push(point);

            // Requests entries older than expiry time (10 minutes).
            var expirySeconds = Math.max(60 * 10 * 1000 - elapsed, 0);
            // Set client timeout to remove the point after a certain time.
            window.setTimeout(function () {
                // Delete the old point from the database.
                snapshot.ref().remove();
            }, expirySeconds);
        }
    );

    // Remove old data from the heatmap when a point is removed from firebase.
    clicks.on('child_removed', function (snapshot, prevChildKey) {
        var heatmapData = heatmap.getData();
        var i = 0;
        while (snapshot.val().lat != heatmapData.getAt(i).lat()
            || snapshot.val().lng != heatmapData.getAt(i).lng()) {
            i++;
        }
        heatmapData.removeAt(i);
    });
}

/**
 * Updates the last_message/ path with the current timestamp.
 * @param {function(Date)} addClick After the last message timestamp has been updated,
 *     this function is called with the current timestamp to add the
 *     click to the firebase.
 
function getTimestamp(addClick) {
    // Reference to location for saving the last click time.
    var ref = firebase.database().ref('last_message/' + data.sender);

    //ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.

    // Set value to timestamp.
    ref.set(firebase.database.ServerValue.TIMESTAMP, function (err) {
        if (err) {  // Write to last message was unsuccessful.
            console.log(err);
        } else {  // Write to last message was successful.
            ref.once('value', function (snap) {
                addClick(snap.val());  // Add click with same timestamp.
            }, function (err) {
                console.warn(err);
            });
        }
    });
}

/**
 * Adds a click to firebase.
 * @param {Object} data The data to be added to firebase.
 *     It contains the lat, lng, sender and timestamp.
 
function addToFirebase(data) {
    getTimestamp(function (timestamp) {
        // Add the new timestamp to the record data.
        data.timestamp = timestamp;
        var ref = firebase.database().ref().child('clicks').push(data, function (err) {
            if (err) {  // Data was not written to firebase.
                console.warn(err);
            }
        });
    });
}
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
         place = results[i];
            createMarker(results[i]);
        }
    }
    console.log(place)
    console.log(results)
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
console.log(place.name)
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.innerText = 'La mapa muestra todos los respaturant cerca.';
    controlUI.appendChild(controlText);
}

 */