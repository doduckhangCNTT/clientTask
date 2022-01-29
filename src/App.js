import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Landing from './components/layout/Landing';
import NavbarMenu from './components/layout/NavbarMenu';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import Auth from './views/Auth';
import DashBoard from './views/DashBoard';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path='/abc' element={<Landing />} />
            <Route path='/login' element={<Auth authRoute='login' />} />
            <Route path='/register' element={<Auth authRoute='register' />} />
            {/* <Route path='/dashboard' element={<DashBoard />} /> */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute redirectTo='/login'>
                  <NavbarMenu />
                  <DashBoard />
                </ProtectedRoute>
              }
            />

            {/* <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<DashBoard />} />
          </Route> */}

            {/* <ProtectedRoute name='abc' /> */}
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
