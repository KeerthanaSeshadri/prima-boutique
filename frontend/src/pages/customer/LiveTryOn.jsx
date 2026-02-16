import React, { useRef, useEffect } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";

const LiveTryOn = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const faceMeshRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });

        if (!isMounted) return;

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        startFaceMesh();
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    const startFaceMesh = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!results.multiFaceLandmarks?.length) return;

        const landmarks = results.multiFaceLandmarks[0];

        const leftEar = landmarks[93];
        const rightEar = landmarks[323];

        const width = canvas.width;
        const height = canvas.height;

        const leftX = leftEar.x * width;
        const leftY = leftEar.y * height;

        const rightX = rightEar.x * width;
        const rightY = rightEar.y * height;

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
        if (!videoRef.current) return;
        await faceMesh.send({ image: videoRef.current });
        animationRef.current = requestAnimationFrame(detect);
      };

      detect();
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
  }, []);

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeBtn} onClick={onClose}>✕</button>

        <h2 style={{ color: "#B76E79", marginBottom: "20px" }}>
          Live Bridal Try-On
        </h2>

        <div style={cameraContainer}>
          <video
            ref={videoRef}
            width="640"
            height="480"
            style={videoStyle}
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={canvasStyle}
          />
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 3000
};

const modalStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "16px",
  textAlign: "center",
  position: "relative"
};

const closeBtn = {
  position: "absolute",
  top: "15px",
  right: "20px",
  background: "transparent",
  border: "none",
  fontSize: "22px",
  cursor: "pointer"
};

const cameraContainer = {
  position: "relative",
  width: "640px",
  height: "480px"
};

const videoStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  transform: "scaleX(-1)",
  borderRadius: "12px"
};

const canvasStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  pointerEvents: "none",
  borderRadius: "12px",
  transform: "scaleX(-1)"
};

export default LiveTryOn;
