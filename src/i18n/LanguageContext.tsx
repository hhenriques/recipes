import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import translations, { tagTranslations, type Locale } from "./translations";
import type { Recipe } from "../types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations.en) => string;
  translateTag: (tag: string) => string;
  localizeRecipe: (recipe: Recipe) => Recipe;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem("locale");
    if (stored === "en" || stored === "pt") return stored;
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("locale", l);
    } catch {}
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: keyof typeof translations.en) => translations[locale][key],
    [locale]
  );

  const translateTag = useCallback(
    (tag: string) => tagTranslations[locale][tag] ?? tag,
    [locale]
  );

  const localizeRecipe = useCallback(
    (recipe: Recipe): Recipe => {
      if (locale === "en" || !recipe.translations?.[locale]) return recipe;
      const tr = recipe.translations[locale];
      return {
        ...recipe,
        title: tr.title ?? recipe.title,
        description: tr.description ?? recipe.description,
        ingredients: tr.ingredients ?? recipe.ingredients,
        steps: tr.steps ?? recipe.steps,
      };
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, translateTag, localizeRecipe }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
