import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Let's Work Together</h3>
        <div className="contact-flex">
          <div className="contact-left">
            <div className="contact-box">
              <h4>Connect</h4>
              <p>
                <a
                  href="mailto:contact@brintadeb.com"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  contact@brintadeb.com
                </a>
              </p>
              <h4>Specialization</h4>
              <p>
                UI/UX Design, Web Development, SEO Management<br/>
                Cinematic 3D Integration, Advanced Framer Motion
              </p>
            </div>
            <div className="contact-box">
              <h4>Social</h4>
              <a
                href="https://github.com/BrintaDeb"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                GitHub <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/brinta-deb-413656220"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                LinkedIn <MdArrowOutward />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Instagram <MdArrowOutward />
              </a>
            </div>
          </div>
          
          <div className="contact-right">
            <div className="contact-form-wrapper">
              <h4>Send a Message</h4>
              <form className="contact-form" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData.entries());
                await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...data, budget: "N/A", timeline: "N/A", company: "N/A", projectType: "Contact Form" })
                });
                alert("Message sent!");
                e.currentTarget.reset();
              }}>
                <input name="name" type="text" placeholder="Your Name" required className="contact-input" />
                <input name="email" type="email" placeholder="Your Email" required className="contact-input" />
                <textarea name="notes" placeholder="Your Message" required rows={4} className="contact-input"></textarea>
                <button type="submit" className="contact-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>

        <div className="contact-bottom">
          <div className="contact-bottom-text">
            <h2>
              Designed and Developed <br /> by <span>Shreyam (BrintaDeb)</span>
            </h2>
          </div>
          <div className="contact-bottom-copy">
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
