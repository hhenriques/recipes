import { useParams, Link } from "react-router-dom";
import recipes from "../data";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="not-found">
        <h2>Recipe not found</h2>
        <Link to="/" className="back-link">&larr; Back to recipes</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-link">&larr; Back</Link>

      <div className="detail-hero">
        <img src={recipe.image} alt={recipe.title} />
      </div>

      <div className="detail-content">
        <h1>{recipe.title}</h1>
        <p className="detail-desc">{recipe.description}</p>

        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">Prep</span>
            <span className="meta-value">{recipe.prepTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Cook</span>
            <span className="meta-value">{recipe.cookTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Servings</span>
            <span className="meta-value">{recipe.servings}</span>
          </div>
        </div>

        <div className="detail-tags">
          {recipe.tags.map((tag) => (
            <span key={tag} className="detail-tag">{tag}</span>
          ))}
        </div>

        <section className="detail-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                <span className="ing-amount">
                  {ing.amount}{ing.unit ? ` ${ing.unit}` : ""}
                </span>
                <span className="ing-item">{ing.item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h2>Steps</h2>
          <ol className="steps-list">
            {recipe.steps.map((step, i) => (
              <li key={i}>
                <div className="step-number">{i + 1}</div>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
