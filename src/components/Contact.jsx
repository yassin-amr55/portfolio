import { useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { useMagnetic } from "../hooks/useMagnetic";

const FORM_ENDPOINT = "https://formspree.io/f/movwakzv"; // do not change

export default function Contact() {
  const { ref, visible } = useReveal();
  const sendRef = useMagnetic();
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    setStatus("sending");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

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

          {/* Formspree endpoint — do not change. Submitted via fetch so the
              page never navigates away to Formspree's own thank-you page. */}
          <form
            ref={formRef}
            className="contact-form reveal-item"
            style={{ "--i": 1 }}
            action={FORM_ENDPOINT}
            method="POST"
            onSubmit={handleSubmit}
          >
            <h3>Get in contact</h3>
            <input type="text" name="name" placeholder="Your Name" required disabled={status === "sending"} />
            <input type="email" name="email" placeholder="Your Email" required disabled={status === "sending"} />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="5"
              disabled={status === "sending"}
            ></textarea>
            <button ref={sendRef} type="submit" className="btn btn-primary send-btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send"}
            </button>

            {(status === "success" || status === "error") && (
              <p className={`form-status form-status-${status}`} role="status" aria-live="polite">
                {status === "success"
                  ? "✓ Message sent — thanks, I'll get back to you soon."
                  : "Something went wrong — try again, or email me directly."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
