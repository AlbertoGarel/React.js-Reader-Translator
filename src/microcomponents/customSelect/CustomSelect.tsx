import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useClientMeasures from "../../hooks/useClientMEasures";
import { LANGUGES_VALUES, Languages_Value_Types } from "../../constants/const";
import "./CustomSelect.scss";

interface CustomSelectProps {
  data_name: string;
  handlerSelectedLanguage: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
  selectedLanguage: string;
}

export default function CustomSelect({
  handlerSelectedLanguage,
  selectedLanguage,
  data_name,
}: CustomSelectProps) {
  const { deviceType } = useClientMeasures();
  const [visible, setVisible] = useState<boolean>(false);

  const handlerStopPropagation = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  // CREAR FUNCION PARA SELECCIONAR LENGUAJES SEGÚN VALOR DE ENTRADA EN APP COMPONENT.

  return (
    <div id="custom-select" onClick={() => setVisible(!visible)}>
      <span>{selectedLanguage}</span>
      <FontAwesomeIcon icon={faAngleDown} />
      {visible && (
        <div
          id="options-container"
          style={{
            width: deviceType === "desktop" ? "calc(200% + 10px)" : "100%",
          }}
        >
          <div style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Search languages"
              id="search-languages-input"
              style={{
                border: "none",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                fontFamily: "Cabin",
                fontWeight: "bolder",
                letterSpacing: ".8px",
              }}
              onClick={(e) => handlerStopPropagation(e)}
            />
          </div>
          {LANGUGES_VALUES.map((i) => {
            return (
              <span
                key={i.value}
                data-value={i.value}
                data-text={i.textLang}
                data-name={data_name}
                className={
                  selectedLanguage === i.textLang
                    ? "selected-language"
                    : undefined
                }
                onClick={(e) => handlerSelectedLanguage(e)}
              >
                {i.textLang}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
