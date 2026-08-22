import { useState } from "react";
import { FaCheck, FaCalculator } from "react-icons/fa";
import "./styles/ServiceChecker.css";

interface MicroService {
  id: string;
  name: string;
  price: number;
}

const availableServices: MicroService[] = [
  { id: "ui_ux", name: "UI/UX Design", price: 4999 },
  { id: "ecommerce", name: "E-commerce Integration", price: 7999 },
  { id: "animation_3d", name: "Custom 3D Animation", price: 9999 },
  { id: "seo", name: "SEO Optimization", price: 2999 },
  { id: "copywriting", name: "Copywriting", price: 2999 },
  { id: "logo", name: "Logo & Branding", price: 3999 },
  { id: "performance", name: "Performance Optimization", price: 2999 },
];

const ServiceChecker = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(serviceId => serviceId !== id) : [...prev, id]
    );
  };

  const estimatedTotal = selectedServices.reduce((total, serviceId) => {
    const service = availableServices.find(s => s.id === serviceId);
    return total + (service?.price || 0);
  }, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const selectedNames = availableServices
      .filter(s => selectedServices.includes(s.id))
      .map(s => s.name)
      .join(", ");
    
    const formattedNotes = `Requested Quote for: ${selectedNames || 'General Inquiry'}. 
Estimated Cost: ₹${estimatedTotal.toLocaleString('en-IN')}/mo.
User Notes: ${data.notes}`;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...data, 
          notes: formattedNotes,
          budget: `₹${estimatedTotal.toLocaleString('en-IN')}/mo`, 
          timeline: "N/A", 
          company: data.company || "N/A", 
          projectType: "Custom Quote" 
        })
      });
      alert("Custom Quote Request Sent Successfully!");
      e.currentTarget.reset();
      setSelectedServices([]);
    } catch (error) {
      alert("Error sending request, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-checker-section" id="quote">
      <div className="checker-container">
        <div className="checker-header">
          <FaCalculator className="checker-icon" />
          <h3 className="title" data-scroll data-scroll-speed="1">Build Your Custom Package</h3>
          <p className="subtitle">Select the services you need to instantly calculate an estimated monthly cost.</p>
        </div>

        <div className="checker-grid">
          {/* Left Side: Service Selection */}
          <div className="checker-options">
            <h4 className="section-subtitle">Select Services</h4>
            <div className="services-list">
              {availableServices.map(service => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`service-toggle-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="service-info">
                      <div className={`checkbox-circle ${isSelected ? "checked" : ""}`}>
                        {isSelected && <FaCheck className="check-mark" />}
                      </div>
                      <span className="service-name">{service.name}</span>
                    </div>
                    <span className="service-price">+₹{service.price.toLocaleString('en-IN')}/mo</span>
                  </button>
                );
              })}
            </div>
            
            <div className="total-display">
              <span>Estimated Monthly Total:</span>
              <h2 className="total-amount">₹{estimatedTotal.toLocaleString('en-IN')}<span>/mo</span></h2>
            </div>
          </div>

          {/* Right Side: Quote Request Form */}
          <div className="checker-form-wrapper">
            <h4 className="section-subtitle">Request This Quote</h4>
            <form className="quote-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input name="name" type="text" placeholder="Your Name" required className="quote-input" />
              </div>
              <div className="input-group">
                <input name="email" type="email" placeholder="Your Email" required className="quote-input" />
              </div>
              <div className="input-group">
                <input name="company" type="text" placeholder="Company Name (Optional)" className="quote-input" />
              </div>
              <div className="input-group">
                <textarea name="notes" placeholder="Additional details about your project..." rows={4} className="quote-input"></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-quote-btn"
                disabled={isSubmitting || selectedServices.length === 0}
              >
                {isSubmitting ? "Sending..." : "Submit Quote Request"}
              </button>
              {selectedServices.length === 0 && (
                <p className="form-warning">Please select at least one service to request a quote.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceChecker;
