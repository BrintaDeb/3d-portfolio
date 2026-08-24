import { apiFetch } from "../api";
import { useState, useEffect, useRef } from "react";
import { 
  MdOutlineCode, 
  MdOutlineDesignServices, 
  MdOutlineBrush, 
  MdOutlineAccessTime, 
  MdOutlineAutorenew, 
  MdOutlineArrowForward, 
  MdOutlineCheckCircle, 
  MdClose, 
  MdSend 
} from "react-icons/md";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoother } from "./Navbar";
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
  icon: React.ReactNode;
  tiers: PricingTier[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: <MdOutlineCode className="tab-icon" />,
    tiers: [
      {
        name: "Basic",
        price: "~₹15,000",
        hourlyRate: "₹1,500/hr",
        description: "A sleek, responsive landing page to establish your online presence.",
        features: [
          "1 Page Responsive Landing Site",
          "Modern UI & Smooth Motion",
          "SEO Best Practices Setup",
          "Contact & Lead Capture Form",
          "Mobile & Tablet Optimized"
        ],
        deliveryTime: "5 Days",
        revisions: "2 Revisions"
      },
      {
        name: "Standard",
        price: "~₹40,000",
        hourlyRate: "₹2,500/hr",
        description: "A complete multi-page website tailored for growing businesses and startups.",
        features: [
          "Up to 5 Custom Pages",
          "Custom Micro-Interactions",
          "CMS Integration & Dynamic Content",
          "Advanced SEO & Performance Tuning",
          "Social Media & Analytics Setup"
        ],
        deliveryTime: "14 Days",
        revisions: "5 Revisions",
        isPopular: true
      },
      {
        name: "Premium",
        price: "~₹90,000",
        hourlyRate: "₹3,500/hr",
        description: "A fully custom web application or interactive e-commerce solution.",
        features: [
          "Custom Web App / E-commerce",
          "Database & API Architecture",
          "Secure User Authentication",
          "Payment Gateway Integration",
          "Interactive 3D / WebGL Elements",
          "Priority 30-Day Support"
        ],
        deliveryTime: "30+ Days",
        revisions: "Unlimited"
      },
      {
        name: "Enterprise",
        price: "~₹1,50,000+",
        hourlyRate: "₹5,000/hr",
        description: "Scalable enterprise architecture with dedicated maintenance and custom workflows.",
        features: [
          "Complex Enterprise Platform",
          "Microservices & Cloud Scaling",
          "Automated CI/CD Pipelines",
          "SLA & Dedicated Maintenance",
          "Security Hardening & Audits",
          "24/7 Dedicated Support"
        ],
        deliveryTime: "60+ Days",
        revisions: "Unlimited"
      }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: <MdOutlineDesignServices className="tab-icon" />,
    tiers: [
      {
        name: "Basic",
        price: "~₹10,000",
        hourlyRate: "₹1,000/hr",
        description: "Wireframes and basic UI for a small application or product concept.",
        features: [
          "Up to 3 Key Screens",
          "Low & High Fidelity Wireframes",
          "Color Palette & Typography Guide",
          "Figma Source File Included"
        ],
        deliveryTime: "4 Days",
        revisions: "2 Revisions"
      },
      {
        name: "Standard",
        price: "~₹30,000",
        hourlyRate: "₹2,000/hr",
        description: "High-fidelity interface design with a comprehensive component library.",
        features: [
          "Up to 10 Custom Screens",
          "High-Fidelity UI Design",
          "Interactive Figma Prototype",
          "Full Design System & Tokens",
          "Developer-Ready Asset Export"
        ],
        deliveryTime: "10 Days",
        revisions: "4 Revisions",
        isPopular: true
      },
      {
        name: "Premium",
        price: "~₹60,000",
        hourlyRate: "₹3,000/hr",
        description: "End-to-end product design from user research to interactive prototypes.",
        features: [
          "Complete Mobile/Web Experience",
          "UX Research & User Journeys",
          "Micro-Interactions & Animation Specs",
          "Responsive Breakpoints (Desktop/Mobile)",
          "Detailed Developer Handoff",
          "Post-Launch Design QA"
        ],
        deliveryTime: "21 Days",
        revisions: "Unlimited"
      },
      {
        name: "Enterprise",
        price: "~₹1,00,000+",
        hourlyRate: "₹4,000/hr",
        description: "Large-scale design systems and multi-platform strategic UX architecture.",
        features: [
          "Multi-Platform (Web, iOS, Android)",
          "Comprehensive User Testing",
          "Enterprise Design System & Governance",
          "Design Strategy & Roadmap",
          "Continuous Iteration & Optimization"
        ],
        deliveryTime: "45+ Days",
        revisions: "Unlimited"
      }
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: <MdOutlineBrush className="tab-icon" />,
    tiers: [
      {
        name: "Basic",
        price: "~₹8,000",
        hourlyRate: "₹800/hr",
        description: "Promotional graphics, social media assets, and digital banners.",
        features: [
          "Up to 2 Creative Concepts",
          "Social Media Kit (Posters/Stories)",
          "Basic Color Grading & Retouching",
          "High-Resolution Print/Web Export"
        ],
        deliveryTime: "3 Days",
        revisions: "2 Revisions"
      },
      {
        name: "Standard",
        price: "~₹20,000",
        hourlyRate: "₹1,500/hr",
        description: "Engaging promotional materials, bespoke illustrations, and identity essentials.",
        features: [
          "Custom Digital Illustrations",
          "Brand Visual Identity Essentials",
          "Marketing Collateral & Banners",
          "Layered Vector Source Files",
          "Commercial Usage License"
        ],
        deliveryTime: "7 Days",
        revisions: "4 Revisions",
        isPopular: true
      },
      {
        name: "Premium",
        price: "~₹50,000",
        hourlyRate: "₹2,500/hr",
        description: "Full brand identity suite, complex vector artwork, and creative campaign assets.",
        features: [
          "Comprehensive Brand Guidelines",
          "Custom Vector & 3D Artworks",
          "Print-Ready Packaging & Merchandise",
          "Social Media Brand Kit",
          "Full Commercial Buyout Rights"
        ],
        deliveryTime: "14 Days",
        revisions: "Unlimited"
      },
      {
        name: "Enterprise",
        price: "~₹90,000+",
        hourlyRate: "₹3,500/hr",
        description: "High-end commercial art direction, omni-channel campaigns, and bespoke illustration.",
        features: [
          "Campaign Art Direction & Strategy",
          "Large Scale Visual Artwork",
          "Multi-Platform Asset Ecosystem",
          "Motion Graphics & Teaser Assets",
          "Full Intellectual Property Transfer"
        ],
        deliveryTime: "30+ Days",
        revisions: "Unlimited"
      }
    ]
  }
];

interface SelectedPlan {
  category: string;
  tierName: string;
  price: string;
}

const ServicesPricing = () => {
  const [activeTab, setActiveTab] = useState<string>(serviceCategories[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [budgetVal, setBudgetVal] = useState("");
  const [notesVal, setNotesVal] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
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
    const categoryTitle = activeCategory?.title || "Custom Service";
    setSelectedPlan({
      category: categoryTitle,
      tierName: tier.name,
      price: tier.price
    });
    setBudgetVal(tier.price);
    setNotesVal(`Hi Shreyam, I am interested in the ${tier.name} Plan (${tier.price}) for ${categoryTitle}.\n\nProject details: `);
    
    // Highlight brief section
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 1800);

    // Smooth scroll to brief section
    setTimeout(() => {
      if (window.innerWidth > 1024 && smoother) {
        smoother.scrollTo(briefSectionRef.current, true, "center center");
      } else if (briefSectionRef.current) {
        briefSectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 60);
  };

  const handleClearSelectedPlan = () => {
    setSelectedPlan(null);
    setBudgetVal("");
    setNotesVal("");
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await apiFetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: nameVal,
          email: emailVal,
          budget: budgetVal,
          notes: notesVal,
          projectType: selectedPlan 
            ? `${selectedPlan.category} - ${selectedPlan.tierName} Plan` 
            : "Custom Project Brief" 
        })
      });
      setSubmitStatus("success");
      setNameVal("");
      setEmailVal("");
      setBudgetVal("");
      setNotesVal("");
      setSelectedPlan(null);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="services-pricing-section" id="services" ref={sectionRef}>
      <div className="services-pricing-container">
        
        {/* Section Header */}
        <div className="pricing-header-wrap">
          <div className="pricing-badge-pill">
            <span className="badge-dot"></span>
            <span>PACKAGES & TAILORED SOLUTIONS</span>
          </div>
          <h3 className="pricing-title">Services & Pricing</h3>
          <p className="pricing-subtitle">
            Transparent pricing models and high-performance digital engineering. Select a structured package below or request a custom project brief.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="pricing-tabs">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              className={`pricing-tab ${activeTab === category.id ? "active" : ""}`}
              onClick={() => setActiveTab(category.id)}
              data-cursor="disable"
              type="button"
            >
              {category.icon}
              <span>{category.title}</span>
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
              tiltMaxAngleX={7} 
              tiltMaxAngleY={7} 
              perspective={1000} 
              transitionSpeed={800} 
              scale={1.02} 
              gyroscope={false}
              glareEnable={isDesktop} 
              glareMaxOpacity={0.10} 
              glarePosition="all"
            >
              <div className={`pricing-card ${tier.isPopular ? "popular" : ""}`}>
                {tier.isPopular && (
                  <div className="popular-badge">
                    <span>★ Most Popular</span>
                  </div>
                )}
                
                <div className="pricing-card-header">
                  <div className="tier-header-top">
                    <h4 className="tier-name">{tier.name}</h4>
                  </div>
                  <div className="price-container">
                    <span className="fixed-price">{tier.price}</span>
                  </div>
                  <p className="hourly-rate">or <strong>{tier.hourlyRate}</strong></p>
                  <p className="tier-desc">{tier.description}</p>
                </div>

                <div className="pricing-meta">
                  <div className="meta-item">
                    <MdOutlineAccessTime className="meta-icon" />
                    <span>{tier.deliveryTime}</span>
                  </div>
                  <div className="meta-item">
                    <MdOutlineAutorenew className="meta-icon" />
                    <span>{tier.revisions}</span>
                  </div>
                </div>

                <div className="pricing-features">
                  <h5>What's Included</h5>
                  <ul>
                    {tier.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="feature-check">
                          <MdOutlineCheckCircle />
                        </span>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-card-footer">
                  <button 
                    className={`pricing-btn ${tier.isPopular ? "popular-btn" : ""}`}
                    onClick={() => handleSelectTier(tier)}
                    data-cursor="disable"
                    type="button"
                  >
                    <span>Choose {tier.name}</span>
                    <MdOutlineArrowForward className="btn-arrow-icon" />
                  </button>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
        
        {/* Customer Brief Section */}
        <div 
          className={`customer-brief-section ${isHighlighted ? "highlighted-pulse" : ""}`} 
          ref={briefSectionRef}
        >
          <div className="brief-header">
            <h4>Submit a Custom Project Brief</h4>
            <p className="brief-desc">
              Have a tailored project, specific timeline, or unique scope? Share your requirements below to receive a personalized quote.
            </p>
          </div>

          {/* Selected Plan Indicator Banner */}
          {selectedPlan && (
            <div className="selected-plan-banner">
              <div className="selected-plan-info">
                <span className="selected-plan-tag">Selected Package</span>
                <span className="selected-plan-name">
                  <strong>{selectedPlan.tierName}</strong> ({selectedPlan.category} — {selectedPlan.price})
                </span>
              </div>
              <button 
                type="button" 
                className="clear-plan-btn"
                onClick={handleClearSelectedPlan}
                data-cursor="disable"
                title="Clear selected plan"
              >
                <MdClose />
                <span>Clear Selection</span>
              </button>
            </div>
          )}

          <form className="brief-form" onSubmit={handleQuoteSubmit}>
            {submitStatus === "success" && (
              <div className="form-feedback success">
                <MdOutlineCheckCircle className="feedback-icon" />
                <span>Project brief submitted successfully! I'll review your details and get back to you shortly.</span>
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="form-feedback error">
                <MdClose className="feedback-icon" />
                <span>Error submitting brief. Please try again or reach out directly at contact@brintadeb.com.</span>
              </div>
            )}

            <div className="form-row two-col">
              <div className="input-field-wrap">
                <label className="input-label" htmlFor="brief-name">Your Name</label>
                <input 
                  id="brief-name"
                  type="text" 
                  name="name" 
                  placeholder="e.g., Alex Morgan" 
                  required 
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  className="brief-input" 
                  data-cursor="disable"
                />
              </div>
              <div className="input-field-wrap">
                <label className="input-label" htmlFor="brief-email">Your Email</label>
                <input 
                  id="brief-email"
                  type="email" 
                  name="email" 
                  placeholder="e.g., alex@company.com" 
                  required 
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  className="brief-input" 
                  data-cursor="disable"
                />
              </div>
            </div>

            <div className="input-field-wrap">
              <label className="input-label" htmlFor="brief-budget">Estimated Budget</label>
              <input 
                id="brief-budget"
                type="text" 
                name="budget" 
                placeholder="e.g., ₹30,000 or $500" 
                required 
                value={budgetVal}
                onChange={(e) => setBudgetVal(e.target.value)}
                className="brief-input" 
                data-cursor="disable"
              />
            </div>

            <div className="input-field-wrap">
              <label className="input-label" htmlFor="brief-notes">Project Scope & Requirements</label>
              <textarea 
                id="brief-notes"
                name="notes" 
                placeholder="Tell me about your project goals, target audience, deliverables, and timeline..." 
                rows={4} 
                required 
                value={notesVal}
                onChange={(e) => setNotesVal(e.target.value)}
                className="brief-textarea"
                data-cursor="disable"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="brief-submit-btn" 
              disabled={isSubmitting}
              data-cursor="disable"
            >
              <span>{isSubmitting ? "Submitting Brief..." : "Request Custom Quote"}</span>
              <MdSend className="btn-send-icon" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ServicesPricing;
