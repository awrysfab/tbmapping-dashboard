import React, { useState } from 'react'
import axios from 'axios';
import { setToken } from '../../../utils/LocalStorage'
import { useFormInput } from 'src/utils/CustomHooks'
import { API_URL } from 'src/utils/ApiUrl';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = (props) => {
  const [ , setLoading] = useState(false);
  const [error, setError] = useState(null);

  const email = useFormInput('');
  const password = useFormInput('');

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post(`${API_URL}/admins/login`, { email: email.value, password: password.value })
      .then(response => {
        setLoading(false);
        setToken(response.data.token);
        props.history.push('/admin/dashboard');
        window.location.reload();
      }).catch(error => {
        setLoading(false);
        console.log(error);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" {...email} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="current-password" {...password} />
                  </CInputGroup>
                  <p className="text-danger">{error}</p>
                  <CRow>
                    <CCol xs="6">
                      <CButton color="primary" className="px-4" onClick={handleLogin}>Login</CButton>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CButton color="link" className="px-0">Forgot password?</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
