function initMap() {
    const map = new google.maps.Map(
        document.querySelector('#myMap'), {
        zoom: 15,
        center: { lat: 40.39182833058208, lng: -3.698061784976474 },
        styles: mapStyles.electric
    }
    )
    getEvents(map)
}

function addressMap() {

}

function getEvents(map) {

    axios
        .get('/api/event')
        .then(response => printEvents(response.data, map))
        .catch(err => console.log(err))
}


function printEvents(events, map) {

    restaurants.forEach(elm => {
        let position = {
            lat: elm.location.coordinates[0],
            lng: elm.location.coordinates[1]
        }
        new google.maps.Marker({ map, position })
    })
}

