import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, saveProducts, setError } from '../../features/product/productSlice';
import { addItem } from '../../features/cart/cartSlice';
import './Main.css';
import { FaShoppingCart } from 'react-icons/fa';

function Main({ selectedBrand, selectedColor, sortBy }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.products);
  const { items } = useSelector((store) => store.cart);

  useEffect(() => {
    async function fetchProducts() {
      dispatch(setLoading(true));
      const brandFilter = selectedBrand ? `brand_name=${selectedBrand}` : "";
      const query = brandFilter ? `?${brandFilter}` : "";
      const api = `https://headphones-server.onrender.com/products${query}`;

      try {
        const response = await fetch(api);
        const products = await response.json();

        const filteredData = selectedColor
          ? products.filter(product => product.color_options.includes(selectedColor))
          : products;

        dispatch(saveProducts(filteredData));
        dispatch(setError(null)); 
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProducts();
  }, [selectedBrand, selectedColor, sortBy, dispatch]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((p1, p2) => {
      if (sortBy === "cheap") {
        return p1.price - p2.price;
      }
      if (sortBy === "expensive") {
        return p2.price - p1.price;
      }
      return 0;
    });
  }, [products, sortBy]);

  const handleAddToCart = (product) => {
    dispatch(addItem({ id: product.id, product }));
  };

  // Helper function to get the quantity of a specific item
  const getItemQuantity = (id) => {
    const item = items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <main className="main flex-1 h-screen overflow-y-auto bg-gray-800 text-white p-4">
      {loading ? <p className="text-center">Loading products...</p> : <h1 className="text-center text-3xl mb-2">GADGEDS</h1>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {sortedProducts.length === 0 && !loading && !error && (
        <p className="text-center text-gray-400">No products found</p>
      )}
      <ul className="products">
        {sortedProducts.map((p) => (
          <li className="products-card p-4 bg-gray-700 rounded-lg" key={p.id}>
            <img
              src={p.image_url}
              alt={p.name}
              className="h-72 w-full object-cover rounded-md" 
            />
            <h3 className="text-xl font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-400">{p.brand_name}</p>
            <p className="text-green-400">{p.price}$</p>
            <div className="flex space-x-2 mt-2">
              {p.color_options.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-full inline-block"
                  style={{ background: color }}
                ></span>
              ))}
            </div>
            <button 
              className="mt-2 bg-blue-500 text-white p-2 rounded flex gap-2 items-center relative"
              onClick={() => handleAddToCart(p)}
            >
              Add <FaShoppingCart className="text-white" size={18} />
              {getItemQuantity(p.id) > 0 && (
                <span className="absolute top-[-5px] right-[-10px] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemQuantity(p.id)}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
