import React, { useEffect } from 'react';
import { store } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

import { setLoading as setLoadingBrands, saveBrands, setError as setErrorBrands } from '../../features/product/brandSlice';
import { setLoading as setLoadingColors, saveColors, setError as setErrorColors } from '../../features/product/colorSlice';
import "./Aside.css";

function Aside({ selectedBrand, setSelectedBrand, selectedColor, setSelectedColor }) {
   
  const { colors , brands } = useSelector((store) => store);
  const { loading: colorsLoading,
          error: colorsError, 
          colors: colorsList, 
  } = colors;
  const { loading: brandsLoading,
          error: brandsError, 
          brands: brandsList, 
  } = brands;

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchColors() {
      dispatch(setLoadingColors(true))
      try {
        const response = await fetch("https://headphones-server.onrender.com/colors");
        if (!response.ok) {
          throw new Error("Error fetching colors");
        }
        const colors = await response.json();
        dispatch(saveColors(colors));
      } catch (error) {
        dispatch(setErrorColors(error.message));
      } finally {
        dispatch(setLoadingColors(false))
      }
    }

    async function fetchBrands() {
      dispatch(setLoadingBrands(true))
      try {
        const response = await fetch("https://headphones-server.onrender.com/brands");
        if (!response.ok) {
          throw new Error("Error fetching brands");
        }
        const brands = await response.json();
        dispatch(saveBrands(brands));
      } catch (error) {
        dispatch(setErrorBrands(error.message))
      } finally {
        dispatch(setLoadingBrands(false))
        
      }
    }

    fetchColors();
    fetchBrands();
  }, [dispatch]);

  return (
    <aside>
      <h2>Brands</h2>
      {brandsLoading && <p className="text-center">Loading Brands...</p>}
      {brandsError && <p className="text-center text-red-500">Error: {brandsError}</p>}
      <ul className='brands-wrapper'>
        {brandsList.map((brand, index) => (
          <li key={index}>
            <input
              type="radio"
              id={brand}
              name="brands"
              onChange={() => setSelectedBrand(brand)}
              checked={selectedBrand === brand}
            />
            <label htmlFor={brand}>{brand}</label>
          </li>
        ))}
      </ul>
      <div className="reset-buttons">
        <button onClick={() => setSelectedBrand("")} className="reset-btn">Reset Brand</button>
        <button onClick={() => setSelectedColor("")} className="reset-btn">Reset Color</button>
      </div>
      <h2>Colors</h2>
      {colorsLoading && <p className="text-center">Loading Colors...</p>}
      {colorsError && <p className="text-center text-red-500">Error: {colorsError}</p>}
      <ul className='colors-wrapper'>
        {colorsList.map((color, index) => (
          <li key={index}>
            <button
              onClick={() => setSelectedColor(color)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: color,
                cursor: 'pointer',
                outlineOffset: "3px",
                outline: selectedColor === color ? "2px solid white" : "",
              }}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;