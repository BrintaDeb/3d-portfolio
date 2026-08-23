import { apiFetch } from "../api";
import { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { BsQuestionLg } from "react-icons/bs";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/ServicesPricing.css";

gsap.registerPlugin(ScrollTrigger);

// Define the structure of a Pricing Tier
interface PricingTier {
  name: string;
  price: string;
  hourlyRate: string;
  description: string;
  features: string[];
  deliveryTime: string;
  revisions: string;
  isPopular?: boolean;
}

// Define the structure of a Category
interface ServiceCategory {
  id: string;
  title: string;
  tiers: PricingTier[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "web-dev",
    title: "Web Development",
    tiers: [
      {
        name: "Basic",
        price: "~₹15,000",
        hourlyRate: "₹1,500/hr",
        description: "A simple, responsive landing page to establish your online presence.",
        features: [
          "1 Page Landing Site",
          "Responsive Design",
          "Basic SEO Optimization",
          "Contact Form"
        ],
        deliveryTime: "5 Days",
        revisions: "2 Revisions"
      },
      {
        name: "Standard",
        price: "~₹40,000",
        hourlyRate: "₹2,500/hr",
        description: "A complete multi-page website tailored for small businesses.",
        features: [
          "Up to 5 Pages",
          "Responsive Design",
          "CMS Integration",
          "Advanced SEO",
          "Social Media Integration"
        ],
        deliveryTime: "14 Days",
        revisions: "5 Revisions",
        isPopular: true
      },
      {
        name: "Premium",
        price: "~₹90,000",
        hourlyRate: "₹3,500/hr",
        description: "A fully custom web application or e-commerce solution.",
        features: [
          "Custom Web App / E-commerce",
          "Database Integration",
          "User Authentication",
          "Payment Gateway setup",
          "Priority Support"
        ],
        deliveryTime: "30+ Days",
        revisions: "Unlimited"
      },
      {
        name: "Enterprise",
        price: "~₹1,50,000+",
        hourlyRate: "₹5,000/hr",
        description: "Scalable enterprise solutions with advanced architecture and dedicated support.",
        features: [
          "Complex Enterprise Systems",
          "Microservices Architecture",
          "Advanced Cloud Deployment",
          "SLA & Dedicated Maintenance",
          "24/7 Priority Support"
        ],
        deliveryTime: "60+ Days",
        revisions: "Unlimited"
      }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    tiers: [
      {
        name: "Basic",
        price: "~₹10,000",
        hourlyRate: "₹1,000/hr",
        description: "Wireframes and basic UI for a small app or website idea.",
        features: [
          "Up to 3 Screens",
          "Low-Fidelity Wireframes",
          "Basic Style Guide",
        ],
        deliveryTime: "4 Days",
        revisions: "1 Revision"
      },
      {
        name: "Standard",
        price: "~₹30,000",
        hourlyRate: "₹2,000/hr",
        description: "High-fidelity designs with a comprehensive design system.",
        features: [
          "Up to 10 Screens",
          "High-Fidelity UI",
          "Interactive Prototype",
          "Full Design System",
          "Assets Export"
        ],
        deliveryTime: "10 Days",
        revisions: "3 Revisions",
        isPopular: true
      },
      {
        name: "Premium",
        price: "~₹60,000",
        hourlyRate: "₹3,000/hr",
        description: "Complete product design from research to high-fidelity prototypes.",
        features: [
          "Unlimited Screens (Fair Use)",
          "UX Research & Persona",
          "Advanced Micro-interactions",
          "Developer Handoff",
          "Post-launch Review"
        ],
        deliveryTime: "21 Days",
        revisions: "Unlimited"
      },
      {
        name: "Enterprise",
        price: "~₹1,00,000+",
        hourlyRate: "₹4,000/hr",
        description: "Large-scale design systems and multi-platform UX strategy.",
        features: [
          "Multi-Platform (Web & Mobile)",
          "Comprehensive User Testing",
          "Enterprise Design System",
          "Dedicated UX Researcher",
          "Continuous Optimization"
        ],
        deliveryTime: "45+ Days",
        revisions: "Unlimited"
      }
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    tiers: [
      {
        name: "Basic",
        price: "~₹8,000",
        hourlyRate: "₹800/hr",
        description: "Simple illustrations, poster design, or basic color grading.",
        features: [
          "Up to 2 Concepts",
          "Basic Color Grading",
          "Social Media Posters",
          "High-Res Export"
        ],
        deliveryTime: "3 Days",
        revisions: "1 Revision"
      },
      {
        name: "Standard",
        price: "~₹20,000",
        hourlyRate: "₹1,500/hr",
        description: "Engaging promotional materials, custom illustrations, and branding.",
        features: [
          "Custom Illustrations",
          "Advanced Color Grading",
          "Brand Identity Basics",
          "Source File Included"
        ],
        deliveryTime: "7 Days",
        revisions: "3 Revisions",
        isPopular: true
      },
      {
        name: "Premium",
        price: "~₹50,000",
        hourlyRate: "₹2,500/hr",
        description: "Complex vector illustrations, full brand identity, and commercial art.",
        features: [
          "Full Brand Identity",
          "Vector & Digital Art",
          "Commercial Rights",
          "Print-Ready Files"
        ],
        deliveryTime: "14 Days",
        revisions: "Unlimited"
      },
      {
        name: "Enterprise",
        price: "~₹90,000+",
        hourlyRate: "₹3,500/hr",
        description: "High-end campaign designs and large scale illustration projects.",
        features: [
          "Campaign Art Direction",
          "Large Scale Illustrations",
          "Extensive Brand Guidelines",
          "Full Buyout Rights"
        ],
        deliveryTime: "30+ Days",
        revisions: "Unlimited"
      }
    ]
  }
];

const ServicesPricing = () => {
  const [activeTab, setActiveTab] = useState<string>(serviceCategories[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [budgetVal, setBudgetVal] = useState("");
  const [notesVal, setNotesVal] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const briefSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);



  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);

  const handleSelectTier = (tier: PricingTier) => {
    setBudgetVal(tier.price);
    setNotesVal(`I am interested in the ${tier.name} tier (${tier.price}) for ${activeCategory?.title}.`);
    if (briefSectionRef.current) {
      briefSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          budget: data.budget,
          notes: data.notes,
          projectType: "Custom Project Brief" 
        })
      });
      setSubmitStatus("Brief submitted successfully! I'll get back to you soon.");
      setBudgetVal("");
      setNotesVal("");
      e.currentTarget.reset();
    } catch (error) {
      setSubmitStatus("Error submitting brief. Please try again or reach out via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pricing-section" id="services" ref={sectionRef}>
      <div className="pricing-container">
        <h3 className="title">Services & Pricing</h3>
        <div className="services-brief">
          <p>
            Specialized digital design and engineering services tailored to your goals. Choose a structured package below or request a customized project brief.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="pricing-tabs">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              className={`pricing-tab ${activeTab === category.id ? "active" : ""}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {activeCategory?.tiers.map((tier, index) => (
            <Tilt 
              key={index} 
              className="pricing-card-tilt"
              tiltEnable={isDesktop}
              tiltMaxAngleX={8} 
              tiltMaxAngleY={8} 
              perspective={1000} 
              transitionSpeed={800} 
              scale={1.02} 
              gyroscope={false}
              glareEnable={isDesktop} 
              glareMaxOpacity={0.12} 
              glarePosition="all"
            >
              <div className={`pricing-card ${tier.isPopular ? "popular" : ""}`}>
                {tier.isPopular && <div className="popular-badge">Most Popular</div>}
                
                <div className="pricing-header">
                  <h4 className="tier-name">{tier.name}</h4>
                  <div className="price-container">
                    <span className="fixed-price">{tier.price}</span>
                  </div>
                  <p className="hourly-rate">or <strong>{tier.hourlyRate}</strong></p>
                  <p className="tier-desc">{tier.description}</p>
                </div>

                <div className="pricing-meta">
                  <span className="meta-item">⏱ {tier.deliveryTime}</span>
                  <span className="meta-item">🔄 {tier.revisions}</span>
                </div>

                <div className="pricing-features">
                  <h5>What's Included:</h5>
                  <ul>
                    {tier.features.map((feature, idx) => (
                      <li key={idx}>
                        <FaCheck className="check-icon" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="select-plan-btn"
                  onClick={() => handleSelectTier(tier)}
                >
                  Choose {tier.name}
                </button>
              </div>
            </Tilt>
          ))}
        </div>
        
        {/* Customer Brief Section */}
        <div className="customer-brief-section" ref={briefSectionRef}>
          <div className="brief-content-wrapper">
            <div className="hourly-content">
              <h4>Submit a Project Brief</h4>
              <p>Have a custom requirement? Share your project details and budget below, and I'll get back to you with a tailored quote.</p>
            </div>
            
            <div className="brief-question-mark">
              <div className="glowing-icon-wrapper">
                <BsQuestionLg className="glowing-question" />
              </div>
            </div>
          </div>

          <form className="brief-form" onSubmit={handleQuoteSubmit}>
            {submitStatus && (
              <div className={`form-feedback ${submitStatus.includes('Error') ? 'error' : 'success'}`}>
                {submitStatus}
              </div>
            )}
            <div className="brief-input-group">
              <input type="text" name="name" placeholder="Your Name" required className="brief-input" />
              <input type="email" name="email" placeholder="Your Email" required className="brief-input" />
            </div>
            <input 
              type="text" 
              name="budget" 
              placeholder="Estimated Budget (e.g., ₹25,000)" 
              required 
              value={budgetVal}
              onChange={(e) => setBudgetVal(e.target.value)}
              className="brief-input" 
            />
            <textarea 
              name="notes" 
              placeholder="Tell me about your project..." 
              rows={4} 
              required 
              value={notesVal}
              onChange={(e) => setNotesVal(e.target.value)}
              className="brief-input textarea"
            ></textarea>
            <button type="submit" className="contact-submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Request Custom Quote"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ServicesPricing;
