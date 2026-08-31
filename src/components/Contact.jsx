import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  const { ref, visible } = useReveal();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <p className="eyebrow">Let's Talk</p>
        <h2 className="section-title">Contact</h2>

        <div ref={ref} className={`contact-grid ${visible ? "is-visible" : ""}`}>
          <div className="contact-info reveal-item" style={{ "--i": 0 }}>
            <a className="contact-row" href="mailto:yassin5amr55@gmail.com">
              <img src="/icons/email.png" alt="" className="contact-icon" />
              yassin5amr55@gmail.com
            </a>
            <a className="contact-row" href="https://wa.me/201066004890" target="_blank" rel="noreferrer">
              <img src="/icons/whatsapp.png" alt="" className="contact-icon" />
              +20 106 600 4890
            </a>

            <div className="contact-note">
              <img src="/icons/caution.png" alt="" className="contact-icon" />
              <p>
                Please contact me if there are any problems with the website or if you want to report anything
                about it.
              </p>
            </div>
          </div>

          {/* Formspree endpoint — do not change */}
          <form
            className="contact-form reveal-item"
            style={{ "--i": 1 }}
            action="https://formspree.io/f/movwakzv"
            method="POST"
          >
            <h3>Get in contact</h3>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required rows="5"></textarea>
            <button type="submit" className="btn btn-primary send-btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
