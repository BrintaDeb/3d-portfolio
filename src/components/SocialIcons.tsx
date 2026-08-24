import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SocialIcons = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Magnetic hover effect
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanupFns: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      let animId: number;

      const rect = elem.getBoundingClientRect();
      mouseX = rect.width / 2;
      mouseY = rect.height / 2;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const itemRect = elem.getBoundingClientRect();
        const x = e.clientX - itemRect.left;
        const y = e.clientY - itemRect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = itemRect.width / 2;
          mouseY = itemRect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      animId = requestAnimationFrame(updatePosition);

      cleanupFns.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animId);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  // Section visibility detection (Hero & Contact only)
  useEffect(() => {
    const checkVisibility = () => {
      const landing = document.querySelector(".landing-section") as HTMLElement;
      const contact = document.querySelector(".contact-section") as HTMLElement;
      const vh = window.innerHeight || document.documentElement.clientHeight;

      let visible = false;

      // Check Hero / Landing section
      if (landing) {
        const landingRect = landing.getBoundingClientRect();
        // Visible if hero is in the top/current viewport
        if (landingRect.bottom > vh * 0.25) {
          visible = true;
        }
      } else {
        // Fallback for top of page if landing element not yet mounted
        if (window.scrollY < vh * 0.5) {
          visible = true;
        }
      }

      // Check Contact section
      if (contact) {
        const contactRect = contact.getBoundingClientRect();
        // Visible if contact section top is within viewport
        if (contactRect.top < vh * 0.85 && contactRect.bottom > 0) {
          visible = true;
        }
      }

      // Also check bottom of document in case of small screens / overscroll
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom && contact) {
        visible = true;
      }

      setIsVisible(visible);
    };

    checkVisibility();

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    let scrollTriggerInstance: ScrollTrigger | null = null;
    try {
      scrollTriggerInstance = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: () => {
          checkVisibility();
        },
      });
    } catch (e) {
      console.warn("ScrollTrigger creation fallback:", e);
    }

    const refreshListener = () => {
      checkVisibility();
    };
    ScrollTrigger.addEventListener("refresh", refreshListener);

    // Short polling interval to catch lazy-loaded components
    const interval = setInterval(checkVisibility, 300);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      ScrollTrigger.removeEventListener("refresh", refreshListener);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`icons-section ${isVisible ? "icons-visible" : "icons-hidden"}`}
      aria-hidden={!isVisible}
    >
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/BrintaDeb"
            target="_blank"
            rel="noreferrer"
            tabIndex={isVisible ? 0 : -1}
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/brinta-deb-413656220/"
            target="_blank"
            rel="noreferrer"
            tabIndex={isVisible ? 0 : -1}
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.youtube.com/@kingsbreed8381"
            target="_blank"
            rel="noreferrer"
            tabIndex={isVisible ? 0 : -1}
          >
            <FaYoutube />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/atelierstudios.svg?utm_source=qr&igsi=cDIyeHJxcml5czdu"
            target="_blank"
            rel="noreferrer"
            tabIndex={isVisible ? 0 : -1}
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Brinta_Deb_Resume.pdf"
        target="_blank"
        rel="noreferrer"
        tabIndex={isVisible ? 0 : -1}
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
