import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.css';

import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import RecipeList from "./Components/RecipeList";
import RecipeDetails from "./Components/RecipeDetails";
import Favorites from "./Components/Favorites";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          searchTerm
        )}`
      );
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("Search error:", err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomRecipe = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("Random error:", err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                  getRandomRecipe={getRandomRecipe}
                />
                {loading ? (
                  <div className="loader">Loading...</div>
                ) : (
                  <RecipeList recipes={recipes} />
                )}
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 20 }}>
                <h2>Page not found</h2>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
