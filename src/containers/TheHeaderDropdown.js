import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { removeToken } from 'src/utils/LocalStorage'

const TheHeaderDropdown = (props) => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/avatar.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Akun</strong>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" /> 
          Profil
        </CDropdownItem> */}
        <CDropdownItem onClick={
          () => {
            props.history.push('/login');
            removeToken();
            window.location.reload();
          }
        }>
          <CIcon name="cil-x" className="mfe-2" /> 
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
