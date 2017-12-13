$(document).ready(function(){
  $('#button_map').click(() => {
    $('#map').removeClass('d-none')    
    initMap()
  })

  function initMap() {

    var pos = {
      lat: 0,
      lng: 0
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos.lat = position.coords.latitude
        pos.lng = position.coords.longitude
        follow(pos, true)      
      }, function() {
        follow(pos, false)            
      })
    } else {
      follow(pos, false)            
      
    }

    function follow(pos, geoloc) {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 6
      })

      if (geoloc === false) {
        var marker = new google.maps.Marker({
          map: map
        })
        sendPos(null)
      }
      else {
        var marker = new google.maps.Marker({
          position: pos,
          map: map
        })
        sendPos(marker.position)
      }

    
      map.addListener('click', function(e) {
        marker.setPosition(e.latLng)
        sendPos(marker.position)
      })
      
      marker.addListener('click', function() {
        marker.setPosition(null)
        sendPos(null)
      })
      console.log()
    }
  }

  function sendPos(pos) {
    console.log(pos)
    if (pos === null) {
      $.get('/profil/change_pos', {}, function(data, jqHXR) {  
        if (jqHXR === "success")
          ret(data)
      })
    }
    else { 
      $.get('/profil/change_pos', {lat : pos.lat, lng : pos.lng}, function(data, jqHXR) {  
          if (jqHXR === "success")
            ret(data)
      })
    }
  }
  function ret(data) {
    if (data[0] === false && data[1] === 'redirect_error')
      window.location.replace("/error")
  }
})