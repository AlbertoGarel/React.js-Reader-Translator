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

function App() {
  const { measures, deviceType } = useClientMeasures();
  const { deviceHeight } = measures;

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
            children={nav}
            readOnly={false}
          />
          <CustomTextArea
            deviceType={deviceType}
            children={nav}
            readOnly={true}
          />
        </section>
      </>
    </>
  );
}

export default App;

const nav = (
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
    <IconButton iconName={faTrash} visible={true} action={() => alert('clicked')}/>
    <IconButton
      iconName={faVolumeHigh}
      visible={true}
      styles={{ marginLeft: "auto" }}
      action={() => alert('clicked')}
    />
    <IconButton iconName={faCopy} visible={true} action={() => alert('clicked')} />
  </div>
);
