import React, { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const Base_URL = "http://localhost:9000/";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${Base_URL}cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert(`There was an ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${Base_URL}cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert(`There was an ${error}`);
    } finally {
      setIsLoading(false);
    }
  }
  async function creatCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${Base_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities([...cities,data])
      console.log(data);
    } catch (error) {
      alert(`There was an ${error}`);
    } finally {
      setIsLoading(false);
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
