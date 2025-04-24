import ManagerProfile from './pages/ManagerProfile.jsx'
import ManagementData from './pages/ManagementData.jsx'
import GeneralData from './pages/GeneralData.jsx'
import HomePage from './pages/HomePage.jsx'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <main className="main-content">
      <Routes>
        <Route path='/' element={<ManagerProfile />}/>
        <Route path='/ManagementData' element={<ManagementData />}/>
        <Route path='/GeneralData' element={<GeneralData />}/>
        <Route path='/HomePage' element={<HomePage />}/>
      </Routes>
    </main>
  )
}

export default App
