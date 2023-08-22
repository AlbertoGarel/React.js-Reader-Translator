import { useEffect, useState } from "react";
import { LANGUGES_VALUES } from "../constants/const";

export default function usePredeterminatelanguge() {
  const [languagePred, setlanguagePred] = useState<{value: string, textLang: string} | undefined>();
  useEffect(() => {
    const language = navigator.language;
    const defaultLanguagesUser = LANGUGES_VALUES.filter((i) =>
      i.value.includes(language)
    )[0];
    setlanguagePred(defaultLanguagesUser);
    // if (language === "en") {
    //   window.location.href = "/en"; // Redirect to English version
    // } else if (language === "es") {
    //   window.location.href = "/es"; // Redirect to Spanish version
    // } else if (language === "de") {
    //   window.location.href = "/de"; // Redirect to German version
    // }
  }, []);

  return {languagePred};
}
