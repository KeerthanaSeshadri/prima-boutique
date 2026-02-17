import React from "react";
import { Truck, ShieldCheck, Clock, CreditCard } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: <Truck size={32} />,
            title: "Global Shipping",
            desc: "Fast & secure delivery worldwide"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Authentic Quality",
            desc: "Handpicked premium materials"
        },
        {
            icon: <CreditCard size={32} />,
            title: "Secure Payment",
            desc: "100% secure checkout process"
        },
        {
            icon: <Clock size={32} />,
            title: "24/7 Support",
            desc: "Dedicated support for our clients"
        }
    ];

    return (
        <div className="features-section">
            <div className="container">
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-item">
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <div className="feature-text">
                                <h4>{feature.title}</h4>
                                <p>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .features-section {
          padding: 60px 0;
          background-color: var(--bg-surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-bottom: 60px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          transition: var(--transition);
        }

        .feature-item:hover {
            transform: translateY(-5px);
        }

        .feature-icon {
            color: var(--primary);
            background: rgba(183, 110, 121, 0.1); /* Primary with opacity */
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .feature-text h4 {
            font-size: 1.1rem;
            margin-bottom: 5px;
            color: var(--dark);
        }

        .feature-text p {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin: 0;
        }
      `}</style>
        </div>
    );
};

export default FeaturesSection;
