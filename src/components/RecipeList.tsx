import { useState, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import recipes from "../data";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function RecipeList() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { t, translateTag, localizeRecipe } = useLanguage();

  const localizedRecipes = useMemo(
    () => recipes.map(localizeRecipe),
    [localizeRecipe]
  );

  const allTags = useMemo(
    () => [...new Set(recipes.flatMap((r) => r.tags))].sort(),
    []
  );

  const tagsRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragState.current = { isDown: true, startX: e.clientX, scrollLeft: tagsRef.current!.scrollLeft, moved: false };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.isDown) return;
    const dx = e.clientX - ds.startX;
    if (!ds.moved && Math.abs(dx) > 3) {
      ds.moved = true;
      tagsRef.current!.setPointerCapture(e.pointerId);
      tagsRef.current!.style.cursor = "grabbing";
    }
    if (ds.moved) {
      tagsRef.current!.scrollLeft = ds.scrollLeft - dx;
    }
  }, []);

  const onPointerUp = useCallback(() => {
    dragState.current.isDown = false;
    tagsRef.current!.style.cursor = "grab";
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return localizedRecipes.filter((r) => {
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((tag) => tag.includes(q) || translateTag(tag).toLowerCase().includes(q));
      const matchesTag = !activeTag || r.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag, localizedRecipes, translateTag]);

  return (
    <div className="recipe-list-page">
      <header className="header">
        <div className="header-row">
          <h1>{t("siteTitle")}</h1>
          <LanguageToggle />
        </div>
        <p className="subtitle">{t("subtitle")}</p>
      </header>

      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-btn" onClick={() => setSearch("")} aria-label={t("clearSearch")}>
            &times;
          </button>
        )}
      </div>

      <div
        className="tags"
        ref={tagsRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button
          className={`tag ${activeTag === null ? "active" : ""}`}
          onClick={() => { if (!dragState.current.moved) setActiveTag(null); }}
        >
          {t("tagAll")}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag ${activeTag === tag ? "active" : ""}`}
            onClick={() => { if (!dragState.current.moved) setActiveTag(activeTag === tag ? null : tag); }}
          >
            {translateTag(tag)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">{t("noResults")}</p>
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
                  <span>{recipe.prepTime} {t("prep")}</span>
                  <span className="dot">&middot;</span>
                  <span>{recipe.cookTime} {t("cook")}</span>
                  <span className="dot">&middot;</span>
                  <span>{recipe.servings} {t("servings")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
