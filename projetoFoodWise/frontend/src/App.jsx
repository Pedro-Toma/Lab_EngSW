import ManagerProfile from './pages/ManagerProfile.jsx'
import ManagementData from './pages/ManagementData.jsx'
import GeneralData from './pages/GeneralData.jsx'
import HomePage from './pages/HomePage.jsx'
import InfoOp from './pages/InfoOp.jsx'
import WasteMonitoring from './pages/WasteMonitoring.jsx'
import FinancialManagement from './pages/FinancialManagement.jsx'
import RestaurantProfile from './pages/RestaurantProfile.jsx'
import RestaurantMenu from './pages/RestaurantMenu.jsx'
import ReportPage from './pages/ReportPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {

  return (
    <main className="main-content">
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route element={<ProtectedRoute />}>
          <Route path='/ManagerProfile' element={<ManagerProfile />}/>
          <Route path='/ManagerProfile/:restaurant_id/GeneralData' element={<GeneralData />} />
          <Route path='/ManagerProfile/:restaurant_id/ManagementData' element={<ManagementData />} />
          <Route path='/ManagerProfile/:restaurant_id/ManagementData/OperationalInfo' element={<InfoOp />} />
          <Route path='/ManagerProfile/:restaurant_id/ManagementData/WasteMonitoring' element={<WasteMonitoring />} />
          <Route path='/ManagerProfile/:restaurant_id/ManagementData/FinancialManagement' element={<FinancialManagement />} />
          <Route path='/RestaurantProfile/:restaurant_id/ReportPage' element={<ReportPage />} />
        </Route>
        <Route path='/RestaurantProfile/:restaurant_id/Menu' element={<RestaurantMenu />} />
        <Route path='/RestaurantProfile/:restaurant_id' element={<RestaurantProfile />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
      </Routes>
    </main>
  )
}

export default App
