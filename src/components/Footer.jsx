export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-row">
        <img src="/icons/signature.png" alt="Yassin Amr" className="footer-signature" />
        <p>&copy; {year} Yassin Amr. Built by hand.</p>
      </div>
    </footer>
  );
}
