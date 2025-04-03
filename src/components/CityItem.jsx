import styles from './CityItem.module.css'


function CityItem({city}) {
    const{cityName,emoji,date} = city;
    return (
       <li className={styles.cityItem}><span className={styles.emoji}>{

       }</span></li> 
    )
}

export default CityItem;
