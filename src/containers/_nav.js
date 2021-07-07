/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tuberkulosis',
    route: '/base',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Index',
        to: '/admin/tuberkulosis/index',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Jumlah Kasus',
        to: '/admin/tuberkulosis/jumlah-kasus',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Angka Target',
        to: '/admin/tuberkulosis/angka-target',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Kepadatan penduduk',
        to: '/admin/tuberkulosis/kepadatan-penduduk',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Angka Kematian',
        to: '/admin/tuberkulosis/angka-kematian',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Informasi',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Info Tuberkulosis',
        to: '/admin/info/info-tuberkulosis',
      },
    ],
  },
]

