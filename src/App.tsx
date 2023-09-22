import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'

import useAuth from 'reducers/hooks'

import publicRoutes from 'routes/public'
import privateRoutes from 'routes/private'

import * as Layout from 'layout'

import CheckRole from 'utils/CheckRole'

import Loader from 'components/Loader';

function App() {
  const {isLoggedIn, isFetched, token} = useAuth()

  if (!isFetched) {
    return <Loader/>
  }

  if (!isLoggedIn && !token) {
    return (
        <Routes>
          {publicRoutes.map(({path, Page}) => (
            <Route path={path} element={<Page/>} key={path}/>
          ))}

          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
    )
  }

  return (
    <>
      <div className='dashboard'>
        <div style={{inlineSize: '18%'}}>
          <Layout.Menu/>
        </div>

        <div style={{inlineSize: '82%', marginBlockStart: '80px'}}>
          <Layout.Navbar/>

          <Routes>
            {privateRoutes.map(({path, accessRoles, Page}) => (
              <Route
                path={path}
                element={<CheckRole accessRoles={accessRoles} Page={<Page/>}/>}
                key={path}
              />
            ))}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
