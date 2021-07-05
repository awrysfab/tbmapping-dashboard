import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const DeathRate = React.lazy(() => import('./views/data-tuberkulosis/death-rate/Index'));
const Density = React.lazy(() => import('./views/data-tuberkulosis/density/Index'));
const TargetCase = React.lazy(() => import('./views/data-tuberkulosis/target-case/Index'));
const TotalCase = React.lazy(() => import('./views/data-tuberkulosis/total-case/Index'));
const Info = React.lazy(() => import('./views/info/info-tuberkulosis/Index'));

const routes = [
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/tuberkulosis', name: 'Data Tuberkulosis', component: TotalCase, exact: true },
  { path: '/admin/tuberkulosis/jumlah-kasus', name: 'Jumlah Kasus', component: TotalCase },
  { path: '/admin/tuberkulosis/kepadatan-penduduk', name: 'Kepadatan Penduduk', component: Density },
  { path: '/admin/tuberkulosis/angka-target', name: 'Angka Target', component: TargetCase },
  { path: '/admin/tuberkulosis/angka-kematian', name: 'Angka Kematian', component: DeathRate },
  { path: '/admin/info', name: 'Info', component: Info, exact: true },
  { path: '/admin/info/info-tuberkulosis', name: 'Info Tuberkulois', component: Info },
];

export default routes;
