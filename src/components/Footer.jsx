import { SiInstagram, SiFacebook } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-brand">
          <img src="/icons/signature.png" alt="Yassin Amr" className="footer-signature" />
          <p>&copy; {year} Yassin Amr. Built by hand.</p>
        </div>
        <div className="footer-social">
          <a
            href="https://www.instagram.com/yassin.shehab2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Yassin Amr on Instagram"
          >
            <SiInstagram />
          </a>
          <a
            href="https://www.facebook.com/share/1FSfmzXzbN/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Yassin Amr on Facebook"
          >
            <SiFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
}
