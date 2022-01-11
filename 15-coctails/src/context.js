import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('a');
    const [cocktails, setCocktails] = useState([]);

    const fetchDrinks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}${searchTerm}`);
            const {drinks} = await response.json();
            setCocktails(drinks);
            if(drinks) {
                const newCocktails = drinks.map((drink) => {
                    const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = drink;
                    return {
                        id: idDrink, 
                        name: strDrink,
                        image: strDrinkThumb,
                        info: strAlcoholic,
                        glass: strGlass
                    } 
                })
                // setCocktails(newCocktails)
                setLoading(false)
                return newCocktails
            } else {
                setCocktails([]);
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            console.log(error )
            setLoading(false)
        }
    }, [searchTerm]);

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        fetchDrinks().then(data => {
    if (isMounted) setCocktails(data);    // add conditional check
  })
  return () => { isMounted = false }
        
    },[searchTerm, fetchDrinks])

    
    return <AppContext.Provider value={{ 
        loading, 
        searchTerm, 
        cocktails, 
        setSearchTerm }}>
            {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}
