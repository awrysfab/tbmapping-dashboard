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
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CForm,
  CTextarea,
  CLabel,
  CInput
} from '@coreui/react';

const HealthFacilityInfo = () => {
  const [idEdit, setIdEdit] = useState(0);
  const [nameEdit, setNameEdit] = useState("");
  const [addressEdit, setAddressEdit] = useState("");
  const [subdistrictIdEdit, setSubdistrictIdEdit] = useState("");
  const [latEdit, setLatEdit] = useState("");
  const [longEdit, setLongEdit] = useState("");

  const [nameAdd, setNameAdd] = useState("");
  const [addressAdd, setAddressAdd] = useState("");
  const [subdistrictIdAdd, setSubdistrictIdAdd] = useState("");
  const [latAdd, setLatAdd] = useState("");
  const [longAdd, setLongAdd] = useState("");

  const [healthFacilities, setHealthFacilities] = useState([]);

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

  const [addModal, setAddModal] = useState(false);
  const toggleAdd = () => { setAddModal(!addModal); }

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => { setEditModal(!editModal); }

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => { setDeleteModal(!deleteModal); }

  useEffect(() => {
    fetchHealthFacilities();
  }, []);

  const handleAddSubmit = (event) => {
    addHealthFacilities({
      name: nameAdd,
      address: addressAdd,
      latitude: latAdd,
      longitude: longAdd,
      subdistrict_id: subdistrictIdAdd,
    })
  }

  const handleEditSubmit = (event) => {
    updateHealthFacilities({
      id: idEdit,
      name: nameEdit,
      address: addressEdit,
      latitude: latEdit,
      longitude: longEdit,
      subdistrict_id: subdistrictIdEdit,
    })
  }

  async function fetchHealthFacilities() {
    const result = await axios.get(`${API_URL}/health-facilities`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    setHealthFacilities(result.data.data);
  }

  async function addHealthFacilities({ name, address, latitude, longitude, subdistrict_id }) {
    const result = await axios.post(`${API_URL}/health-facilities`, {
      name,
      address,
      latitude,
      longitude,
      subdistrict_id
    }, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    if (result.status === 200) {
      toggleAdd()
      window.location.reload()
    }
  }

  async function updateHealthFacilities({ id, name, address, latitude, longitude, subdistrict_id }) {
    const result = await axios.put(`${API_URL}/health-facilities/${id}`, {
      name,
      address,
      latitude,
      longitude,
      subdistrict_id
    }, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    if (result.status === 200) {
      toggleEdit()
      window.location.reload()
    }
  }

  async function deleteHealthFacilities(id) {
    await axios.delete(`${API_URL}/health-facilities/${id}`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    window.location.reload();
  }

  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'address' },
    { key: 'subdistrict', _style: { width: '10%' } },
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
          <CButton size="m" color="info"
            onClick={() => {
              toggleAdd();
            }}>
            Tambah Data
          </CButton>

          <CModal
            show={addModal}
            onClose={toggleAdd}
          >
            <CForm
            // onSubmit={handleAddSubmit}
            >
              <CModalHeader closeButton>Tambah Data</CModalHeader>
              <CModalBody>
                <CLabel htmlFor={`name-add`}>Name</CLabel>
                <CInput
                  type="text"
                  id={`name-add`}
                  name="name"
                  defaultValue={nameAdd}
                  onChange={e => setNameAdd(e.target.value)}
                />
                <CLabel htmlFor={`address-add`}>Address</CLabel>
                <CTextarea
                  id={`address-add`}
                  name="address"
                  rows="3"
                  defaultValue={addressAdd}
                  onChange={e => setAddressAdd(e.target.value)}
                />
                <CLabel htmlFor={`lat-add`}>Latitude</CLabel>
                <CInput
                  type="text"
                  id={`lat-add`}
                  name="lat"
                  defaultValue={latAdd}
                  onChange={e => setLatAdd(e.target.value)}
                />
                <CLabel htmlFor={`description-add`}>Longitude</CLabel>
                <CInput
                  type="text"
                  id={`long-add`}
                  name="long"
                  defaultValue={longAdd}
                  onChange={e => setLongAdd(e.target.value)}
                />
                <CLabel htmlFor={`subdistrict-add`}>Subdistrict</CLabel>
                <CInput
                  type="text"
                  id={`subdistrict-add`}
                  name="subdistricts"
                  defaultValue={subdistrictIdAdd}
                  onChange={e => setSubdistrictIdAdd(e.target.value)}
                />
              </CModalBody>
              <CModalFooter>
                <CButton color="info"
                  onClick={handleAddSubmit}
                // type="submit"
                >Tambah</CButton>
                <CButton
                  color="secondary"
                  onClick={toggleAdd}
                >Cancel</CButton>
              </CModalFooter>
            </CForm>
          </CModal>
          <br></br>

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
                        <CButton size="sm" color="info"
                          onClick={() => {
                            toggleEdit()
                            setIdEdit(item.id);
                            setNameEdit(item.name);
                            setAddressEdit(item.address);
                            setLatEdit(item.latitude);
                            setLongEdit(item.longitude);
                            setSubdistrictIdEdit(item.subdistrict_id);
                          }}>
                          Edit
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1"
                          onClick={() => { toggleDelete() }}
                        >
                          Delete
                        </CButton>


                        <CModal
                          show={editModal}
                          onClose={toggleEdit}
                        >
                          <CForm
                          // onSubmit={handleEditSubmit}
                          >
                            <CModalHeader closeButton>Edit Data</CModalHeader>
                            <CModalBody>
                              <CLabel htmlFor={`name` + item.id}>Name</CLabel>
                              <CInput
                                type="text"
                                id={`name` + item.id}
                                name="name"
                                defaultValue={nameEdit}
                                onChange={e => setNameEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`address` + item.id}>Address</CLabel>
                              <CTextarea
                                id={`address` + item.id}
                                name="address"
                                rows="3"
                                defaultValue={addressEdit}
                                onChange={e => setAddressEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`lat` + item.id}>Latitude</CLabel>
                              <CInput
                                type="text"
                                id={`lat` + item.id}
                                name="lat"
                                defaultValue={latEdit}
                                onChange={e => setLatEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`long` + item.id}>Longitude</CLabel>
                              <CInput
                                type="text"
                                id={`long` + item.id}
                                name="long"
                                defaultValue={longEdit}
                                onChange={e => setLongEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`subdistrict` + item.id}>Subdistrict</CLabel>
                              <CInput
                                type="text"
                                id={`subdistrict` + item.id}
                                name="subdistrict"
                                defaultValue={subdistrictIdEdit}
                                onChange={e => setSubdistrictIdEdit(e.target.value)}
                              />
                            </CModalBody>
                            <CModalFooter>
                              <CButton color="info"
                                onClick={handleEditSubmit}
                              // type="submit"
                              >Edit</CButton>
                              <CButton
                                color="secondary"
                                onClick={toggleEdit}
                              >Cancel</CButton>
                            </CModalFooter>
                          </CForm>
                        </CModal>

                        <CModal
                          show={deleteModal}
                          onClose={toggleDelete}
                        >
                          <CModalHeader closeButton>Hapus Data</CModalHeader>
                          <CModalBody>
                            Apakah anda ingin menghapus <strong>{item.name}</strong>?
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="danger"
                              onClick={() => { deleteHealthFacilities(item.id) }}
                            >Hapus</CButton>
                            <CButton
                              color="secondary"
                              onClick={toggleDelete}
                            >Kembali</CButton>
                          </CModalFooter>
                        </CModal>
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

export default HealthFacilityInfo
