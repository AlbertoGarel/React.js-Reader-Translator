import { useEffect, useState } from "react";
import { LANGUGES_VALUES } from "../constants/const";

export default function usePredeterminatelanguge() {
  const [languagePred, setlanguagePred] = useState<
    { value: string; textLang: string } | undefined
  >();
  useEffect(() => {
    const language = navigator.language;
    const defaultLanguagesUser = LANGUGES_VALUES.filter((i) =>
      i.value.includes(language)
    )[0];
    setlanguagePred(defaultLanguagesUser);
  }, []);

  return { languagePred };
}
