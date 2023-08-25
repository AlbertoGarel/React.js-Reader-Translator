import { useState, Fragment, useEffect, useTransition } from "react";
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

function App() {
  const [buttonIDText, getButtonIdText] = useState<string | undefined>(
    undefined
  );
  const [valueTextInput, getValueTextInput] = useState<string>(
    ""
  );
  const { languagePred } = usePredeterminatelanguge();
  const [selectedLanguage, getSelectedLanguage] = useState<SelectedLanguages>({
    playTextUser: languagePred,
    playTextTrad: LANGUGES_VALUES[40],
  });
  const translate = "Play Football";
  const { text, errorLanguage } = useRequest(
    valueTextInput,
    selectedLanguage,
    translate,
    buttonIDText
  ); // add traduction...
  const {textTranslate} = useTranslation(valueTextInput)

  const { measures, deviceType } = useClientMeasures();
  const { deviceHeight } = measures;
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

    const audioUrl = URL.createObjectURL(text!); // Create a URL for the Blob
    const audio = new Audio(audioUrl);

    const playSound = () => {
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

    const updateStateEnded = () => {
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

  const handlerValueInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update state of user input.
    const textValue = e.currentTarget.value;
    getValueTextInput(textValue);
    console.log(e.currentTarget.value)
  };

  const handlerSelectedLanguage = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    // update state of select language of two inputs.
    const { name, value, text } = e.currentTarget.dataset;
    getSelectedLanguage((prevState) => {
      return {
        ...prevState,
        [name as string]: { textLang: text, value: value },
      };
    });
  };

  const handlerButtonPlay = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Update id of button pressed for play text.
    getButtonIdText(e.currentTarget.id);
  };

  const buttonGroup = {
    user: [
      {
        iconName: faTrash,
        visible: true,
        styles: {},
        action: () => alert("clicked"),
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
        action: () => alert("clicked"),
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
        action: () => alert("clicked"),
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

  const Nav1 = () => handlerChildren(1);
  const Nav2 = () => handlerChildren(2);

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
      {errorLanguage && <ErrorComponent />}
    </>
  );
}

export default App;
