import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import "../style/contact.scss";

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = useState("");
  const [resultClass, setResultClass] = useState("hidden");

  // Emailjs credentials
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult("");
    setResultClass("hidden");
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setResult("Message sent successfully!");
          setResultClass("success");
          nameRef.current!.value = "";
          emailRef.current!.value = "";
          messageRef.current!.value = "";
        },
        (error) => {
          setResult("FAILED... " + error.text);
          setResultClass("failure");
        }
      );
  };
  return (
    <>
      <main>
        <section className="form-section">
          <h5>
            Hello! 🙋🏻‍♂ My name is Rafał and i'm the creator of this page. I hope
            you find some new food inspiration here (i know the struggle). If
            you have any comments, do not hesitate to send me a message!
          </h5>
          <form ref={form} onSubmit={sendEmail}>
            <label htmlFor="from_name">Name</label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              autoComplete="first-name"
              ref={nameRef}
              required
            />
            <label htmlFor="user_mail">Email</label>
            <input
              type="email"
              id="user_mail"
              name="user_mail"
              autoComplete="email"
              ref={emailRef}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              ref={messageRef}
              required
            />
            <button type="submit">Send</button>
            <p className={resultClass}>{result}</p>
          </form>
        </section>
      </main>
    </>
  );
}

export default Contact;
