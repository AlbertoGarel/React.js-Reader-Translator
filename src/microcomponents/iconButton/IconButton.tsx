import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./IconButton.scss";

interface IconButtonProps {
  iconName: IconProp;
  visible: boolean;
  styles?: { [key: string]: string };
  action: () => void;
}

export default function IconButton({
  iconName,
  visible,
  styles,
  action,
}: IconButtonProps) {
  return (
    <button
      className="icon-button"
      type="button"
      onClick={action}
      style={{ visibility: visible ? "visible" : "hidden", ...styles }}
    >
      <FontAwesomeIcon icon={iconName} />
    </button>
  );
}
