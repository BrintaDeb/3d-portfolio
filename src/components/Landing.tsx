import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SHREYAM
              <br />
              <span>aka BrintaDeb</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">UI/UX</div>
              <div className="landing-h2-2">Designer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Designer</div>
              <div className="landing-h2-info-1">UI/UX</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
