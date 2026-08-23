import { apiFetch } from "../api";
import { useState, useCallback, useEffect, useRef } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
gsap.registerPlugin(ScrollTrigger);
import WorkImage from "./WorkImage";
import Knob from "./Knob";

interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  images?: string[];
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
  const touchStartX = useRef<number | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await apiFetch("/api/projects");
      const data = await res.json();
      if (data.success && data.projects && data.projects.length > 0) {
        const mapped = data.projects.map((p: any) => ({
          title: p.title,
          category: p.category || "Uploaded Project",
          tools: p.description,
          image: p.mediaUrl || "/images/web_dev.jpg",
          images: p.mediaUrls || [],
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
  const carouselRef = useRef<HTMLDivElement>(null);
  
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
    
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % dynamicProjects.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + dynamicProjects.length) % dynamicProjects.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 ref={titleRef}>
          My <span>Work</span>
        </h2>
          
        <div className="carousel-layout" ref={carouselRef}>
          <div 
            className="carousel-track-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {dynamicProjects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <Tilt
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      perspective={1000}
                      transitionSpeed={1000}
                      scale={1.02}
                      gyroscope={true}
                      glareEnable={true}
                      glareMaxOpacity={0.15}
                      glarePosition="all"
                      className="carousel-tilt-wrapper"
                    >
                      <div className="carousel-image-wrapper">
                        {project.mediaType === 'video' ? (
                           <video src={project.image} autoPlay loop muted playsInline />
                        ) : (
                           project.images && project.images.length > 1 ? (
                             <div className="inner-carousel">
                               {project.images.map((img, i) => (
                                 <div className="inner-carousel-slide" key={i}>
                                   <WorkImage image={img} alt={`${project.title} - ${i}`} link={project.link} />
                                 </div>
                               ))}
                             </div>
                           ) : (
                             <WorkImage
                               image={project.image}
                               alt={project.title}
                               link={project.link}
                             />
                           )
                        )}
                        <div className="carousel-overlay-text">
                          <span className="project-category-badge">{project.category}</span>
                          <h4>{project.title}</h4>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </Tilt>
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
