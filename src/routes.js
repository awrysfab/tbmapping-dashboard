import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const DeathRate = React.lazy(() => import('./views/data-tuberkulosis/death-rate/Index'));
const Density = React.lazy(() => import('./views/data-tuberkulosis/density/Index'));
const TargetCase = React.lazy(() => import('./views/data-tuberkulosis/target-case/Index'));
const TotalCase = React.lazy(() => import('./views/data-tuberkulosis/total-case/Index'));
const Info = React.lazy(() => import('./views/info/info-tuberkulosis/Index'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/tuberkulosis', name: 'Data Tuberkulosis', component: TotalCase, exact: true },
  { path: '/tuberkulosis/jumlah-kasus', name: 'Jumlah Kasus', component: TotalCase },
  { path: '/tuberkulosis/kepadatan-penduduk', name: 'Kepadatan Penduduk', component: Density },
  { path: '/tuberkulosis/angka-target', name: 'Angka Target', component: TargetCase },
  { path: '/tuberkulosis/angka-kematian', name: 'Angka Kematian', component: DeathRate },
  { path: '/info', name: 'Info', component: Info, exact: true },
  { path: '/info/info-tuberkulosis', name: 'Info Tuberkulois', component: Info },
];

export default routes;
