import { useEffect, useState } from "react";

export default function useTranslation(texToTranslate: string) {
  const [textTranslate, setTextTranslate] = useState<string | undefined>();

  useEffect(() => {
    setTextTranslate(texToTranslate);
  }, [texToTranslate]);

  return { textTranslate };
}
