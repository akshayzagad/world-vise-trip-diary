import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner/>;


  // Ensure cities is an array before mapping
  if (!Array.isArray(cities) || cities.length === 0) {
    return (<Message message={"Add your first city by clicking city on a map"}/>);
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id}/>
      ))}
    </ul>
  );
}

export default CityList;
