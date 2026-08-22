import { useState } from "react";
import "./styles/FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "I specialize in UI/UX Design, Full-Stack Web Development, and Motion Graphics. Whether you need a brand new website, a complex web application, or engaging visual assets, I can help bring your vision to life.",
    },
    {
      question: "What is your typical process?",
      answer: "My process usually involves four key stages: Discovery & Research, Wireframing & Design, Development, and finally Testing & Launch. I ensure continuous communication throughout each phase to ensure the product meets your exact needs.",
    },
    {
      question: "How long does a project usually take?",
      answer: "The timeline depends on the scope and complexity of the project. A standard website might take 2-4 weeks, whereas a more complex web application could take 6-12 weeks. I provide a detailed timeline during our initial consultation.",
    },
    {
      question: "Do you offer ongoing support and maintenance?",
      answer: "Yes! I offer post-launch support and maintenance packages to ensure your website or application stays up-to-date, secure, and running smoothly.",
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section" id="faq">
      <div className="faq-container">
        <h3 className="title" data-scroll data-scroll-speed="1">FAQ</h3>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h4>{faq.question}</h4>
                <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
              </div>
              <div 
                className="faq-answer" 
                style={{ 
                  maxHeight: activeIndex === index ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-in-out, padding 0.3s ease"
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
