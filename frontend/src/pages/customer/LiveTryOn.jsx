import React, { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { X, Loader } from "lucide-react";
import Swal from "sweetalert2";

const LiveTryOn = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const faceMeshRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });

        if (!isMounted) return;

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setLoading(false); // Camera started
          startFaceMesh();
        }
      } catch (err) {
        console.error("Camera error:", err);
        setLoading(false); // Stop loading even on error
        Swal.fire({
          icon: "error",
          title: "Camera Access Denied",
          text: "Please enable camera permissions to use this feature.",
          confirmButtonColor: "#B76E79",
        });
        onClose();
      }
    };

    const startFaceMesh = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // Preload earring image
      const jewelleryImage = new Image();
      jewelleryImage.src = "/earring.png";

      const faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
      });

      faceMeshRef.current = faceMesh;

      faceMesh.onResults((results) => {
        if (!canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!results.multiFaceLandmarks?.length) return;

        const landmarks = results.multiFaceLandmarks[0];

        const leftEar = landmarks[93]; // Approximate ear lobe landmark
        const rightEar = landmarks[323];

        const width = canvas.width;
        const height = canvas.height;

        const leftX = leftEar.x * width;
        const leftY = leftEar.y * height;

        const rightX = rightEar.x * width;
        const rightY = rightEar.y * height;

        // Calculate face width for scaling
        const faceWidth =
          Math.abs(landmarks[234].x - landmarks[454].x) * width;

        const scale = faceWidth * 0.45;
        const offsetY = scale * 0.4;

        ctx.drawImage(
          jewelleryImage,
          leftX - scale / 2,
          leftY - scale / 2 + offsetY,
          scale,
          scale
        );

        ctx.drawImage(
          jewelleryImage,
          rightX - scale / 2,
          rightY - scale / 2 + offsetY,
          scale,
          scale
        );
      });

      const detect = async () => {
        if (!videoRef.current || !isMounted || videoRef.current.paused || videoRef.current.ended) return;
        await faceMesh.send({ image: videoRef.current });
        animationRef.current = requestAnimationFrame(detect);
      };

      // Wait a bit for video to be ready before starting detection loop
      setTimeout(detect, 1000);
    };

    startCamera();

    return () => {
      isMounted = false;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (faceMeshRef.current) {
        faceMeshRef.current.close();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onClose]);

  return (
    <div className="tryon-overlay animate-fade-in" onClick={onClose} style={overlayStyle}>
      <div className="tryon-modal" onClick={(e) => e.stopPropagation()} style={modalStyle}>

        <button className="close-btn" onClick={onClose} style={closeBtn}>
          <X size={24} color="var(--dark)" />
        </button>

        <h2 style={{
          color: "var(--primary)",
          marginBottom: "20px",
          fontFamily: "var(--font-heading)"
        }}>
          Live Bridal Try-On
        </h2>

        <div className="camera-container" style={cameraContainer}>
          {loading && (
            <div className="loader-overlay" style={loaderStyle}>
              <Loader className="spin" size={40} color="var(--primary)" />
              <p>Initializing Camera...</p>
            </div>
          )}

          <video
            ref={videoRef}
            width="640"
            height="480"
            style={videoStyle}
            playsInline
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={canvasStyle}
          />
        </div>
      </div>

      <style jsx>{`
            .spin {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
      `}</style>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.85)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "var(--z-modal)"
};

const modalStyle = {
  background: "var(--bg-surface)",
  padding: "var(--spacing-lg)",
  borderRadius: "var(--radius-card)",
  textAlign: "center",
  position: "relative",
  boxShadow: "var(--shadow-xl)",
  maxWidth: "90%",
  maxHeight: "90vh",
  overflow: "hidden"
};

const closeBtn = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  zIndex: 10
};

const cameraContainer = {
  position: "relative",
  width: "640px",
  height: "480px",
  maxWidth: "100%",
  borderRadius: "var(--radius-card)",
  overflow: "hidden",
  backgroundColor: "#000"
};

const videoStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "scaleX(-1)"
};

const canvasStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  transform: "scaleX(-1)"
};

const loaderStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#f0f0f0",
  zIndex: 5,
  gap: "10px",
  color: "var(--text-muted)"
};

export default LiveTryOn;
