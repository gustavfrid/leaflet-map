import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import L from 'leaflet'

import icon from '../utils/constants'

export const LeafletControlGeocoder = ({ setPosition }) => {
  const map = useMap()

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim()
    if (typeof URLSearchParams !== 'undefined' && Location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(Location.search)
      var geocoderString = params.get('geocoder')
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]()
      } else if (geocoderString) {
        console.warn('Unsupported geocoder', geocoderString)
      }
    }

    L.Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: true,
      geocoder,
    })
      .on('markgeocode', function (e) {
        var latlng = e.geocode.center
        setPosition({ lat: latlng.lat, lng: latlng.lng })
        // L.marker(latlng, { icon }).addTo(map).bindPopup(e.geocode.name).openPopup()
        map.fitBounds(e.geocode.bbox)
      })
      .addTo(map)
  }, [map])

  return null
}
