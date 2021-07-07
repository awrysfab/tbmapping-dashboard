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

const TBIndex = () => {
  const [clusterAttributes, setClusterAttributes] = useState([]);
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
    fetchClusterAttribute();
  }, []);

  async function fetchClusterAttribute() {
    const result = await axios.get(`${API_URL}/cluster-attributes`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    setClusterAttributes(result.data.data);
  }

  const fields = [
    { key: 'year', _style: { width: '10%' } },
    { key: 'subdistrict' },
    { key: 'case', _style: { width: '10%' } },
    { key: 'target_case', _style: { width: '10%' } },
    { key: 'death_rate', _style: { width: '10%' } },
    { key: 'density', _style: { width: '10%' } },
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
          Data Tuberkulosis
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={clusterAttributes}
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
                          Kecamatan {item.subdistrict.name}
                        </h4>
                        <p className="text-muted">Tahun {item.year}</p>
                        <CButton size="sm" color="info">
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1">
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

export default TBIndex