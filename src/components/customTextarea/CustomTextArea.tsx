import CustomSelect from "../../microcomponents/customSelect/CustomSelect";
import WordsCounter from "../../microcomponents/wordsCounter/WordsCounter";
import "./CustomTextArea.scss";

interface CustomTextAreaProps {
  textAreaValue: string | undefined;
  data_name: string;
  deviceType: string;
  children: React.ReactNode;
  // children: (param: number) => React.ReactNode;
  readOnly: boolean;
  handlerSelectedLanguage?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
  selectedLanguage?: string;
  handlerValueInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function CustomTextArea({
  deviceType,
  children,
  readOnly,
  handlerSelectedLanguage,
  selectedLanguage,
  handlerValueInput,
  data_name,
  textAreaValue,
}: CustomTextAreaProps) {
  return (
    <article
      className="custom-textarea"
      style={{
        width: deviceType === "desktop" ? "50%" : "95%",
      }}
    >
      <div>
        <CustomSelect
          handlerSelectedLanguage={handlerSelectedLanguage!}
          selectedLanguage={selectedLanguage!}
          data_name={data_name}
        />
        <WordsCounter text={textAreaValue} readOnly={readOnly} />
      </div>
      <textarea
        readOnly={readOnly}
        style={{
          backgroundColor: readOnly ? `#cac5c5` : undefined,
        }}
        onChange={handlerValueInput ? (e) => handlerValueInput(e) : undefined}
        value={textAreaValue}
        maxLength={200}
      />
      <>{children}</>
    </article>
  );
}
