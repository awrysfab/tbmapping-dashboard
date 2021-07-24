import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CButtonGroup,
} from '@coreui/react';
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import mapData from '../../data/MapData';
import { CLUSTER_API_URL } from 'src/utils/ApiUrl';

function Dashboard() {
  const [clusteringResults, setClusteringResults] = useState([]);
  const [displayedYear, setdisplayedYear] = useState(2017);

  useEffect(() => {
    fetchClusteringResult(displayedYear);
  }, [displayedYear]);

  async function fetchClusteringResult(year) {
    const result = await axios.get(`${CLUSTER_API_URL}/${year}`)
    setClusteringResults(result.data);
  }

  const maps = mapData.map((item, index) => {
    if (clusteringResults.length !== 0) {
      if (clusteringResults[index].cluster === 'Tinggi') {
        return <GeoJSON key={item.features[0].properties.Kecamatan} data={item}
          style={
            {
              "color": "#ff0000",
              "weight": 2,
              "opacity": 0.65
            }
          } />
      } else if (clusteringResults[index].cluster === 'Sedang') {
        return <GeoJSON key={item.features[0].properties.Kecamatan} data={item}
          style={
            {
              "color": "#FFA500",
              "weight": 2,
              "opacity": 0.65
            }
          } />
      } else {
        return <GeoJSON key={item.features[0].properties.Kecamatan} data={item}
          style={
            {
              "color": "#227800",
              "weight": 2,
              "opacity": 0.65
            }
          } />
      }
    }
    return [];
  })

  return (
    <>
      <CCard>
        <CCardHeader>
          Peta Tingkat Kerawanan Tuberkulosis tahun {displayedYear}
        </CCardHeader>
        <CCardBody>
          <CButtonGroup>
            <CButton
              color={displayedYear === 2017 ? "dark" : "light"}
              onClick={() => { setdisplayedYear(2017); fetchClusteringResult(2017) }}>
              2017
            </CButton>
            <CButton
              color={displayedYear === 2018 ? "dark" : "light"}
              onClick={() => { setdisplayedYear(2018); fetchClusteringResult(2018) }}>
              2018
            </CButton>
            <CButton
              color={displayedYear === 2019 ? "dark" : "light"}
              onClick={() => { setdisplayedYear(2019); fetchClusteringResult(2019) }}>
              2019
            </CButton>
          </CButtonGroup>

          <div id="mapid">
            <MapContainer
              center={[-6.9575, 111.8999]}
              zoom={10}
              style={{ height: '60vh', width: '100wh' }}
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
