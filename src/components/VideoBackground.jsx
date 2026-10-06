import { useState } from 'react';
import './VideoBackground.css';

import video1 from '../assets/Clover Kingdom.mp4';
import video2 from '../assets/Zenitsu.mp4';
import video3 from '../assets/KonohaGakure.mp4';
import video4 from '../assets/Naruto.mp4';
import video5 from '../assets/Gojo.mp4';

const VideoBackground = () => {
    const videos = [video1, video2, video3, video4, video5];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleVideoEnd = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    return (
        <div className="video-container">
            <video 
                src={videos[currentIndex]}
                autoPlay 
                muted 
                playsInline 
                onEnded={handleVideoEnd}
                className="video-background"
            />
        </div>
    );
}

export default VideoBackground;