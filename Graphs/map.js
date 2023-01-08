function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
}
//--- Page Events
function activate() {
    var baseUri="http://192.168.160.58/Olympics/api/games?pagesize=51&page=1"
    console.log("Loading Map")
    var map= L.map('map',{zoomSnap: 0.5}).on("click", function(e){var coord= e.latlng;console.log(coord)}).setView([15,12],2);
    var bounds = L.latLngBounds([[81.5, 192], [-75.5, -170.5]]);
    map.dragging.disable()
    map.setMaxBounds(bounds);
    // Set up the OSM layer
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
            maxZoom:18,
            minZoom:2,
            bounds:bounds,
        }).addTo(map);
    console.log('CALL: getMarkerGame...');
    ajaxHelper(baseUri, 'GET').done(function (result) {
        data = result.Records
        console.log(data);
        for (var id=1;id<51;id++){
            var Id=data[id].Id;
            var Name=data[id].Name;
            var CityName=data[id].CityName;
            var CountryName=data[id].CountryName;
            var Lat=parseFloat(data[id].Lat);
            var Lon=parseFloat(data[id].Lon);
            var myIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            console.log(Id)
            L.marker([Lat,Lon],{icon: myIcon}).on("click", showLocation).bindPopup("<a style='text-decoration:none; 'href='./gamesDetails.html?id=" + Id + "'"+ "'" + "'><b>" + Name + "</b></a><br>" + CityName + ", "+ CountryName).addTo(map);
        }
        
    });
    hideLoading();
    map.on('zoomend', function(e) {
        if (map.getZoom()==2) map.dragging.disable()
        else map.dragging.enable()
    });
    function showLocation(e){
        var coord= e.latlng;
        console.log(coord)
        console.log("("+ coord.lat+ ","+ coord.lng+ ")");
        zoom=map.getZoom()
        console.log(zoom)
        if (zoom<5) map.setZoomAround(coord,5)
        else return
    }
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: false });
    });
};



//--- Internal functions
function ajaxHelper(uri, method, data) {
    var error='' 
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            hideLoading();
            error=errorThrown;
        }
    });

}
function showLoading() {
    $('#myModal').modal('show',{
        backdrop: 'static',
        keyboard: false
    });
}
function hideLoading() {
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#myModal").modal('hide');
    })
}

const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    Comment: [
        Joi.string(),
        Joi.number()
    ],


    Email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

schema.validate({ username: 'abc' });
// -> { value: { username: 'abc' } }

schema.validate({});
// -> { value: {}, error: '"Name" is required' }


try {
    const value = await schema.validateAsync({ username: 'abc' });
}
catch (err) { }























$(document).ready(function(){
    //--- start ....
    showLoading();
    activate();
    
    
});