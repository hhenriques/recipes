export type Locale = "en" | "pt";

type TranslationStrings = {
  siteTitle: string;
  subtitle: string;
  searchPlaceholder: string;
  clearSearch: string;
  tagAll: string;
  noResults: string;
  prep: string;
  cook: string;
  servings: string;
  prepLabel: string;
  cookLabel: string;
  servingsLabel: string;
  ingredients: string;
  steps: string;
  back: string;
  backToRecipes: string;
  recipeNotFound: string;
};

const translations: Record<Locale, TranslationStrings> = {
  en: {
    siteTitle: "Dias Henriques Recipes",
    subtitle: "Tap a recipe to see the full details",
    searchPlaceholder: "Search recipes...",
    clearSearch: "Clear search",
    tagAll: "All",
    noResults: "No recipes found. Try a different search.",
    prep: "prep",
    cook: "cook",
    servings: "servings",
    prepLabel: "Prep",
    cookLabel: "Cook",
    servingsLabel: "Servings",
    ingredients: "Ingredients",
    steps: "Steps",
    back: "Back",
    backToRecipes: "Back to recipes",
    recipeNotFound: "Recipe not found",
  },
  pt: {
    siteTitle: "Receitas Dias Henriques",
    subtitle: "Toque numa receita para ver todos os detalhes",
    searchPlaceholder: "Pesquisar receitas...",
    clearSearch: "Limpar pesquisa",
    tagAll: "Todas",
    noResults: "Nenhuma receita encontrada. Tente uma pesquisa diferente.",
    prep: "prep.",
    cook: "coz.",
    servings: "porções",
    prepLabel: "Preparação",
    cookLabel: "Cozedura",
    servingsLabel: "Porções",
    ingredients: "Ingredientes",
    steps: "Passos",
    back: "Voltar",
    backToRecipes: "Voltar às receitas",
    recipeNotFound: "Receita não encontrada",
  },
};

export const tagTranslations: Record<Locale, Record<string, string>> = {
  en: {},
  pt: {
    beef: "vaca",
    pasta: "massa",
    oven: "forno",
    chicken: "frango",
    stovetop: "fogão",
    quick: "rápida",
  },
};

export default translations;
