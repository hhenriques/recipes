import { useParams, Link } from "react-router-dom";
import recipes from "../data";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, localizeRecipe } = useLanguage();

  const raw = recipes.find((r) => r.id === id);

  if (!raw) {
    return (
      <div className="not-found">
        <h2>{t("recipeNotFound")}</h2>
        <Link to="/" className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          {t("backToRecipes")}
        </Link>
      </div>
    );
  }

  const recipe = localizeRecipe(raw);

  return (
    <div className="recipe-detail">
      <div className="detail-top-bar">
        <Link to="/" className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          {t("back")}
        </Link>
        <LanguageToggle />
      </div>

      <div className="detail-hero">
        <img src={recipe.image} alt={recipe.title} />
      </div>

      <div className="detail-content">
        <h1>{recipe.title}</h1>
        <p className="detail-desc">{recipe.description}</p>

        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">{t("prepLabel")}</span>
            <span className="meta-value">{recipe.prepTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">{t("cookLabel")}</span>
            <span className="meta-value">{recipe.cookTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">{t("servingsLabel")}</span>
            <span className="meta-value">{recipe.servings}</span>
          </div>
        </div>

        <div className="detail-tags">
          {recipe.tags.map((tag) => (
            <span key={tag} className="detail-tag">{tag}</span>
          ))}
        </div>

        <section className="detail-section">
          <h2>{t("ingredients")}</h2>
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
          <h2>{t("steps")}</h2>
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
