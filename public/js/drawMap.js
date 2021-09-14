function initMap() {
    const latitude = Number(document.querySelector('#latitude').innerHTML)
    const longitude = Number(document.querySelector('#longitude').innerHTML)

    const map = new google.maps.Map(
        document.querySelector('#myMap'), {
        zoom: 15,
        center: { lat: latitude, lng: longitude },
        styles: mapStyles.electric
    })
    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map
    })
}