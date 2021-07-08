import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import mapData from '../../data/MapData';
import { CLUSTER_API_URL } from 'src/utils/ApiUrl';

function Dashboard() {
  const [clusteringResults, setClusteringResults] = useState([]);

  useEffect(() => {
    fetchClusteringResult();
  }, []);

  async function fetchClusteringResult() {
    const result = await axios.get(`${CLUSTER_API_URL}/2017`)
    setClusteringResults(result.data);
  }

  const maps = mapData.map((item, index) => {
    if (clusteringResults.length !== 0) {
      console.log(item.features[0].properties.Kecamatan);
      console.log(clusteringResults[index]);
      if (clusteringResults[index].cluster === 'Tinggi') {
        return <GeoJSON key={item.features[0].properties.Kecamatan} data={item}
          style={
            {
              "color": "#ff0000",
              "weight": 2,
              "opacity": 0.65
            }
          } />
      } else if(clusteringResults[index].cluster === 'Sedang'){
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
        {console.log(clusteringResults)}
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
