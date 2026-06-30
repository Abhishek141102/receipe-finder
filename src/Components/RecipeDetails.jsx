import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMeal(res.data.meals ? res.data.meals[0] : null);
      } catch (err) {
        console.error(err);
        setMeal(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!meal) return <div style={{ padding: 20 }}><h2>Recipe not found</h2></div>;

  // Build ingredients list (TheMealDB stores them as strIngredient1..20)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${measure ? measure : ""} ${ing}`.trim());
    }
  }

  return (
    <div className="details">
      <button className="btn back" onClick={() => navigate(-1)}>← Back</button>
      <div className="details-grid">
        <div>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="details-img" />
        </div>
        <div>
          <h2>{meal.strMeal}</h2>
          <p className="muted">{meal.strArea} • {meal.strCategory}</p>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
          </ul>
          <h3>Instructions</h3>
          <p className="instructions">{meal.strInstructions}</p>

          {meal.strYoutube && (
            <>
              <h3>Video</h3>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                Watch on YouTube
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
