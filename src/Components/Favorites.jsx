import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  if (favorites.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>❤️ Favorites</h2>
        <p>No favorites yet — add recipes by clicking the heart icon.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>❤️ Favorites</h2>
      <div className="recipe-list">
        {favorites.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
