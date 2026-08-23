import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import setSplitText from "./utils/splitText";

const About = lazy(() => import("./About"));
const Career = lazy(() => import("./Career"));
const Contact = lazy(() => import("./Contact"));
const WhatIDo = lazy(() => import("./WhatIDo"));
const Work = lazy(() => import("./Work"));
const FAQ = lazy(() => import("./FAQ"));
const ServicesPricing = lazy(() => import("./ServicesPricing"));
const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <Suspense fallback={<div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>Loading...</div>}>
              <About />
              <WhatIDo />
              <Career />
              <Work />
              <TechStack />
              <FAQ />
              <ServicesPricing />
              <Contact />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
