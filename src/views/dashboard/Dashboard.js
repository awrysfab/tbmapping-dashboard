import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import mapData from '../../data/MapData';

function Dashboard() {
  const maps = mapData.map((item) => {
    return <GeoJSON key={item.features[0].properties.WADMKC} data={item} />
  })
  return (
    <>
      <CCard>
        <CCardHeader>
          Peta Tingkat Kerawanan Tuberkulosis
        </CCardHeader>
        <CCardBody>
          <div id="mapid">
            <MapContainer
              center={[-6.9575, 111.8999]}
              zoom={10}
              style={{ height: '70vh', width: '100wh' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            {maps}
            </MapContainer>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
