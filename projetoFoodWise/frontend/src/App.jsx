import ManagerProfile from './pages/ManagerProfile.jsx'
import ManagementData from './pages/ManagementData.jsx'
import GeneralData from './pages/GeneralData.jsx'
import HomePage from './pages/HomePage.jsx'
import InfoOp from './pages/InfoOp.jsx'
import WasteMonitoring from './pages/WasteMonitoring.jsx'
import FinancialManagement from './pages/FinancialManagement.jsx'
import RestaurantProfile from './pages/RestaurantProfile.jsx'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <main className="main-content">
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/ManagerProfile' element={<ManagerProfile />}/>
        <Route path='/ManagerProfile/GeneralData' element={<GeneralData />}/>
        <Route path='/ManagerProfile/ManagementData' element={<ManagementData />}/>
        <Route path='/ManagerProfile/ManagementData/OperationalInfo' element={<InfoOp />}/>
        <Route path='/ManagerProfile/ManagementData/WasteMonitoring' element={<WasteMonitoring />}/>
        <Route path='/ManagerProfile/ManagementData/FinancialManagement' element={<FinancialManagement />}/>
        <Route path='/RestaurantProfile/:id' element={<RestaurantProfile />}/>
      </Routes>
    </main>
  )
}

export default App
