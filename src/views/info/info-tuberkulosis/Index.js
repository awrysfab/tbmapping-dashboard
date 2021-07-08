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
  CFormGroup,
  CTextarea,
  CLabel,
  CInput
} from '@coreui/react';

const TBInfo = () => {
  const [tbInfos, settbInfos] = useState([]);
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
  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => { setEditModal(!editModal); }

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => { setDeleteModal(!deleteModal); }

  useEffect(() => {
    fetchTbInfos();
  }, []);

  async function fetchTbInfos() {
    const result = await axios.get(`${API_URL}/tb-infos`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    settbInfos(result.data.data);
  }

  async function deleteTbInfos(id) {
    const result = await axios.delete(`${API_URL}/tb-infos/${id}`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    window.location.reload();
  }

  const fields = [
    { key: 'title', _style: { width: '10%' } },
    { key: 'description' },
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
          Info Tuberkulosis
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={tbInfos}
            fields={fields}
            itemsPerPageSelect
            itemsPerPage={10}
            tableFilter
            hover
            sorter
            pagination
            scopedSlots={{
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
                          {item.title}
                        </h4>
                        <CButton size="sm" color="info"
                          onClick={() => { toggleEdit() }}>
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
                          <CModalHeader closeButton>Edit Data</CModalHeader>
                          <CModalBody>
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">Title</CLabel>
                                <CInput
                                  type="text"
                                  id="nf-title"
                                  name="nf-title"
                                  placeholder={item.title}
                                />
                              </CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="nf-description">Description</CLabel>
                                <CTextarea
                                  id="nf-description"
                                  name="nf-description"
                                  rows="9"
                                  placeholder={item.description}
                                />
                              </CFormGroup>
                            </CForm>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="info">Edit</CButton>
                            <CButton
                              color="secondary"
                              onClick={toggleEdit}
                            >Cancel</CButton>
                          </CModalFooter>
                        </CModal>

                        <CModal
                          show={deleteModal}
                          onClose={toggleDelete}
                        >
                          <CModalHeader closeButton>Hapus Data</CModalHeader>
                          <CModalBody>
                            Apakah anda ingin menghapus <strong>{item.title}</strong>?
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="danger"
                              onClick={() => { deleteTbInfos(item.id) }}
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

export default TBInfo
