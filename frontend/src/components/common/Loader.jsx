import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ text = "Loading...", fullScreen = false, size = 40, color = "var(--primary)" }) => {
    if (fullScreen) {
        return (
            <div className="loader-fullscreen">
                <div className="loader-content">
                    <Loader2 className="spinner" size={size} color={color} />
                    {text && <p className="loader-text">{text}</p>}
                </div>
                <style jsx>{`
          .loader-fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .loader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }
          .spinner {
            animation: spin 1s linear infinite;
          }
          .loader-text {
            font-family: var(--font-body);
            color: var(--text-muted);
            font-size: 1rem;
            letter-spacing: 0.5px;
            font-weight: 500;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="loader-inline">
            <Loader2 className="spinner" size={size} color={color} />
            {text && <span className="loader-text">{text}</span>}
            <style jsx>{`
        .loader-inline {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          gap: 10px;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        .loader-text {
           font-family: var(--font-body);
           color: var(--text-muted);
           font-size: 0.9rem;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Loader;
