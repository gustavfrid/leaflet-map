import React, { useState, useRef, useMemo } from 'react'

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import styled from 'styled-components'

const MapWarapper = styled.div`
  height: 600px;
  margin: auto;
  width: 600px;
  background-color: grey;
`

export const LeafletMap = () => {
  const [position, setPosition] = useState({ lat: 59.32496507200476, lng: 18.070742255316343 })
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    []
  )

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        console.log(e.latlng.lat)
        console.log(e.latlng.lng)
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
      },
    })
    return false
  }

  return (
    <MapWarapper>
      <MapContainer center={position} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker draggable position={position} ref={markerRef} eventHandlers={eventHandlers} />
        <MapEvents />
      </MapContainer>
    </MapWarapper>
  )
}