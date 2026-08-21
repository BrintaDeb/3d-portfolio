import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>UI/UX DESIGN</h3>
              <h4>Cinematic & Intuitive Interfaces</h4>
              <p className="what-text-hide">
                Specializing in high-end, dynamic interfaces. I blend aesthetics with usability to create 
                experiences that feel premium, interactive, and seamless.
              </p>
              <h5 className="what-text-hide">Skillset & tools</h5>
              <div className="what-content-flex what-text-hide">
                <div className="what-tags">Figma</div>
                <div className="what-tags">Wireframing</div>
                <div className="what-tags">Prototyping</div>
                <div className="what-tags">User Research</div>
                <div className="what-tags">Graphic Design</div>
                <div className="what-tags">Cinematic 3D Integration</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>WEB DEVELOPMENT</h3>
              <h4>Scalable & Performant Applications</h4>
              <p className="what-text-hide">
                From pixel-perfect frontend layouts to robust backend architectures. I build 
                full-stack applications that are optimized for performance and SEO.
              </p>
              <h5 className="what-text-hide">Skillset & tools</h5>
              <div className="what-content-flex what-text-hide">
                <div className="what-tags">React</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">Framer Motion</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Server Management</div>
                <div className="what-tags">SEO Optimization</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>GRAPHICS DESIGN</h3>
              <h4>Visual Storytelling & Branding</h4>
              <p className="what-text-hide">
                Creating compelling visual narratives, branding, and digital assets that capture attention and communicate the right message across all platforms.
              </p>
              <h5 className="what-text-hide">Skillset & tools</h5>
              <div className="what-content-flex what-text-hide">
                <div className="what-tags">Photoshop</div>
                <div className="what-tags">Illustrator</div>
                <div className="what-tags">Indesign</div>
                <div className="what-tags">Procreate</div>
                <div className="what-tags">Branding</div>
                <div className="what-tags">Logo Design</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 3)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>SEO MANAGEMENT</h3>
              <h4>Data-Driven Growth Strategies</h4>
              <p className="what-text-hide">
                Optimizing content, keywords, and technical structure to improve rankings, drive organic traffic, and maximize visibility in search engines.
              </p>
              <h5 className="what-text-hide">Skillset & tools</h5>
              <div className="what-content-flex what-text-hide">
                <div className="what-tags">Google Analytics</div>
                <div className="what-tags">Keyword Research</div>
                <div className="what-tags">On-Page SEO</div>
                <div className="what-tags">Content Strategy</div>
                <div className="what-tags">Ahrefs</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
