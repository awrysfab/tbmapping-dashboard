import React, { useState, useEffect } from 'react';
import { getToken } from 'src/utils/LocalStorage';
import { API_URL } from 'src/utils/ApiUrl';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CCollapse,
  CButton
} from '@coreui/react';

const TBInfo = () => {
  const [healthFacilities, setHealthFacilities] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [details, setDetails] = useState([])
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  useEffect(() => {
    fetchHealthFacilities();
  }, []);

  async function fetchHealthFacilities() {
    const result = await axios.get(`${API_URL}/health-facilities`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    setHealthFacilities(result.data.data);
  }

  async function deleteHealthFacilities(id) {
    const result = await axios.delete(`${API_URL}/health-facilities/${id}`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    window.location.reload();
  }

  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'address' },
    { key: 'subdistrict', _style: { width: '15%' } },
    { key: 'latitude', _style: { width: '5%' }, label: 'lat' },
    { key: 'longitude', _style: { width: '5%' }, label: 'long' },
    {
      key: 'options',
      _style: { width: '10%' },
      sorter: false,
      filter: false
    }
  ]

  return (
    <>
      <CCard>
        <CCardHeader>
          Fasilitas Kesehatan
        </CCardHeader>
        <CCardBody>
          {console.log(healthFacilities)}
          <CDataTable
            items={healthFacilities}
            fields={fields}
            itemsPerPageSelect
            itemsPerPage={10}
            tableFilter
            hover
            sorter
            pagination
            scopedSlots={{
              'subdistrict':
                (item) => (
                  <td>{item.subdistrict.name}</td>
                ),
              'options':
                (item, index) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => { toggleDetails(index) }}
                      >
                        {details.includes(index) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                  )
                },
              'details':
                (item, index) => {
                  return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <h4>
                          {item.name}
                        </h4>
                        <CButton size="sm" color="info">
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1"
                          onClick={() => { deleteHealthFacilities(item.id) }}
                        >
                          Delete
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  )
                }
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default TBInfo
