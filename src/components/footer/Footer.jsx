import "./footer.css";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer class="footer-distributed">
      <div class="footer-right">
        <a href="/">
          <FaFacebookF />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaGithub />
        </a>
      </div>

      <div class="footer-left">
        <p>Coup-earn&copy; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
