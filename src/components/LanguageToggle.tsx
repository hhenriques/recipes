import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="lang-toggle" role="radiogroup" aria-label="Language">
      <button
        className={`lang-btn ${locale === "en" ? "active" : ""}`}
        onClick={() => setLocale("en")}
        aria-checked={locale === "en"}
        role="radio"
      >
        EN
      </button>
      <button
        className={`lang-btn ${locale === "pt" ? "active" : ""}`}
        onClick={() => setLocale("pt")}
        aria-checked={locale === "pt"}
        role="radio"
      >
        PT
      </button>
    </div>
  );
}
