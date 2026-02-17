import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-content container animate-fade-in">
                <span className="hero-subtitle">New Collection 2026</span>
                <h1 className="hero-title">Elegance in <br /> Every Detail</h1>
                <p className="hero-desc">
                    Discover our handcrafted jewellery and accessories designed to make every moment unforgettable.
                </p>
                <button className="btn btn-primary hero-btn" onClick={() => document.querySelector('.grid-products')?.scrollIntoView({ behavior: 'smooth' })}>
                    Shop Now <ArrowRight size={20} />
                </button>
            </div>
            <div className="hero-overlay"></div>

            <style jsx>{`
        .hero-section {
          height: 600px;
          width: 100vw;
          margin-left: calc(-50vw + 50%); /* Full viewport width breakout */
          margin-right: calc(-50vw + 50%);
          background-image: url('https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2070&auto=format&fit=crop');
          background-size: cover;
          background-position: center 30%;
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 60px;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
          padding-left: 20px;
        }

        .hero-subtitle {
          display: inline-block;
          font-size: 0.9rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 15px;
          border-left: 3px solid var(--primary);
          padding-left: 15px;
          opacity: 0.9;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .hero-desc {
          font-size: 1.1rem;
          max-width: 500px;
          margin-bottom: 40px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .hero-btn {
            padding: 15px 35px;
            font-size: 1.1rem;
            display: inline-flex;
            gap: 10px;
            align-items: center;
        }

        @media (max-width: 768px) {
          .hero-section {
            height: 500px;
            background-position: center;
          }
          .hero-title {
            font-size: 3rem;
          }
          .hero-overlay {
             background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
          }
          .hero-content {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
          }
           .hero-subtitle {
               border-left: none;
               border-bottom: 3px solid var(--primary);
               padding-left: 0;
               padding-bottom: 5px;
           }
        }
      `}</style>
        </div>
    );
};

export default HeroSection;
