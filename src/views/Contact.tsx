import { useRef } from "react";
import emailjs from "@emailjs/browser";

import "../style/contact.scss";

function Contact() {
  const form = useRef<HTMLFormElement>(null);

  // Emailjs credentials
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <>
      <main>
        <section className="form-section">
          <h4>If you have any questions send me a message:</h4>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" rows={5} />
            <button type="submit">Send</button>
          </form>
        </section>
        <section className="feedback-section"></section>
      </main>
    </>
  );
}

export default Contact;
