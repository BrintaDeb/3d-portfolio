import { useState, useEffect } from "react";
import "./styles/Career.css";

const Career = () => {
  const [timeline, setTimeline] = useState([
    { date: "JAN 2024 - PRESENT", title: "Motion Graphics & Web Developer", status: "NOW", desc: "Working with websites and managing all media @ World Mark Foundation." },
    { date: "OCT 2024 - DEC 2024", title: "Image Editing and Designing", status: "DONE", desc: "Working with targets and managing design for Ajio products @ Netscribes India Pvt. Ltd." },
    { date: "JUNE 2024 - AUG 2024", title: "Graphic Designer", status: "DONE", desc: "Working with a big development team to manage design, content, branding and social media @ Minerva Infotech." },
    { date: "2019 - 2021", title: "Junior Graphic Designer", status: "DONE", desc: "Working with a small team to manage design, content, branding and logo design @ Angel Engineering Solution." }
  ]);

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.content['career_timeline']) {
          try {
            const parsed = JSON.parse(data.content['career_timeline']);
            setTimeline(parsed);
          } catch (e) {
            console.error("Failed to parse career timeline JSON");
          }
        }
      })
      .catch(err => console.error("Error fetching career text:", err));
  }, []);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          {timeline.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.date}</h4>
                  <h5>{item.title}</h5>
                </div>
                <h3>{item.status}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Career;
