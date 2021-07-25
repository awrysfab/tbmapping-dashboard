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
  CLabel,
  CInput
} from '@coreui/react';

const TBIndex = () => {
  const [idEdit, setIdEdit] = useState();
  const [newCaseEdit, setNewCaseEdit] = useState();
  const [targetCaseEdit, setTargetCaseEdit] = useState();
  const [deathRateEdit, setDeathRateEdit] = useState();
  const [densityEdit, setDensityEdit] = useState();
  const [healthyHomeEdit, setHealthyHomeEdit] = useState();
  const [yearEdit, setYearEdit] = useState();
  const [subdistrictIdEdit, setSubdistrictIdEdit] = useState();

  const [newCaseAdd, setNewCaseAdd] = useState();
  const [targetCaseAdd, setTargetCaseAdd] = useState();
  const [deathRateAdd, setDeathRateAdd] = useState();
  const [densityAdd, setDensityAdd] = useState();
  const [healthyHomeAdd,] = useState(0);
  const [yearAdd, setYearAdd] = useState();
  const [subdistrictIdAdd, setSubdistrictIdAdd] = useState();

  const [clusterAttributes, setClusterAttributes] = useState([]);

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
    fetchClusterAttribute();
  }, []);

  const handleAddSubmit = (event) => {
    addClusterAttribute({
      new_case: newCaseAdd,
      target_case: targetCaseAdd,
      death_rate: deathRateAdd,
      density: densityAdd,
      healthy_home: healthyHomeAdd,
      year: yearAdd,
      subdistrict_id: subdistrictIdAdd,
    })
  }

  const handleEditSubmit = (event) => {
    updateClusterAttribute({
      id: idEdit,
      new_case: newCaseEdit,
      target_case: targetCaseEdit,
      death_rate: deathRateEdit,
      density: densityEdit,
      healthy_home: healthyHomeEdit,
      year: yearEdit,
      subdistrict_id: subdistrictIdEdit,
    })
  }

  async function fetchClusterAttribute() {
    const result = await axios.get(`${API_URL}/cluster-attributes`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    setClusterAttributes(result.data.data);
  }

  async function addClusterAttribute({
    new_case,
    target_case,
    death_rate,
    density,
    healthy_home,
    year,
    subdistrict_id,
  }) {
    const result = await axios.post(`${API_URL}/cluster-attributes`, {
      new_case,
      target_case,
      death_rate,
      density,
      healthy_home,
      year,
      subdistrict_id,
    }, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    if (result.status === 200) {
      toggleAdd()
      window.location.reload()
    }
  }

  async function updateClusterAttribute({
    id,
    new_case,
    target_case,
    death_rate,
    density,
    healthy_home,
    year,
    subdistrict_id,
  }) {
    const result = await axios.put(`${API_URL}/cluster-attributes/${id}`, {
      "case": new_case,
      target_case,
      death_rate,
      density,
      healthy_home,
      year,
      subdistrict_id,
    }, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    if (result.status === 200) {
      toggleEdit()
      window.location.reload()
    }
  }

  async function deleteClusterAttribute(id) {
    await axios.delete(`${API_URL}/cluster-attributes/${id}`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    window.location.reload();
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
                <CLabel htmlFor={`new-case-add`}>Kasus</CLabel>
                <CInput
                  type="text"
                  id={`new-case-add`}
                  name="new-case"
                  defaultValue={newCaseAdd}
                  onChange={e => setNewCaseAdd(e.target.value)}
                />
                <CLabel htmlFor={`target-case-add`}>Target Kasus</CLabel>
                <CInput
                  type="text"
                  id={`target-case-add`}
                  name="target-case"
                  defaultValue={targetCaseAdd}
                  onChange={e => setTargetCaseAdd(e.target.value)}
                />
                <CLabel htmlFor={`death-rate-add`}>Angka Kematian</CLabel>
                <CInput
                  type="text"
                  id={`death-rate-add`}
                  name="death-rate"
                  defaultValue={deathRateAdd}
                  onChange={e => setDeathRateAdd(e.target.value)}
                />
                <CLabel htmlFor={`density-add`}>Kepadatan Penduduk</CLabel>
                <CInput
                  type="text"
                  id={`density-add`}
                  name="density"
                  defaultValue={densityAdd}
                  onChange={e => setDensityAdd(e.target.value)}
                />
                <CLabel htmlFor={`year-add`}>Tahun</CLabel>
                <CInput
                  type="text"
                  id={`year-add`}
                  name="year"
                  defaultValue={yearAdd}
                  onChange={e => setYearAdd(e.target.value)}
                />
                <CLabel htmlFor={`subdistrict-id-add`}>Kecamatan</CLabel>
                <CInput
                  type="text"
                  id={`subdistrict-id-add`}
                  name="subdistrict-id"
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
                        <CButton size="sm" color="info"
                          onClick={() => {
                            toggleEdit();
                            setIdEdit(item.id);
                            setNewCaseEdit(item.case);
                            setTargetCaseEdit(item.target_case);
                            setDeathRateEdit(item.death_rate);
                            setDensityEdit(item.density);
                            setHealthyHomeEdit(0);
                            setYearEdit(item.year);
                            setSubdistrictIdEdit(item.subdistrict_id)
                          }}
                        >
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
                              <CLabel htmlFor={`new-case` + item.id}>Kasus</CLabel>
                              <CInput
                                type="text"
                                id={`new-case` + item.id}
                                name="new-case"
                                defaultValue={newCaseEdit}
                                onChange={e => setNewCaseEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`target-case` + item.id}>Target Kasus</CLabel>
                              <CInput
                                type="text"
                                id={`target-case` + item.id}
                                name="target-case"
                                defaultValue={targetCaseEdit}
                                onChange={e => setTargetCaseEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`death-rate` + item.id}>Angka Kematian</CLabel>
                              <CInput
                                type="text"
                                id={`death-rate` + item.id}
                                name="death-rate"
                                defaultValue={deathRateEdit}
                                onChange={e => setDeathRateEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`density` + item.id}>Kepadatan Penduduk</CLabel>
                              <CInput
                                type="text"
                                id={`density` + item.id}
                                name="density"
                                defaultValue={densityEdit}
                                onChange={e => setDensityEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`year` + item.id}>Tahun</CLabel>
                              <CInput
                                type="text"
                                id={`year` + item.id}
                                name="year"
                                defaultValue={yearEdit}
                                onChange={e => setYearEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`subdistrict-id` + item.id}>Kecamatan</CLabel>
                              <CInput
                                type="text"
                                id={`subdistrict-id` + item.id}
                                name="subdistrict-id"
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
                            Apakah anda ingin menghapus data kecamatan <strong>{item.subdistrict.name}</strong> tahun <strong>{item.year}</strong>?
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="danger"
                              onClick={() => { deleteClusterAttribute(item.id) }}
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

export default TBIndex
