import { useEffect, useState } from "react";
import { SelectedLanguages } from "../types/types_App.d";

export default function useTranslation(
  texToTranslate: string,
  codeCountry: SelectedLanguages
) {
  const [textTranslate, setTextTranslate] = useState<string | undefined>();

  useEffect(() => {
    // Reset value of textarea value when text to translate is ''.
    if (texToTranslate.length < 1) setTextTranslate("");
    // return if text of translate is undefined.
    if (!texToTranslate) return;

    const encoded: string = encodeURI(texToTranslate);
    const codeplayTextUser:
      | string
      | undefined = codeCountry.playTextUser?.value
      .split("-")[0]
      .toLocaleUpperCase();
    const codeplayTextTrad:
      | string
      | undefined = codeCountry.playTextTrad?.value
      .split("-")[0]
      .toLocaleUpperCase();
    const encodedCodeTranslation: string = `${codeplayTextUser}|${codeplayTextTrad}`;

    // return if encodedCodeTranslation is undefined and code of language is the same for Translate.
    if (encodedCodeTranslation.includes('undefined') || codeplayTextTrad === codeplayTextUser) return;

    let url: string = `https://api.mymemory.translated.net/get?key=${process.env.REACT_APP_MYMEMORY_TRANSLATION}&q=${encoded}&langpair=${encodedCodeTranslation}`;
    let options: {} = {};
    
    fetch(url, options)
      .then((tojson) => tojson.json())
      .then((response) => {
        if (texToTranslate.length > 1)
          setTextTranslate(response.responseData.translatedText);
      })
      .catch((error) => {
        if (process.env.REACT_APP_NODE_ENV) console.log(error);
      });
  }, [texToTranslate, codeCountry]);

  return { textTranslate };
}
