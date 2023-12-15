// CustomContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CustomContext = createContext();

export const useCustomContext = () => {
  return useContext(CustomContext);
};

export const CustomContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        
        setCategories(response.data.products);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CustomContext.Provider value={{ categories }}>
      {children}
    </CustomContext.Provider>
  );
};

export default CustomContext;
