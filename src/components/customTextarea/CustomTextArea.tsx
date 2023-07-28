import "./CustomTextArea.scss";

interface CustomTextAreaProps {
  deviceType: string;
  children: React.ReactNode;
  readOnly: boolean;
}
export default function CustomTextArea({
  deviceType,
  children,
  readOnly,
}: CustomTextAreaProps) {
  return (
    <article
      className="custom-textarea"
      style={{
        width: deviceType === "desktop" ? "50%" : "95%",
      }}
    >
      <p style={{ visibility: !readOnly ? "visible" : "hidden" }}>0/200</p>
      <textarea
        readOnly={readOnly}
        style={{
          backgroundColor: readOnly ? `#cac5c5` : undefined,
        }}
      />
      {children}
    </article>
  );
}
