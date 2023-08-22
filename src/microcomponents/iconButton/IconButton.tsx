import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./IconButton.scss";

interface IconButtonProps {
  iconName: IconProp;
  visible: boolean;
  styles?: { [key: string]: string };
  action: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  data_name: string;
  id: string;
}

export default function IconButton({
  iconName,
  visible,
  styles,
  action,
  data_name,
  id,
}: IconButtonProps) {
  return (
    <button
      data-id={data_name}
      id={id}
      className="icon-button"
      type="button"
      onClick={action}
      style={{ visibility: visible ? "visible" : "hidden", ...styles }}
    >
      <FontAwesomeIcon icon={iconName} />
    </button>
  );
}
