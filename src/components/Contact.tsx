import { apiFetch } from "../api";
import { useEffect, useRef, useState } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);



  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await apiFetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: data.name,
          email: data.email,
          notes: data.notes,
          budget: "N/A", 
          timeline: "N/A", 
          company: "N/A", 
          projectType: "Contact Form" 
        })
      });
      setSubmitStatus("Message sent successfully! I'll get back to you shortly.");
      e.currentTarget.reset();
    } catch (err) {
      setSubmitStatus("Error sending message. Please try again or reach out directly by email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section section-container" id="contact" ref={sectionRef}>
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
                  className="contact-email-link"
                >
                  contact@brintadeb.com
                </a>
              </p>
              <h4>Specialization</h4>
              <p className="specialization-desc">
                UI/UX Design, Web Development, SEO Management<br/>
                Cinematic 3D Experiences & Interactive Frontends
              </p>
            </div>
            <div className="contact-box">
              <h4>Social Profiles</h4>
              <div className="contact-social-group">
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
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  Instagram <MdArrowOutward />
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-right">
            <Tilt
              tiltEnable={isDesktop}
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              perspective={1000}
              transitionSpeed={800}
              scale={1.01}
              gyroscope={false}
              glareEnable={isDesktop}
              glareMaxOpacity={0.08}
              glarePosition="all"
              className="contact-tilt-wrapper"
            >
              <div className="contact-form-wrapper">
                <h4>Send a Message</h4>
                
                {submitStatus && (
                  <div className={`contact-feedback ${submitStatus.includes('Error') ? 'error' : 'success'}`}>
                    {submitStatus}
                  </div>
                )}

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <input 
                    name="name" 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    className="contact-input" 
                  />
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    className="contact-input" 
                  />
                  <textarea 
                    name="notes" 
                    placeholder="Your Message..." 
                    required 
                    rows={4} 
                    className="contact-input textarea"
                  ></textarea>
                  <button type="submit" className="contact-submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </Tilt>
          </div>
        </div>

        <div className="contact-bottom">
          <div className="contact-bottom-text">
            <h2>
              Designed and Developed by <span>Shreyam (BrintaDeb)</span>
            </h2>
          </div>
          <div className="contact-bottom-copy">
            <h5>
              <MdCopyright /> {new Date().getFullYear()} Atelier Studios
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
