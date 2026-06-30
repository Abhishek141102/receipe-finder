import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-results">
        <p>No recipes yet — try searching for "chicken" or click Surprise me!</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((r) => (
        <RecipeCard key={r.idMeal} recipe={r} />
      ))}
    </div>
  );
}

export default RecipeList;
