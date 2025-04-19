import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();

const Base_URL = "http://localhost:9000/";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loading":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/get":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/create":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity:action.payload , //This line of code is for show active city -
         //- whenever we fill the form and it hilight in green border
      };
    case "city/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},//This line of code is for deleting single active city -
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(`${Base_URL}cities`);
        const data = await res.json();
        dispatch({ type: "cities/loading", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity= useCallback( async function getCity(id) {
    if (Number(id) === currentCity.id) return; // when we select same city for two times
    //then it is not get through api and did not render it again
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${Base_URL}cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/get", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error getting cities...",
      });
    }
  },[currentCity.id])
  async function creatCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${Base_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/create", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating cities...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${Base_URL}cities/${id}`, {
        method: "DELETE",
      });

      // setCities(cities.filter((cities)=> cities.id !== id));
      dispatch({ type: "city/delete", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting cities...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        getCity,
        currentCity,
        creatCity,
        deleteCity,
        error
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
