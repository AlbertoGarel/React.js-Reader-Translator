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
  const [valueInput, setInputValue] = useState<string>("");

  const handlerStopPropagation = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handler_Languages =
    valueInput.length > 0
      ? LANGUGES_VALUES.filter((i) =>
          new RegExp(`^${valueInput}.*`, "i").test(i.textLang)
        )
      : LANGUGES_VALUES;

  return (
    <div id="custom-select" onClick={() => setVisible(!visible)}>
      <span>{selectedLanguage}</span>
      <FontAwesomeIcon icon={faAngleDown} />
      {visible && (
        <div
          id="options-container"
          style={{
            width: deviceType === "desktop" ? "calc(100% + 10px)" : "100%",
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
              onChange={(e) => setInputValue(e.currentTarget.value)}
              onClick={(e) => handlerStopPropagation(e)}
              value={valueInput}
            />
          </div>
          <div>
            {handler_Languages.map((i) => {
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
                  onClick={(e) => {
                    handlerSelectedLanguage(e);
                    setInputValue("");
                  }}
                >
                  {i.textLang}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
