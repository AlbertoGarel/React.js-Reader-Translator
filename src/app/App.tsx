import { useState, Fragment, useEffect } from "react";
import Header from "../components/header";
import useClientMeasures from "../hooks/useClientMEasures";
import "./App.scss";
import CustomTextArea from "../components/customTextarea/CustomTextArea";
import IconButton from "../microcomponents/iconButton/IconButton";
// ICONS
import {
  faTrash,
  faVolumeHigh,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { LANGUGES_VALUES } from "../constants/const";
import useRequest from "../hooks/useRequest";
import usePredeterminatelanguge from "../hooks/usePredeterminateLanguage";
import { SelectedLanguages } from "../types/types_App.d";
import BrandComponent from "../components/brandComponent/BrandComponent";
import ErrorComponent from "../components/errorComponent/ErrorComponent";
import useTranslation from "../hooks/useTranslation";
import NotificationPill from "../components/notificationPill";

const pillText: string = "Copiado";
const errorTextTranslate: string =
  "El texto no se puede reproducir en el idioma seleccionado.";
function App() {
  const [messageCopy, setMessageCopy] = useState<boolean>(false);
  const [buttonIDText, getButtonIdText] = useState<string | undefined>(
    undefined
  );
  const [valueTextInput, getValueTextInput] = useState<string>("");
  const { languagePred } = usePredeterminatelanguge();
  const [selectedLanguage, getSelectedLanguage] = useState<SelectedLanguages>({
    playTextUser: languagePred,
    playTextTrad: LANGUGES_VALUES[14],
  });
  const { textTranslate } = useTranslation(valueTextInput, selectedLanguage);
  //translate text for button
  const { textTranslate: translateButonText } = useTranslation(pillText, {
    playTextUser: LANGUGES_VALUES[41],
    playTextTrad: languagePred,
  });
  //translate for errorMessage
  const { textTranslate: translateErrorText } = useTranslation(
    errorTextTranslate,
    {
      playTextUser: LANGUGES_VALUES[41],
      playTextTrad: languagePred,
    }
  );
  const { text, errorLanguage } = useRequest(
    valueTextInput,
    selectedLanguage,
    textTranslate,
    buttonIDText
  );

  const { deviceType } = useClientMeasures();
  const [isEnded, setISEnded] = useState<boolean>(true);

  useEffect(() => {
    getSelectedLanguage((prevState) => {
      return {
        ...prevState,
        playTextUser: languagePred,
      };
    });
  }, [languagePred]);

  useEffect(() => {
    if (!text) return;

    const audioUrl: string = URL.createObjectURL(text!); 
    const audio = new Audio(audioUrl);

    const playSound: () => void = () => {
      audio
        .play()
        .then(() => {
          setISEnded(false);
        })
        .catch((error) => {
          if (process.env.REACT_APP_NODE_ENV)
            console.log("error de reproduccion", error);
        });
    };

    const updateStateEnded: () => void = () => {
      const endedAudio = audio.ended;
      setISEnded(endedAudio);
      getButtonIdText(undefined);
    };

    audio.addEventListener("canplaythrough", playSound);
    audio.addEventListener("ended", updateStateEnded);

    return () => {
      audio.removeEventListener("canplaythrough", playSound);
      audio.removeEventListener("ended", updateStateEnded);
    };
  }, [text]);

  const deleteText: () => void = () => {
    getValueTextInput("");
  };

  const clipText: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    e.preventDefault();
    const idButton = e.currentTarget.dataset.id;
    const element: HTMLElement | null = document.getElementById(idButton!);

    if (idButton === "playTextUser") {
      navigator.clipboard.writeText(valueTextInput ? valueTextInput : "");
      let elemen = document.createElement("p");
      element?.appendChild(elemen).setAttribute("id", "estoesnuevo");
    } else {
      navigator.clipboard.writeText(textTranslate ? textTranslate : "");
    }
    setMessageCopy(true);
    setTimeout(() => setMessageCopy(false), 1000);
  };

  const handlerValueInput: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (e) => {
    // Update state of user input.
    const textValue = e.currentTarget.value;
    getValueTextInput(textValue);
  };

  const handlerSelectedLanguage: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void = (e) => {
    e.preventDefault();
    // update state of select language of two inputs.
    const { name, value, text } = e.currentTarget.dataset;
    getSelectedLanguage((prevState) => {
      return {
        ...prevState,
        [name as string]: { textLang: text, value: value },
      };
    });
  };

  const handlerButtonPlay: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (e) => {
    e.preventDefault();
    // Update id of button pressed for play text.
    getButtonIdText(e.currentTarget.id);
  };

  const buttonGroup = {
    user: [
      {
        iconName: faTrash,
        visible: true,
        styles: {},
        action: deleteText,
        data_name: "cleanTextUser",
        id: "cleanTextUser",
      },
      {
        iconName: faVolumeHigh,
        visible: true,
        styles: {
          marginLeft: "auto",
          opacity: !isEnded && buttonIDText === "playTextUser" ? 0.2 : 1,
        },
        action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handlerButtonPlay(e),
        data_name: "playTextUser",
        id: "playTextUser",
      },
      {
        iconName: faCopy,
        visible: true,
        styles: {},
        action: (e: React.MouseEvent<HTMLButtonElement>) => clipText(e),
        data_name: "copyTextUser",
        id: "copyTextUser",
      },
    ],
    translate: [
      {
        iconName: faTrash,
        visible: false,
        styles: {},
        action: () => alert("clicked"),
        data_name: "cleanTextTrad",
        id: "cleanTextTrad",
      },
      {
        iconName: faVolumeHigh,
        visible: true,
        styles: {
          marginLeft: "auto",
          opacity: !isEnded && buttonIDText === "playTextTrad" ? 0.2 : 1,
        },
        action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handlerButtonPlay(e),
        data_name: "playTextTrad",
        id: "playTextTrad",
      },
      {
        iconName: faCopy,
        visible: true,
        styles: {},
        action: (e: React.MouseEvent<HTMLButtonElement>) => clipText(e),
        data_name: "copyTextTrad",
        id: "copyTextTrad",
      },
    ],
  };

  const handlerChildren = (param: number) => {
    const buttonList: { [key: string]: any } =
      param === 1 ? buttonGroup.user : buttonGroup.translate;
    return (
      <div
        style={{
          height: "auto",
          width: "100%",
          backgroundColor: "transparent",
          display: "flex",
          gap: " 15px",
          padding: "0 20px",
        }}
      >
        {buttonList.map((i: any) => {
          return (
            <Fragment key={i.id}>
              <IconButton
                iconName={i.iconName}
                visible={i.visible}
                action={i.action}
                styles={i.styles}
                data_name={i.data_name}
                id={i.id}
              />
            </Fragment>
          );
        })}
      </div>
    );
  };

  const Nav1: () => JSX.Element = () => handlerChildren(1);
  const Nav2: () => JSX.Element = () => handlerChildren(2);

  return (
    <>
      <Header />
      <>
        <section
          className={`App ${
            deviceType === "desktop" ? "bigDevice" : "littleDevice"
          }`}
        >
          <CustomTextArea
            deviceType={deviceType}
            children={<Nav1 />}
            readOnly={false}
            handlerSelectedLanguage={handlerSelectedLanguage}
            selectedLanguage={
              selectedLanguage!.playTextUser
                ? selectedLanguage!.playTextUser!.textLang
                : LANGUGES_VALUES[41].textLang
            }
            handlerValueInput={handlerValueInput}
            data_name={"playTextUser"}
            textAreaValue={valueTextInput}
          />
          <CustomTextArea
            deviceType={deviceType}
            children={<Nav2 />}
            readOnly={true}
            handlerSelectedLanguage={handlerSelectedLanguage}
            selectedLanguage={selectedLanguage!.playTextTrad!.textLang}
            // handlerValueInput={handlerValueInput}
            data_name={"playTextTrad"}
            textAreaValue={textTranslate}
          />
        </section>
        <BrandComponent />
      </>
      {errorLanguage && (
        <ErrorComponent errorText={translateErrorText || errorTextTranslate} />
      )}
      {messageCopy && (
        <NotificationPill text={translateButonText || pillText} />
      )}
    </>
  );
}

export default App;
