import { useState, useEffect } from "react";
import "./styles/About.css";

const About = () => {
  const [aboutText, setAboutText] = useState(
    "I am a Digital nomad currently based in Agartala Tripura. I've been working in graphic design for the past 4 years. It was only in the past year that I decided to focus full-time on UI/UX Designing."
  );

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.content['about_text']) {
          setAboutText(data.content['about_text']);
        }
      })
      .catch(err => console.error("Error fetching about text:", err));
  }, []);

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          {aboutText}
        </p>
      </div>
    </div>
  );
};

export default About;
