import { useState, useEffect } from "react";
import { URL_TEXT_VOICES } from "../constants/const";
import { SelectedLanguages } from "../types/types_App.d";

export default function useRequest(
  src: string,
  hl: SelectedLanguages,
  translate: string | undefined,
  inputID: string | undefined
) {
  const [text, getText] = useState<Blob | undefined>();
  const [isEnded, setISEnded] = useState<boolean>(true);
  const [errorLanguage, setErrorLanguage] = useState<boolean>(false);

  useEffect(() => {
    if (!translate || !inputID || !hl.playTextUser) return;

    const textToPlay: string = inputID === "playTextUser" ? src : translate;
    const languageFlag: string =
      inputID === "playTextUser"
        ? hl!.playTextUser!.value
        : hl!.playTextTrad!.value;

    const url: string = `${URL_TEXT_VOICES}?key=${process.env.REACT_APP_VOICERS_API_KEY}`;
    const options = {
      method: "POST",
      headers: {},
      body: new URLSearchParams({
        src: textToPlay,
        hl: languageFlag,
        r: "0",
        c: "mp3",
        f: "16khz_16bit_stereo",
      }),
    };
    setISEnded(false);

    fetch(url, options)
      .then((response) => response.blob()) // Get the response as a Blob
      .then((blob) => {
        if (blob.type === "text/plain") {
          setErrorLanguage(true);
          setTimeout(() => setErrorLanguage(false), 4000);
        } else {
          getText(blob);
        }
      })
      .catch((error) => {
        if (process.env.REACT_APP_NODE_ENV) console.log(error);
      });
  }, [hl, src, translate, inputID]);

  return { text, isEnded, errorLanguage };
}
