import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css'

function Map() {
    const[searchParam,setSearchPara]=useSearchParams();
    const navigte = useNavigate();
    const lat = searchParam.get("lat");
    const lng = searchParam.get("lng");
    return (
        <div className={styles.mapContainer} onClick={()=>navigte("form")}>
         <h1>Map</h1>
         <h1>{lat},{lng}</h1>
         <button onClick={()=>setSearchPara({lat:23,lng:25})}>Change Position</button>
        </div>
    )
}

export default Map
