import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) {
            e.preventDefault();
            smoother.scrollTo(section, true, "top top");
          }
        }
      });
    });
    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          BD
        </a>
        <a
          href="https://www.linkedin.com/in/brinta-deb-413656220"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/brinta-deb
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a href="/admin" data-cursor="disable" style={{ textDecoration: 'none' }}>
              <HoverLinks text="ADMIN" />
            </a>
          </li>
          <li>
            <button 
              onClick={() => {
                const current = document.documentElement.dataset.theme;
                document.documentElement.dataset.theme = current === 'light' ? 'dark' : 'light';
              }} 
              style={{
                background: 'transparent',
                border: '1px solid var(--accentColor)',
                color: 'var(--textColor)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                marginLeft: '1rem'
              }}
              data-cursor="disable"
            >
              Toggle Theme
            </button>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
