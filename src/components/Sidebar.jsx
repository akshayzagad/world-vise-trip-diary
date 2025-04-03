import Logo from './Logo'
import styles from './Sidebar.module.css'
import AppNav from './AppNav.jsx'
import { Outlet } from 'react-router-dom'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <footer className={styles.footer}>
              <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldTour.inc.</p>  
            </footer>
        </div>
    )
}

export default Sidebar
