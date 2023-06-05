import React from 'react'

const Dashboard = React.lazy(() => import('./components/admin/Dashboard/Main'))

// Base


const routes = [
    //  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
