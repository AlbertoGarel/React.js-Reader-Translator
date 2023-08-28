import logo from "../../assets/images/Logo_AlbertoGarel.png";
import "./Header.scss";
export default function Header() {
  return (
    <section id="header">
      <h1>Translator</h1>
      <img src={logo} alt="Logo albertogarel" className="responsive-image" />
    </section>
  );
}
