  var map = L.map('mapid', {
    maxZoom: 19,
    minZoom: 4
  }).setView([52.129676, 21.012229], 8);

  L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=g9DeJUxKFSxOTm8u9WaD', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
 
  }).addTo(map);

  //var marker = L.marker([51.5, -0.09]).addTo(map);
  
  
  //add marker
  const pickmarkerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  // specify the path here
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  });

  const deliverymarkerIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    // specify the path here
    iconUrl: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    });

    const HeadbasemarkerIcon = L.icon({
      iconSize: [41, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'dellogo.png',
      });

  var a=new L.LatLng(52.229676, 21.012229);
  var b=new L.LatLng(52.5, 20);
  var c=new L.LatLng(51.7592, 19.4560);   

  var _firstLatLng = L.marker(a,
  {
  draggable: true, // Make the icon dragable
  title: "Deliver@", // Add a title
  opacity: 1,
  icon: deliverymarkerIcon // here assign the markerIcon var
  } 
  ).addTo(this.map)

  var _secondLatLng = L.marker(b,
  {
  draggable: true, // Make the icon dragable
  title: "Pick-Up@", // Add a title
  opacity: 1,
  icon: pickmarkerIcon // here assign the markerIcon var
  } 
  ).addTo(map)

  L.marker([51.7592, 19.4560],
    {
    draggable: false, // Make the icon dragable
    title: "Master Branch", // Add a title
    opacity: 100,
    icon: HeadbasemarkerIcon // here assign the markerIcon var
    }, // Adjust the opacity
    ).bindTooltip("HeadBase", 
    {
        permanent: true, 
        direction: 'bottom'
    }).addTo(map)

    
  var logo = L.control({position: 'topleft'});
  logo.onAdd = function(map){
      var div = L.DomUtil.create('div', 'infosecond');
      div.innerHTML= "<img src='info_icon_black.png' width='50px' height='50px'/>";
      return div;
      
  }
  logo.addTo(map);

  var logop = L.control({position: 'topleft'});
  logop.onAdd = function(map){
      var div = L.DomUtil.create('div', 'infop');
      div.innerHTML= "<strong>Please drag the markers<br /> to the desired locations</strong>";
      return div;
      
  }
  logop.addTo(map);
  
  _firstLatLng.on("dragend",function(e){

    var changedPos1 = e.target.getLatLng();
    this.bindPopup(changedPos1.toString()).openPopup();
    
});

 _secondLatLng.on("dragend",function(e){

  var changedPos2 = e.target.getLatLng();
  this.bindPopup(changedPos2.toString()).openPopup();

});

  
  var polyline = new L.polyline([a, b, c], {
    color: 'red',

  }).addTo(map);

  
function dragStartHandler (e) {
   // Get the polyline's latlngs
   var latlngs = polyline.getLatLngs(),

   // Get the marker's start latlng
   latlng = this.getLatLng();

    // Iterate the polyline's latlngs
    for (var i = 0; i < latlngs.length; i++) {

   // Compare each to the marker's latlng
        if (latlng.equals(latlngs[i])) {

       // If equals store key in marker instance
        this.polylineLatlng = i;
      }
  }
}


function dragHandler (e) {
  var latlngs = polyline.getLatLngs(),
      latlng = this.getLatLng();
  // Replace the old latlng with the new
  latlngs.splice(this.polylineLatlng, 1, latlng);
  // Update the polyline with the new latlngs
  polyline.setLatLngs(latlngs);
  // calculate distance of current latlngs
  var dist = 0;
  for (var i = 1; i < latlngs.length; i++) {
    dist += map.distance(latlngs[i-1], latlngs[i]);
}
  document.getElementById('distance').innerHTML = dist;
}

function dragEndHandler (e) {
  delete this.polylineLatlng;
}

_firstLatLng
    .on('dragstart', dragStartHandler)
    .on('drag', dragHandler)
    .on('dragend', dragEndHandler);

_secondLatLng
    .on('dragstart', dragStartHandler)
    .on('drag', dragHandler)
    .on('dragend', dragEndHandler);

  

   