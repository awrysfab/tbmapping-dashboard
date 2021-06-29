import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import { MapContainer, TileLayer } from "react-leaflet";

import geoJson from './tes.json';

function Dashboard() {
  return (
    <>
    {console.log(geoJson)}
      <CCard>
        <CCardHeader>
          Peta Tingkat Kerawanan Tuberkulosis
        </CCardHeader>
        <CCardBody>
          <div id="mapid">
            <MapContainer
              center={[-6.8895, 111.8999]}
              zoom={10}
              style={{ height: '70vh', width: '100wh' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
