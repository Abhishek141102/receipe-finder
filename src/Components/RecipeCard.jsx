import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function RecipeCard({ recipe }) {
  const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
  const isFav = saved.some((f) => f.idMeal === recipe.idMeal);

  const toggleFavorite = () => {
    const current = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isAlreadyFavorite = current.some((f) => f.idMeal === recipe.idMeal);

    const next = isAlreadyFavorite
      ? current.filter((f) => f.idMeal !== recipe.idMeal)
      : [...current, recipe];

    localStorage.setItem("favorites", JSON.stringify(next));
    window.dispatchEvent(new Event("favoritesUpdated"));
    alert(isAlreadyFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="card">
      <img className="card-img" src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="card-body">
        <h3 className="card-title">{recipe.strMeal}</h3>
        <p className="card-sub">{recipe.strArea} • {recipe.strCategory}</p>
        <div className="card-actions">
          <Link to={`/recipe/${recipe.idMeal}`} className="btn-link">View</Link>
          <button className="fav-btn" onClick={toggleFavorite} aria-label="favorite">
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
