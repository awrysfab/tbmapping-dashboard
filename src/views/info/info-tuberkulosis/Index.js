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

const TBInfo = () => {
  const [idEdit, setIdEdit] = useState(0);
  const [titleEdit, setTitleEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");

  const [titleAdd, setTitleAdd] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");

  const [tbInfos, settbInfos] = useState([]);

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
    fetchTbInfos();
  }, []);

  const handleAddSubmit = (event) => {
    addTbInfos({ title: titleAdd, description: descriptionAdd })
  }

  const handleEditSubmit = (event) => {
    updateTbInfos({ id: idEdit, title: titleEdit, description: descriptionEdit })
  }

  async function fetchTbInfos() {
    const result = await axios.get(`${API_URL}/tb-infos`, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    settbInfos(result.data.data);
  }

  async function addTbInfos({ title, description }) {
    const result = await axios.post(`${API_URL}/tb-infos`, {
      title,
      description,
    }, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    if(result.status === 200){
      toggleAdd()
      window.location.reload()
    }
  }

  async function updateTbInfos({ id, title, description }) {
    const result = await axios.put(`${API_URL}/tb-infos/${id}`, {
      title,
      description,
    }, {
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    if(result.status === 200){
      toggleEdit()
      window.location.reload()
    }
  }

  async function deleteTbInfos(id) {
    await axios.delete(`${API_URL}/tb-infos/${id}`, {
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
                <CLabel htmlFor={`title-add`}>Title</CLabel>
                <CInput
                  type="text"
                  id={`title-add`}
                  name="title"
                  defaultValue={titleEdit}
                  onChange={e => setTitleAdd(e.target.value)}
                />
                <CLabel htmlFor={`description-add`}>Description</CLabel>
                <CTextarea
                  id={`description-add`}
                  name="description"
                  rows="9"
                  defaultValue={descriptionEdit}
                  onChange={e => setDescriptionAdd(e.target.value)}
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
                          onClick={() => {
                            toggleEdit();
                            setIdEdit(item.id);
                            setTitleEdit(item.title);
                            setDescriptionEdit(item.description);
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
                              <CLabel htmlFor={`title` + item.id}>Title</CLabel>
                              <CInput
                                type="text"
                                id={`title` + item.id}
                                name="title"
                                defaultValue={titleEdit}
                                onChange={e => setTitleEdit(e.target.value)}
                              />
                              <CLabel htmlFor={`description` + item.id}>Description</CLabel>
                              <CTextarea
                                id={`description` + item.id}
                                name="description"
                                rows="9"
                                defaultValue={descriptionEdit}
                                onChange={e => setDescriptionEdit(e.target.value)}
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
