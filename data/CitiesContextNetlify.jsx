// For Netlify Functions:
// copy this file to "src/contexts" and rename to "CitiesContext.jsx" (replace any existing files)

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const BASE_URL = "/.netlify/functions/getData";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) === currentCity.id) return;

            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/?id=${id}`);
                const data = await res.json();
                setCurrentCity(data.city);
            } catch {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        },
        [currentCity.id]
    );

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setCities((cities) => [...cities, data.newCity]);
            setCurrentCity(data.newCity);
        } catch {
            alert("There was an error creating city...");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch {
            alert("There was an error deleting city...");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

export { CitiesProvider, useCities };
