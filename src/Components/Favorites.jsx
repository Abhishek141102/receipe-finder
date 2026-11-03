import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const syncFavorites = () => {
      try {
        setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
      } catch {
        setFavorites([]);
      }
    };

    syncFavorites();
    window.addEventListener("favoritesUpdated", syncFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", syncFavorites);
    };
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="favorites favorites-empty">
        <h2 className="favorites-title">❤️ Favorites</h2>
        <p className="favorites-message">No favorites yet — add recipes by clicking the heart icon.</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2 className="favorites-title">❤️ Favorites</h2>
      <div className="recipe-list">
        {favorites.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
