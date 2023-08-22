import { useState, useEffect } from "react";
import { URL_TEXT_VOICES } from "../constants/const";
import { SelectedLanguages } from "../types/types_App.d";

export default function useRequest(
  src: string,
  hl: SelectedLanguages,
  translate: string,
  inputID: string | undefined
) {
  const [text, getText] = useState<Blob | undefined>();
  const [isEnded, setISEnded] = useState<boolean>(true);

  useEffect(() => {
    if (!inputID || !hl.playTextUser) return;

    const textToPlay: string = inputID === "playTextUser" ? src : translate;
    const languageFlag: string =
      inputID === "playTextUser"
        ? hl!.playTextUser!.value
        : hl!.playTextTrad!.value;
    console.log("idioma actual", textToPlay);
    const url = `${URL_TEXT_VOICES}?key=${process.env.REACT_APP_VOICERS_API_KEY}`;
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
        console.log("call");
        // const audioUrl = URL.createObjectURL(blob); // Create a URL for the Blob
        // const audio = new Audio(audioUrl);
        getText(blob);
      })
      //   .then((audio) => {
      //     audio.addEventListener("canplaythrough", () => {
      //       if (audio.readyState > 2) getText(audio);
      //     });
      //     // audio.addEventListener("ended", () => {
      //     //   const f = audio.ended;
      //     //   setISEnded(f);
      //     // });
      //   })
      .catch((error) => console.log(error));
  }, [hl, src, translate, inputID]);

  return { text, isEnded };
}
