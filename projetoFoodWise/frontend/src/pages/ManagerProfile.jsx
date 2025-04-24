import Header from '../components/Header.jsx'
import Frame from '../components/Frame.jsx'
import {Link} from 'react-router-dom'

function ManagerProfile(){
    return <>
        <Header />
        <Frame />
        <Link to="/HomePage" className="home-page-btn">Página Inicial</Link>
    </>
}

export default ManagerProfile