function initMap() {
    const map = new google.maps.Map(
        document.querySelector('#myMap'), {
        zoom: 13,
        center: { lat: 40.39182833058208, lng: -3.698061784976474 },
        styles: mapStyles.electric
    })
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(),
        map: map
    })
    const geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map)
    })
}


function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        console.log(results[0].geometry.location)

        document.querySelector('#location-lat').value = results[0].geometry.location.lat()
        document.querySelector('#location-lng').value = results[0].geometry.location.lng()
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            var error = document.getElementById('error-msg');
            var errorText = 'Address lookup was not successful for the following reason: ' + status;
            error.insertAdjacentHTML('afterBegin', errorText);
        }
        console.log(results[0].formatted_address)
    });
}

// function getEvents(map) {

//     axios
//         .get('/api/event')
//         .then(response => printEvents(response.data, map))
//         .catch(err => console.log(err))
// }


// function printEvents(events, map) {

//     restaurants.forEach(elm => {
//         let position = {
//             lat: elm.location.coordinates[0],
//             lng: elm.location.coordinates[1]
//         }
//         new google.maps.Marker({ map, position })
//     })
// }

