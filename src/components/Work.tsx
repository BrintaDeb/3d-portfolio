import { useState, useCallback, useEffect, useRef } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import WorkImage from "./WorkImage";
import Knob from "./Knob";
interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  link: string;
  mediaType?: string;
}

const projects: Project[] = [
  {
    title: "Anti-Ragging Tour",
    category: "College Website & Project",
    tools: "Web Design",
    image: "/images/web_dev.jpg",
    link: "#",
  },
  {
    title: "Instagram Carousel",
    category: "Social Media Design",
    tools: "Instagram SEO Management",
    image: "/images/seo.jpg",
    link: "#",
  },
  {
    title: "Holi Celebration",
    category: "Event Poster",
    tools: "Graphic Design",
    image: "/images/graphic_design.jpg",
    link: "#",
  },
  {
    title: "B&W World Making Things Colorful",
    category: "Graphic Design",
    tools: "Visual Effects",
    image: "/images/graphic_design.jpg",
    link: "#",
  },
  {
    title: "Day and Night Button",
    category: "Web Development",
    tools: "Front End Development",
    image: "/images/web_dev.jpg",
    link: "#",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>(projects);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && data.projects && data.projects.length > 0) {
        // Map the backend structure to our frontend structure
        const mapped = data.projects.map((p: any) => ({
          title: p.title,
          category: "Uploaded Project",
          tools: p.description,
          image: p.mediaUrl || "/images/web_dev.jpg",
          link: "#",
          mediaType: p.mediaType
        }));
        setDynamicProjects(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch projects, using fallback.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 ref={titleRef}>
          My <span>Work</span>
        </h2>
          
          <div className="carousel-layout">
            <div className="carousel-track-container">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {dynamicProjects.map((project, index) => (
                  <div className="carousel-slide" key={index}>
                    <div className="carousel-content">
                      <div className="carousel-image-wrapper">
                        {project.mediaType === 'video' ? (
                           <video src={project.image} autoPlay loop muted playsInline />
                        ) : (
                           <WorkImage
                             image={project.image}
                             alt={project.title}
                             link={project.link}
                           />
                        )}
                        <div className="carousel-overlay-text">
                          <h4>{project.title}</h4>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="carousel-knob-side">
              <Knob 
                itemsCount={dynamicProjects.length} 
                currentIndex={currentIndex} 
                onChange={goToSlide} 
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Work;
