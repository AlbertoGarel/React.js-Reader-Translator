import logo from "../../assets/images/Logo_AlbertoGarel.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareGithub,
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./BrandComponent.scss";

const data_social = [
  { icon: faSquareGithub, url: "https://github.com/AlbertoGarel" },
  { icon: faSquareInstagram, url: "https://www.instagram.com/albertogarel/" },
  { icon: faLinkedin, url: "https://linkedin.com/in/albertogarel" },
  { icon: faBriefcase, url: "https://albertogarel.com/" },
];

export default function BrandComponent() {
  return (
    <div id="brand">
      <h6>#albertogarel</h6>
      <img
        src={logo}
        alt="Logo albertogarel"
        className="responsive-image"
        style={{ width: "90px", display: "flex" }}
      />
      <div id="social">
        {data_social.map((i) => {
          return (
            <a key={i.url} href={i.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={i.icon as IconProp} />
            </a>
          );
        })}
      </div>
      <div>
        <span>2023 | Creado con fines prácticos.</span>
      </div>
    </div>
  );
}
