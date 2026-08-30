import { forwardRef } from "react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

const Contact = forwardRef(function Contact({ titleTrans, scrollsActive }, ref) {
  return (
    <section className="contact-content" ref={ref}>
      <div className={cx("contact-title", titleTrans && "trans")}>
        <p className={cx("contact", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          Contact
        </p>
        <div className={cx("double-underline", "scrolls", scrollsActive && "active")} style={{ transition: "all 0.5s" }}>
          <span className="underline"></span>
          <span className="underlinetwo"></span>
        </div>
      </div>
      <div className="contact-main">
        <div className="contact-info">
          <div className="info-row">
            <img src="/icons/email.png" alt="Email" className="contact-icon icon" />
            <a href="mailto:yassin5amr55@gmail.com">yassin5amr55@gmail.com</a>
          </div>
          <div className="info-row">
            <img src="/icons/whatsapp.png" alt="WhatsApp" className="contact-icon icon" />
            <a href="https://wa.me/201066004890" target="_blank" rel="noreferrer">
              +20 106 600 4890
            </a>
          </div>
          <div className="info-row info-row-report">
            <div className="report-icon-wrap">
              <img src="/icons/caution.png" alt="Report" className="contact-icon report-icon icon" />
            </div>
            <span className="report-text">
              Please contact me if there are any problems with the website or if you want to report anything about it.
            </span>
          </div>
        </div>
        <form className="contact-form" action="https://formspree.io/f/movwakzv" method="POST">
          <h2>Get in contact</h2>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit" className="send-btn">
            Send
          </button>
        </form>
      </div>
    </section>
  );
});

export default Contact;
