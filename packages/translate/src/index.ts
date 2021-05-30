import fetch from "node-fetch";

type GoogleTranslation = {
  translatedText?: string;
  detectedSourceLanguage?: string;
};

type GoogleResponse = {
  data?: {
    translations?: GoogleTranslation[];
  };
};

export const translate = async (
  key: string,
  text: string,
  to?: string
): Promise<string> => {
  const baseUrl = "https://translation.googleapis.com/language/translate/v2";
  const language = to ?? "en";
  const query = encodeURIComponent(text);
  const params = `?key=${key}&format=text&target=${language}&q=${query}`;

  const response = await fetch(baseUrl + params);

  if (!response.ok) {
    return text;
  }

  const { data }: GoogleResponse = await response.json();
  if (!data || !data.translations || data.translations.length === 0) {
    return text;
  }

  return data.translations[0].translatedText ?? text;
};
