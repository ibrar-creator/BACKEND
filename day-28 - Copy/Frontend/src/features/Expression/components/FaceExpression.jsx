import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { playEmotionMusic, getEmotionInfo } from "../utils/emotionMusic";
import "../styles/faceExpression.css";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
    const detectionIntervalRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");
    const [ lastExpression, setLastExpression ] = useState(null);

    useEffect(() => {
        const setupCamera = async () => {
            try {
                await init({ landmarkerRef, videoRef, streamRef });
                console.log("✓ Camera initialized");
            } catch (error) {
                console.error("✗ Camera setup failed:", error);
            }
        };

        setupCamera();

        // Auto-detect emotions continuously
        detectionIntervalRef.current = setInterval(() => {
            try {
                const detectedEmotion = detect({ landmarkerRef, videoRef, setExpression });
                
                if (detectedEmotion) {
                    console.log("🎭 Emotion detected:", detectedEmotion);
                    
                    // Play music when emotion changes
                    if (detectedEmotion !== lastExpression) {
                        console.log("🎵 Playing:", detectedEmotion);
                        playEmotionMusic(detectedEmotion);
                        setLastExpression(detectedEmotion);
                    }
                }
            } catch (error) {
                console.log("Detection error:", error.message);
            }
        }, 500);

        return () => {
            if (detectionIntervalRef.current) {
                clearInterval(detectionIntervalRef.current);
            }

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    const handleClick = () => {
        const emotion = detect({ landmarkerRef, videoRef, setExpression });
        if (emotion) {
            console.log("🎭 Clicked emotion:", emotion);
            playEmotionMusic(emotion);
            setLastExpression(emotion);
        }
        onClick(emotion);
    };

    const emotionInfo = getEmotionInfo(expression);
    const displayEmotion = expression.charAt(0).toUpperCase() + expression.slice(1);

    return (
        <div className="face-expression-container">
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    className="video-feed"
                    playsInline
                    autoPlay
                    muted
                />
                <div 
                    className="emotion-display"
                    style={{ backgroundColor: emotionInfo.color }}
                >
                    <h2>{displayEmotion}</h2>
                </div>
            </div>
            <div className="buttons-container">
                <button onClick={handleClick} className="detect-btn">
                    Detect Expression
                </button>
                <button 
                    onClick={() => {
                        console.log("🦃 Turkey button clicked!");
                        playEmotionMusic("turkey");
                    }} 
                    className="turkey-btn"
                    title="Click for turkey song!"
                >
                    🦃 Turkey Song
                </button>
                <button 
                    onClick={() => {
                        console.log("🇹🇷 Turkish music button clicked!");
                        playEmotionMusic("turkish");
                    }} 
                    className="turkish-btn"
                    title="Click for Turkish music!"
                >
                    🇹🇷 Turkish Music
                </button>
            </div>
        </div>
    );
}