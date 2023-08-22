import CustomSelect from "../../microcomponents/customSelect/CustomSelect";
import WordsCounter from "../../microcomponents/wordsCounter/WordsCounter";
import "./CustomTextArea.scss";

interface CustomTextAreaProps {
  data_name: string;
  deviceType: string;
  children: React.ReactNode;
  // children: (param: number) => React.ReactNode;
  readOnly: boolean;
  handlerSelectedLanguage?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
  selectedLanguage?: string;
  handlerValueInput: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
export default function CustomTextArea({
  deviceType,
  children,
  readOnly,
  handlerSelectedLanguage,
  selectedLanguage,
  handlerValueInput,
  data_name,
}: CustomTextAreaProps) {
  return (
    <article
      className="custom-textarea"
      style={{
        width: deviceType === "desktop" ? "50%" : "95%",
      }}
    >
      <div style={{ visibility: !readOnly ? "visible" : "hidden" }}>
        <CustomSelect
          handlerSelectedLanguage={handlerSelectedLanguage!}
          selectedLanguage={selectedLanguage!}
          data_name={data_name}
        />
        <WordsCounter text={"eiryieyref"} />
      </div>
      <textarea
        readOnly={readOnly}
        style={{
          backgroundColor: readOnly ? `#cac5c5` : undefined,
        }}
        onKeyDown={(e) => handlerValueInput(e)}
      />
      <>{children}</>
    </article>
  );
}
