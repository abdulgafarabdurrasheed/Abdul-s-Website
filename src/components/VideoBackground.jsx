import './VideoBackground.css';

import video1 from '../assets/Clover Kingdom.mp4';
import video2 from '../assets/Zenitsu.mp4';
import video3 from '../assets/KonohaGakure.mp4';
import video4 from '../assets/Naruto.mp4';
import video5 from '../assets/Gojo.mp4';

const VideoBackground = ({ currentPage }) => {
    
    const videoMap = {
        '/': video1,
        '/about': video2,
        '/contact': video3,
        '/projects': video4,
        '/skills': video5,
    };

    const selectedVideo = videoMap[currentPage] || video1;

    return (
        <div className="video-container">
            <video 
                src={selectedVideo}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="video-background"
            />
        </div>
    );
}

export default VideoBackground;