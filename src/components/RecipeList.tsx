import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import recipes from "../data";

export default function RecipeList() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => [...new Set(recipes.flatMap((r) => r.tags))].sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return recipes.filter((r) => {
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q));
      const matchesTag = !activeTag || r.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  return (
    <div className="recipe-list-page">
      <header className="header">
        <h1>Henry's Recipes</h1>
        <p className="subtitle">Tap a recipe to see the full details</p>
      </header>

      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-btn" onClick={() => setSearch("")} aria-label="Clear search">
            &times;
          </button>
        )}
      </div>

      <div className="tags">
        <button
          className={`tag ${activeTag === null ? "active" : ""}`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No recipes found. Try a different search.</p>
      ) : (
        <div className="recipe-grid">
          {filtered.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="recipe-card"
            >
              <div className="card-image">
                <img src={recipe.image} alt={recipe.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h2>{recipe.title}</h2>
                <p className="card-desc">{recipe.description}</p>
                <div className="card-meta">
                  <span>{recipe.prepTime} prep</span>
                  <span className="dot">&middot;</span>
                  <span>{recipe.cookTime} cook</span>
                  <span className="dot">&middot;</span>
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
