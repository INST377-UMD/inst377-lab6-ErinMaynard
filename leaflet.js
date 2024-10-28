function createMap() {
    var map = L.map('map').setView([38.98, -76], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    var longitude1 = getRandomInRange(-90, -100, 3);
    var longitude2 = getRandomInRange(-90, -100, 3);
    var longitude3 = getRandomInRange(-90, -100, 3);
    var latitude1 = getRandomInRange(30, 35, 3);
    var latitude2 = getRandomInRange(30, 35, 3);
    var latitude3 = getRandomInRange(30, 35, 3);


    document.getElementById('marker1').innerText = `Longitude: ${longitude1}, Latitude: ${latitude1}`;
    document.getElementById('marker2').innerText = `Longitude: ${longitude2}, Latitude: ${latitude2}`;
    document.getElementById('marker3').innerText = `Longitude: ${longitude3}, Latitude: ${latitude3}`;

    var marker1 = new L.Marker([latitude1, longitude1]);
    marker1.addTo(map);
    getLocality(latitude1, longitude1, 'marker1');
    var marker2 = new L.Marker([latitude2, longitude2]);
    marker2.addTo(map);
    getLocality(latitude2, longitude2, 'marker2');
    var marker3 = new L.Marker([latitude3, longitude3]);
    marker3.addTo(map);
    getLocality(latitude3, longitude3, 'marker3');

}

function getLocality(latitude, longitude, markerId) {


    //fetch the currency api list of currencies
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)

        .then((res) => res.json())
        .then((data) => {

            if(data.locality){
                document.getElementById(markerId).innerText += `\n Locality: ${data.locality}`
            
            }
        })
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

window.onload = createMap;