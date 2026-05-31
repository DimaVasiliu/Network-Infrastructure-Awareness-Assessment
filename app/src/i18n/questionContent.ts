import { explanationsRo } from '../data/explanations.ro';
import { explanationsRu } from '../data/explanations.ru';
import type { Question, QuestionTranslation } from '../types/question';
import type { Language } from './translations';

// Per-language explanation overlays. English has none (the source text is used).
const explanationOverlays: Record<Language, Record<string, QuestionTranslation>> = {
  en: {},
  ro: explanationsRo,
  ru: explanationsRu,
};

/**
 * Returns the explanation for a question in the given language, falling back
 * to the English source when no translation exists yet.
 */
export function localizeExplanation(question: Question, language: Language): string {
  if (language === 'en') return question.explanation;
  return explanationOverlays[language]?.[question.id]?.explanation ?? question.explanation;
}
